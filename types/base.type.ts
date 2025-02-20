export type QueryBase = {
	page?: number;
	limit?: number;
	isDeleted?: boolean;
	sort?: TSort;
};
export type Audit = {
	createdDate?: Date;
	updatedDate?: Date;
};
export const genericSort = (field: "startDate" | "endDate") => {
	return {
		[field]: {
			asc: `${field}.asc`,
			desc: `${field}.desc`,
		},
	};
};
export type TSort =
	| "startDate.asc"
	| "startDate.desc"
	| "endDate.asc"
	| "endDate.desc";
