import React from "react";

type Props = { message?: string };

const Empty: React.FC<Props> = ({ message = "Không có dữ liệu" }) => {
	return (
		<div className="flex h-full flex-col items-center justify-center">
			{message}
		</div>
	);
};

export default Empty;
