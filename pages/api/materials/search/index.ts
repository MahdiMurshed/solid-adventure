// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { METHODS } from "pages/api/users";
import prisma from "src/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  console.log({ method });
  switch (method) {
    case METHODS.GET: {
      const { searchQuery } = req.query as {
        searchQuery: string;
      };
      const materials = await prisma.material.findMany({
        where: {
          OR: [
            {
              title: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
            {
              abstract: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
            {
              tags: {
                some: {
                  name: {
                    contains: searchQuery,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              categories: {
                some: {
                  name: {
                    contains: searchQuery,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              status: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
            {
              authors: {
                some: {
                  name: {
                    contains: searchQuery,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              supervisors: {
                some: {
                  name: {
                    contains: searchQuery,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        },
        include: {
          authors: true,
          supervisors: true,
        },
      });
      return res.status(200).json({ materials });
    }
    default: {
      const { searchQuery } = req.query as {
        searchQuery: string;
      };
      console.log("here", searchQuery);
      return res.status(405).json({ message: "Method not allowed" });
    }
  }
}
