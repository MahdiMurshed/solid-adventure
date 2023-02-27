import { useQuery } from "@tanstack/react-query";
import axios from "src/lib/axios";
import { IMaterial } from "src/types";

import { create } from "zustand";
import { shallow } from "zustand/shallow";

interface ISearch {
  searchQuery: string;
  // eslint-disable-next-line no-unused-vars
  setSearchQuery: (page: string) => void;
}

const serchState = create<ISearch>((set) => ({
  searchQuery: "",
  setSearchQuery: (page: string) => set({ searchQuery: page }),
}));

export const useSearchState = () =>
  serchState(
    (state) => [state.searchQuery, state.setSearchQuery] as const,
    shallow
  );

export const fetchMaterials = async (
  // eslint-disable-next-line no-unused-vars
  searchQuery: string
): Promise<IMaterial[]> => {
  const response = await axios.get(
    `/materials/search?searchQuery=${searchQuery}`
  );
  return response.data.materials;
};

export const useMaterialOfSpecificQuery = ({
  searchQuery,
}: {
  searchQuery: string;
}) => {
  const { isLoading, data } = useQuery({
    queryKey: ["materials", searchQuery],
    queryFn: () => fetchMaterials(searchQuery),
    enabled: searchQuery !== "",
  });

  return {
    materials: data ?? ([] as IMaterial[]),
    isLoading,
  };
};
