import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/lib/prismadb";

export const METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
  PUT: "PUT",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case METHODS.GET: {
      const users = await prisma.user.findMany();
      return res.status(200).json({ users });
    }
    case METHODS.PATCH: {
      const { email, role, reg } = req.body;
      const user = await prisma.user.update({
        where: {
          email,
        },
        data: {
          role,
          reg,
        },
      });
      return res.status(201).json({ user });
    }
    case METHODS.PUT: {
      const { userIds } = req.body;
      const users = await prisma.user.findMany({
        where: {
          id: {
            in: userIds as string[],
          },
          role: "student",
        },
      });
      return res.status(200).json({ users });
    }
    default:
      return res.status(500).json("not supported");
  }
}
