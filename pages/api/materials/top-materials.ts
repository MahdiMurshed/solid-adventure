import difference from "lodash.difference";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/lib/prismadb";
import { METHODS } from "../users";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: any;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case METHODS.GET: {
      const topIds = await prisma.topResearch.findMany({
        select: {
          materialId: true,
        },
      });

      const topMaterials = await prisma.material.findMany({
        where: {
          id: {
            in: topIds.map((id) => id.materialId),
          },
        },
        include: {
          authors: {
            select: {
              name: true,
              image: true,
            },
          },
          supervisors: {
            select: {
              name: true,
              image: true,
            },
          },
          categories: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
      return res.status(200).json({ topMaterials });
    }
    case METHODS.POST: {
      const { materialIds } = req.body as { materialIds: string[] };

      const ids = await prisma.topResearch.findMany({
        where: {
          materialId: {
            in: materialIds,
          },
        },
      });
      const setDifference = difference(
        materialIds,
        ids.map((id) => id.materialId)
      );
      if (!setDifference.length)
        return res.status(400).json({ message: "Already in top" });

      const topMaterials = await prisma.topResearch.createMany({
        data: setDifference.map((id: string) => ({ materialId: id })),
      });

      return res.status(201).json(topMaterials);
    }
    case METHODS.PATCH: {
      const { materialIds } = req.body as { materialIds: string[] };
      await prisma.topResearch.deleteMany({
        where: {
          materialId: {
            in: materialIds,
          },
        },
      });
      return res.status(201).json({ message: "Deleted" });
    }
    default: {
      res.status(500).json("not supported");
    }
  }
}
