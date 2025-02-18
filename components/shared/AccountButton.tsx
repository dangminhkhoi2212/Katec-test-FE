"use client";
import React from "react";

import { useUser } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";

type Props = Record<string, never>;
const AccountButton: React.FC<Props> = ({}) => {
	const { user } = useUser();
	return (
		<div className="flex justify-end items-center py-2 gap-4">
			<UserButton />
			<p>{user?.firstName}</p>
		</div>
	);
};

export default AccountButton;
