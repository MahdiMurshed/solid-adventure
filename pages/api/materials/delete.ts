import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/lib/prismadb";
import { METHODS } from "../users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case METHODS.PATCH: {
      const { materialIds } = req.body as { materialIds: string[] };
      console.log({ userId: materialIds });

      materialIds.forEach(async (id) => {
        await prisma.material.delete({
          where: {
            id,
          },
        });
      });

      // await db.collection("users").deleteOne({ _id: new ObjectId(materialIds) });

      return res.status(201).json({});
    }
    default: {
      res.status(500).json("not supported");
    }
  }
}
