import { Calendar, Home, Inbox, Search } from "lucide-react";

import {
	Sidebar,
	SidebarFooter,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { routes } from "@/routes";

import AccountButton from "../shared/AccountButton";
import Logo from "../shared/Logo";

// Menu items.
const items = [
	{
		title: "Trang chủ",
		url: routes.home,
		icon: Home,
	},
	{
		title: "Công việc hôm nay",
		url: routes.works,
		icon: Inbox,
	},
	{
		title: "Khách hàng",
		url: "#",
		icon: Calendar,
	},
	{
		title: "Nhân viên",
		url: "#",
		icon: Search,
	},
];

export function AppSidebar() {
	return (
		<Sidebar className="flex flex-col h-full">
			<SidebarHeader>
				<Logo />
			</SidebarHeader>
			<SidebarGroupContent className="flex-1">
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<a
									href={item.url}
									className="flex items-center gap-2"
								>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
			<SidebarFooter className="mt-auto">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className="w-full">
							<AccountButton />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
