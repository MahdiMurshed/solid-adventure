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
      //TODO: you will get array of ids in materialIds.
      //All ids of this array should be deleted from the all tables
      //dont use try catch here. If any error occurs, it will be handled by the global error handler
      // const { userIds } = req.body;
      //send updated userInfo as a response
      //complete the process here

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
    default:
      return res.status(500).json("not supported");
  }
}
