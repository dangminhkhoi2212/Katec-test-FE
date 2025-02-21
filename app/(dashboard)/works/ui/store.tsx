import { create } from "zustand";

import { TTaskQuery } from "@/types";

type TStore = {
	open: boolean;
	query: TTaskQuery;
};
type TActions = {
	setOpen: (value: boolean) => void;
	setQuery: (value: TTaskQuery) => void;
};
const initValue: TStore = {
	open: false,
	query: { sort: "endDate.asc", date: new Date().toISOString() },
};

export const workStore = create<TStore & TActions>((set) => ({
	...initValue,
	setOpen: (value) => set({ open: value }),
	setQuery: (value) => set({ query: value }),
}));
