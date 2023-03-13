import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/lib/prismadb";
import { METHODS } from "../users";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    id?: string;
    title: string;
    body: string;
    userId?:string
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
      const { title, body,userId } = req.body;

      

      const notice = await prisma.notice.create({
        data: {
          title,
          body,
          postedUser: {
            connect: {
              id: userId,
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
