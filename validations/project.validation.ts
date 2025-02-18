import * as yup from "yup";

import { REQURIED_KEY } from "@/constants";
import { Priority, Status } from "@/types";

export const projectSchema = yup.object({
	name: yup.string().max(250).required(REQURIED_KEY),
	startDate: yup.string().required(REQURIED_KEY),
	endDate: yup.string().required(REQURIED_KEY),
	description: yup.string().max(2000).required(REQURIED_KEY),
	status: yup
		.mixed<Status>()
		.oneOf(Object.values(Status))
		.required(REQURIED_KEY),
	prority: yup
		.mixed<Priority>()
		.oneOf(Object.values(Priority))
		.required(REQURIED_KEY),
});
