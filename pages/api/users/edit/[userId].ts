import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/lib/prismadb";
import { IEditInfo } from "src/types";
import { METHODS } from "..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case METHODS.PATCH: {
      //TODO: update user where _id===userId
      //send updated userInfo as a response
      const { approved, email, name, reg, role } = req.body as IEditInfo;

      const response = await prisma.user.update({
        where: {
          email,
        },
        data: {
          approved: approved === "true",
          name,
          reg,
          role,
        },
      });
      return res.status(201).json({ response });
    }
    default:
      return res.status(500).json("not supported");
  }
}
