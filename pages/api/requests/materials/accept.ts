import { NextApiRequest, NextApiResponse } from "next";
import { METHODS } from "pages/api/users";
import prisma from "src/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case METHODS.PATCH: {
      const { materialIds } = req.body;
      console.log({ materialIds: materialIds });

      materialIds.forEach(async (id: string) => {
        await prisma.material.update({
          where: {
            id,
          },
          data: {
            approved: true,
          },
        });
      });

      return res.status(201).json({});
    }
    default:
      return res.status(500).json("not supported");
  }
}
