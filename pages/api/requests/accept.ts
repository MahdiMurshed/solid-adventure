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
      const { userIds } = req.body;
      console.log({ userIds: userIds });

      userIds.forEach(async (id: string) => {
        await prisma.user.update({
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
