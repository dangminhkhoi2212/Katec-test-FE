import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

import {
    Sidebar, SidebarFooter, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';

import AccountButton from '../shared/AccountButton';
import Logo from '../shared/Logo';

// Menu items.
const items = [
	{
		title: "Home",
		url: "#",
		icon: Home,
	},
	{
		title: "Inbox",
		url: "#",
		icon: Inbox,
	},
	{
		title: "Calendar",
		url: "#",
		icon: Calendar,
	},
	{
		title: "Search",
		url: "#",
		icon: Search,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
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
