import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { routes } from "@/routes";
import projectService from "@/services/project.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = { id: string };

const DeleteButtonForm: React.FC<Props> = ({ id }) => {
	const [open, setOpen] = useState<boolean>(false);
	const { toast } = useToast();
	const router = useRouter();
	const queryClient = useQueryClient();
	const deleteMutatation = useMutation({
		mutationFn: async () => {
			return await projectService.update(id, { isDeleted: true });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast({
				description: "Đã xóa dự án.",
			});
			setOpen(false);
			router.push(routes.home);
		},
	});
	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>
					<div className="flex items-center gap-2 py-2 px-4 rounded-md bg-primary text-white bg-red-400">
						<Trash size={16} /> Xóa dự án
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Xóa dự án</DialogTitle>
						<DialogDescription>
							Bạn có chắc chắn muốn xóa dự án này không?
						</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<div className="flex justify-end gap-4">
							<Button
								variant="outline"
								onClick={() => setOpen(false)}
								disabled={deleteMutatation.isPending}
							>
								Hủy
							</Button>
							<Button
								variant={"destructive"}
								onClick={() => deleteMutatation.mutate()}
								loading={deleteMutatation.isPending}
							>
								Xóa
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default DeleteButtonForm;
