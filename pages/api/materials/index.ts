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
    // links: IMaterialAddState["links"];
    markdown?: string;
    userId?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case METHODS.GET: {
      const materials = await prisma.material.findMany({
        include: {
          authors: true,
          supervisors: true,
          tags: true,
          categories: true,
        },
      });
      return res.status(200).json({ materials });
    }
    case METHODS.POST: {
      const { values, links, files, userId } = req.body;
    

      console.log({ files });

      const materials = await prisma.material.create({
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
          tags: {
            connect: values.tags.map((val) => ({ id: val })),
          },
          categories: {
            connect: { id: values.category },
          },

          status: values.status,
          links,
          files,
          markdownString: "",
          uploadedBy: userId as string,
        },
        include: {
          authors: true,
          supervisors: true,
        },
      });

      return res.status(201).json(materials);
    }
    case METHODS.PATCH: {
      // const { values, links, files, authors, markdown } = req.body;
      return;
    }
    default: {
      res.status(500).json("not supported");
    }
  }
}
