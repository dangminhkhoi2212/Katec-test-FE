"use client";
import Link from "next/link";
import React from "react";

import { routes } from "@/routes";

type Props = Record<string, never>;

const Logo: React.FC<Props> = ({}) => {
	return (
		<Link href={routes.home}>
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-sky-500">
				Katec
			</h2>
		</Link>
	);
};

export default Logo;
