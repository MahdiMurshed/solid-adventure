import { NextApiRequest, NextApiResponse } from "next";
import { ROLES } from "src/constants";
import prisma from "src/lib/prismadb";
import { Student } from "src/types";
import { METHODS } from "..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case METHODS.GET: {
      const supervisorId = req.query.supervisorId as string;
      const user = await prisma.user.findUnique({
        where: {
          id: supervisorId,
        },
      });
      if (!user || user.role !== ROLES.TEACHER)
        return res.status(404).json({ message: "User not found" });
      const students = await prisma.material.findMany({
        where: {
          supervisorId: {
            equals: supervisorId,
          },
        },
        select: {
          authors: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              contactNumber: true,
              reg: true,
            },
          },
        },
      });

      const studs = students.map((student) => student.authors).flat();

      const uniqueStudents = [] as Student[];

      studs.forEach((obj) => {
        if (uniqueStudents.findIndex((item) => item.id === obj.id) === -1) {
          uniqueStudents.push(obj);
        }
      });
      return res.status(200).json({ students: uniqueStudents });
    }
    default:
      return res.status(500).json("not supported");
  }
}
