import { NextApiRequest, NextApiResponse } from "next";
import { METHODS } from "pages/api/users";
import prisma from "src/lib/prismadb";
import { TCATAGORIES } from "src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const { categoryId } = req.query as { categoryId: TCATAGORIES };
  console.log({ categoryId });
  switch (method) {
    case METHODS.GET: {
      const materials = await prisma.material.findMany({
        where: {
          categoryId: {
            equals: categoryId,
          },
        },
        include: {
          authors: true,
          supervisors: true,
          tags: true,
          categories: true,
        },
      });
      return res.status(200).json({ materials });
    }

    default: {
      res.status(500).json("not supported");
    }
  }
}
