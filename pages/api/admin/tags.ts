import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { METHODS } from "pages/api/users";
import { ROLES } from "src/constants";
import prisma from "src/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case METHODS.GET: {
      console.log("here");
      const tags = await prisma.tag.findMany({
        include: {
          category: true,
        },
      });
      return res.status(200).json({ tags });
    }

    case METHODS.POST: {
      const { name, categoryId } = req.body;
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const currentUser = await prisma.user.findUnique({
        where: {
          email: session?.user?.email as string,
        },
      });
      if (currentUser?.role !== ROLES.ADMIN) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const tag = await prisma.tag.create({
        data: {
          name,
          addedBy: currentUser.id,
          category: {
            connect: { id: categoryId },
          },
        },
      });
      return res.status(200).json({ tag });
    }
    case METHODS.PATCH: {
      const { tagIds } = req.body as { tagIds: string[] };
      await prisma.tag.deleteMany({
        where: {
          id: {
            in: tagIds,
          },
        },
      });
      return res.status(201).json({ message: "Deleted" });
    }
    case METHODS.PUT: {
      const { name, tagId, categoryId } = req.body;
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const currentUser = await prisma.user.findUnique({
        where: {
          email: session?.user?.email as string,
        },
      });
      if (currentUser?.role !== ROLES.ADMIN) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const category = await prisma.tag.update({
        where: {
          id: tagId,
        },
        data: {
          name,
          category: {
            connect: { id: categoryId },
          },
        },
      });
      return res.status(200).json({ category });
    }

    default: {
      res.status(500).json("not supported");
    }
  }
}
