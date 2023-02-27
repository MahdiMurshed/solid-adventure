import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/lib/prismadb";
import { IUserFormValues } from "src/types";
import { METHODS } from "..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { userId } = req.query as { userId: string };

  switch (method) {
    case METHODS.GET: {
      console.log(userId);
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          researchInterests: true,
        },
      });
      return res.status(200).json({ user });
    }
    case METHODS.PATCH: {
      const {
        name,
        bio,
        contactNumber,
        secondaryEmail,
        links,
        researchInterestIds,
      } = req.body as IUserFormValues;
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          bio,
          contactNumber,
          secondaryEmail,
          links: links as any,
          researchInterests: {
            connect: researchInterestIds.map((id) => ({ id })),
          },
        },
      });
      return res.status(201).json({ user });
    }
    default:
      return res.status(500).json("not supported");
  }
}
