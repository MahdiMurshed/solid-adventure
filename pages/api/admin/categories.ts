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
      const categories = await prisma.category.findMany({
        include: {
          addedByUser: {
            select: {
              name: true,
            },
          },
          tags: true,
        },
      });
      return res.status(200).json({
        categories,
      });
    }

    case METHODS.POST: {
      const { name } = req.body;
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const currentUser = await prisma.user.findUnique({
        where: {
          email: session?.user?.email as string,
        },
      });
      if (currentUser?.role !== ROLES.TEACHER) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const category = await prisma.category.create({
        data: {
          name,
          addedByUser: {
            connect: { id: currentUser.id },
          },
        },
      });
      return res.status(200).json({ category });
    }
    case METHODS.PATCH: {
      const { categoryIds } = req.body as { categoryIds: string[] };
      await prisma.category.deleteMany({
        where: {
          id: {
            in: categoryIds,
          },
        },
      });
      return res.status(201).json({ message: "Deleted" });
    }
    case METHODS.PUT: {
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
      if (currentUser?.role !== ROLES.TEACHER) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const category = await prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          name,
        },
      });
      return res.status(200).json({ category });
    }

    default: {
      res.status(500).json("not supported");
    }
  }
}
