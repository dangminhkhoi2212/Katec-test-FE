import { default as dayjs } from "dayjs";

import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from "@/constants";

export const formatDate = (
	date: number | string,
	{
		removeDate,
		removeTime,
	}: { removeDate?: boolean; removeTime?: boolean } = {}
): string => {
	const dayjsDate = dayjs(date);
	if (!dayjsDate.isValid()) {
		return "Không tìm thấy";
	}
	let stringFormat = DATE_TIME_FORMAT;
	if (removeDate) {
		stringFormat = TIME_FORMAT;
	}
	if (removeTime) {
		stringFormat = DATE_FORMAT;
	}

	return dayjs(date).format(stringFormat);
};
