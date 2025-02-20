type TRoutes = {
	signIn: string;
	home: string;
	project: (id: string) => string;
};

export const routes: TRoutes = {
	signIn: "/sign-in",
	home: "/",
	project: (id: string) => {
		console.log("🚀 project~ id:", id);

		return `/project/${id}`;
	},
};
