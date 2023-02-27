import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/lib/prismadb";
import { METHODS } from "../../users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case METHODS.PATCH: {
      const { materialId, markdown } = req.body as {
        materialId: string;
        markdown: string;
      };
      console.log(markdown);
      const material = await prisma.material.update({
        where: {
          id: materialId,
        },
        data: {
          markdownString: markdown,
        },
      });
      return res.status(201).json(material);
    }
    default:
      return res.status(500).json("not supported");
  }
}
