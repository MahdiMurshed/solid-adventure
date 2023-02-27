import { AxiosResponse } from "axios";
/* eslint-disable no-unused-vars */
import { IFile } from "@components/materials/MaterialAdd/FileAdd";
import axios from "src/lib/axios";
import { uploadFileCallBack } from "src/lib/helpers";
import { ILink } from "src/types";
import { create } from "zustand";
import { shallow } from "zustand/shallow";

type IAuthor = typeof authorState;

const initialState = {
  title: "",
  abstract: "",
  supervisors: [] as string[],
  dateStarted: null,
  dateFinished: null,
  tags: [] as string[],
  category: "",
  status: "FINISHED",
  authors: [] as string[],
};

const fileState = {
  label: "",
  file: null,
};
const linkState = {
  label: "",
  url: "",
};

const authorState = {
  name: "",
  socialLink: "",
};

export interface IMaterialAddState {
  values: typeof initialState;
  files: IFile[];
  links: ILink[];
  authors: IAuthor[];
  setFiles: (value: IFile[]) => void;
  setLinks: (value: ILink[]) => void;
  setAuthors: (value: IAuthor[]) => void;
  reset: () => void;
  setValues(data: {
    type:
      | "title"
      | "abstract"
      | "dateStarted"
      | "tags"
      | "category"
      | "supervisors"
      | "dateFinished"
      | "status"
      | "authors";
    value: string | Date | null | string[];
  }): void;
  handleMaterialAdd: () => Promise<AxiosResponse<any, any>>;
}

const useMaterialAddStore = create<IMaterialAddState>((set, get) => ({
  values: initialState,
  authors: [authorState],

  files: [fileState],
  links: [linkState],
  setValues: (data) =>
    set((state) => ({
      values: {
        ...state.values,
        [data.type]: data.value,
      },
    })),

  setFiles: (value: IFile[]) => set(() => ({ files: value })),
  setLinks: (value: ILink[]) => set(() => ({ links: value })),
  setAuthors: (value: IAuthor[]) => set(() => ({ authors: value })),
  reset: () =>
    set(() => ({
      values: initialState,
      authors: [authorState],
      files: [fileState],
      links: [linkState],
    })),
  handleMaterialAdd: async () => {
    const { values, files, links, authors, reset } = get();

    console.log({ values, files, links, authors });

    let filesWithUrl = [];

    for (let i = 0; i < files.length; i++) {
      if (files[i].file) {
        const data: any = await uploadFileCallBack(files[i].file);
        console.log({ data });
        filesWithUrl.push({
          label: files[i].label,
          url: data.data.link,
        });
      }
    }

    const url = `/materials`;
    const response = await axios.post(url, {
      values,
      files: filesWithUrl,
      links,
      authors,
    });
    // reset();
    return response;
  },
}));

export const useValues = () =>
  useMaterialAddStore(
    (state) => [state.values, state.setValues] as const,
    shallow
  );

export const useFiles = () =>
  useMaterialAddStore(
    (state) => [state.files, state.setFiles] as const,
    shallow
  );

export const useLinks = () =>
  useMaterialAddStore(
    (state) => [state.links, state.setLinks] as const,
    shallow
  );

export const useAuthors = () =>
  useMaterialAddStore(
    (state) => [state.authors, state.setAuthors] as const,
    shallow
  );

export const useMaterialAdd = () =>
  useMaterialAddStore((state) => state.handleMaterialAdd, shallow);
