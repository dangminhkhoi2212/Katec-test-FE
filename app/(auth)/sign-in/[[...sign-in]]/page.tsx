"use client";
import React from 'react';

import { SignIn } from '@clerk/nextjs';

type Props = {};

const SignInPage: React.FC<Props> = ({}) => {
	return (
		<div className="flex justify-center items-center h-screen">
			<SignIn />
		</div>
	);
};

export default SignInPage;
