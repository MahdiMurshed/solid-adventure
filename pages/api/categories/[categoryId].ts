import { IMaterialAddState } from "@hooks/store";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/lib/prismadb";
import { METHODS } from "../users";

type TFile = {
  label: string;
  url: string;
};
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    values: IMaterialAddState["values"];
    files: TFile;
    links: TFile[];
    authors: IMaterialAddState["authors"];
    markdown?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const { categoryId } = req.query as { categoryId: string };
  switch (method) {
    case METHODS.GET: {
      const material = await prisma.category.findFirst({
        where: {
          id: categoryId,
        },
      });
      return res.status(200).json({ material });
    }
    default: {
      res.status(500).json("not supported");
    }
  }
}
