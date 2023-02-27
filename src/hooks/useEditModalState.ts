import { create } from "zustand";
import { shallow } from "zustand/shallow";

interface IActiveState {
  open: boolean;
  setOpen: () => void;
}

const activePageStore = create<IActiveState>((set, get) => ({
  open: false,
  setOpen: () => {
    const { open } = get();

    return set({
      open: !open,
    });
  },
}));

export const useEditModalOpen = () =>
  activePageStore((state) => [state.open, state.setOpen] as const, shallow);
