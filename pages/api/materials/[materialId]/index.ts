import { IMaterialAddState } from "@hooks/store";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/lib/prismadb";
import { METHODS } from "../../users";

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

  const { materialId } = req.query as { materialId: string };
  console.log({ materialId });
  switch (method) {
    case METHODS.GET: {
      const material = await prisma.material.findFirst({
        where: {
          id: materialId,
        },
        include: {
          authors: true,
          supervisors: true,
          tags: true,
          categories: true,
        },
      });
      return res.status(200).json({ material });
    }
    case METHODS.PUT: {
      const { values, links, files, markdown } = req.body;

      const material = await prisma.material.update({
        where: { id: materialId },
        data: {
          title: values.title,
          abstract: values.abstract,
          authors: {
            connect: values.authors.map((val) => ({ id: val })),
          },
          supervisors: {
            connect: values.supervisors.map((val) => ({ id: val })),
          },
          dateStarted: values.dateStarted,
          dateFinished: values.dateFinished,
          // tags: values.tags,
          // category: values.category,
          status: values.status,
          links,
          files,
          markdownString: markdown,
        },
      });

      return res.status(201).json({ material });
    }
    default: {
      res.status(500).json("not supported");
    }
  }
}
