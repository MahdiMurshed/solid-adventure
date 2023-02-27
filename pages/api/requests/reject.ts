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
      //TODO: you will get array of ids in userIds.
      //All ids of this array should be deleted from the all tables
      //dont use try catch here. If any error occurs, it will be handled by the global error handler
      // const { userIds } = req.body;
      //send updated userInfo as a response
      //complete the process here

      const { userIds } = req.body as { userIds: string[] };
      console.log({ userId: userIds });

      userIds.forEach(async (id) => {
        await prisma.account.deleteMany({
          where: {
            userId: id,
          },
        });
        await prisma.session.deleteMany({
          where: {
            userId: id,
          },
        });
        await prisma.user.delete({
          where: {
            id,
          },
        });
      });

      // await db.collection("users").deleteOne({ _id: new ObjectId(userIds) });

      return res.status(201).json({});
    }
    default:
      return res.status(500).json("not supported");
  }
}
