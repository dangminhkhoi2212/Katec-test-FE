import { ListX } from "lucide-react";
import React from "react";

type Props = { message?: string };

const Empty: React.FC<Props> = ({ message = "Không có dữ liệu" }) => {
	return (
		<div className="flex h-full flex-col items-center justify-center bg-transparent rounded-lg">
			<ListX size={40} className="" />
			{message}
		</div>
	);
};

export default Empty;
