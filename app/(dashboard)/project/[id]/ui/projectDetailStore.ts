import { create } from "zustand";

type TStore = {
	open: boolean;
};
type TActions = {
	setOpen: (value: boolean) => void;
};
const initValue: TStore = {
	open: false,
};

export const projectDetailStore = create<TStore & TActions>((set) => ({
	...initValue,
	setOpen: (value) => set({ open: value }),
}));
