import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "src/lib/prismadb";
import { METHODS } from "../users";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    id?: string;
    title: string;
    body: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case METHODS.GET: {
      const notices = await prisma.notice.findMany({
        orderBy: [
          {
            updatedAt: "desc",
          },
        ],
      });
      return res.status(200).json({ notices });
    }
    case METHODS.POST: {
      const { title, body } = req.body;

      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const postedBy = await prisma.user.findUnique({
        where: { email: session?.user?.email as string },
        select: { id: true },
      });

      const notice = await prisma.notice.create({
        data: {
          title,
          body,
          postedUser: {
            connect: {
              id: postedBy?.id,
            },
          },
        },
      });

      return res.status(201).json({ notice });
    }
    case METHODS.PATCH: {
      const { title, body, id } = req.body;
      const notice = await prisma.notice.update({
        where: {
          id,
        },
        data: {
          title,
          body,
        },
      });
      return res.status(201).json({ notice });
    }
    case METHODS.DELETE: {
      const { id } = req.query as { id: string };
      await prisma.notice.delete({
        where: {
          id,
        },
      });
      return res.status(201).json({ message: "deleted" });
    }
    default: {
      res.status(500).json("not supported");
    }
  }
}
