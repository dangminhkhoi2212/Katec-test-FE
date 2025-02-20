import { create } from "zustand";

import { TProjectQuery } from "@/types";

type TStore = {
	open: boolean;
	query: TProjectQuery;
};
type TActions = {
	setOpen: (value: boolean) => void;
	setQuery: (value: TProjectQuery) => void;
};
const initValue: TStore = {
	open: false,
	query: { sort: "endDate.asc" },
};

export const projectStore = create<TStore & TActions>((set) => ({
	...initValue,
	setOpen: (value) => set({ open: value }),
	setQuery: (value) => set({ query: value }),
}));
