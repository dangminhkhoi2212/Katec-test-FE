import React from "react";

type Props = Record<string, never>;

const Logo: React.FC<Props> = ({}) => {
	return (
		<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-sky-500">
			Katec
		</h2>
	);
};

export default Logo;
