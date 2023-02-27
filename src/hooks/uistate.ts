import { create } from "zustand";
import { shallow } from "zustand/shallow";

export type ActivePageAttributes = "Account" | "Materials" | "New Materials";

interface IActiveState {
  activePage: ActivePageAttributes;
  // eslint-disable-next-line no-unused-vars
  setActivePage: (page: ActivePageAttributes) => void;
}

const activePageStore = create<IActiveState>((set) => ({
  activePage: "Account",
  setActivePage: (page: ActivePageAttributes) => set({ activePage: page }),
}));

export const useActivePage = () =>
  activePageStore(
    (state) => [state.activePage, state.setActivePage] as const,
    shallow
  );
