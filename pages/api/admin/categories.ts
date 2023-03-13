import { NextApiRequest, NextApiResponse } from "next";
import { METHODS } from "pages/api/users";
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
      const { name, userId } = req.body;
    

   

      const category = await prisma.category.create({
        data: {
          name,
          addedByUser: {
            connect: { id: userId },
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
