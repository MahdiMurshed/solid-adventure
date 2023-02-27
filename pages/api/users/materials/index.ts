import { NextApiRequest, NextApiResponse } from "next";
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
      const { userId } = req.query;

      const user = await prisma.user.findUnique({
        where: {
          id: userId as string,
        },
      });
      console.log("here");

      const authorMaterials = await prisma.material.findMany({
        where: {
          authorId: {
            equals: userId,
          },
        },
        include: {
          categories: true,
        },
      });

      if (user?.role === ROLES.TEACHER) {
        const supervisorMaterials = await prisma.material.findMany({
          where: {
            supervisorId: {
              equals: userId,
            },
          },
          include: {
            categories: true,
          },
        });
        return res.status(200).json({ authorMaterials, supervisorMaterials });
      }
      return res.status(200).json({ authorMaterials, supervisorMaterials: [] });
    }

    default: {
      res.status(500).json("not supported");
    }
  }
}
