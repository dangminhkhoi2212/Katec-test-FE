import { Search } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TSort } from "@/types";

import { projectStore } from "./store";

const options = [
	{ name: "Thời gian bắt đầu tăng dần", value: "startDate.asc" },
	{ name: "Thời gian bắt đầu giảm dần", value: "startDate.desc" },
	{ name: "Thời gian kết thúc tăng dần", value: "endDate.asc" },
	{ name: "Thời gian kết thúc giảm dần", value: "endDate.desc" },
];
const FilterProject: React.FC = () => {
	const { setQuery } = projectStore();
	const [text, setText] = useState<string>("");
	const handleSearch = () => {
		setQuery({
			search: text,
		});
	};
	const handleSelect = (value: TSort) => {
		setQuery({
			sort: value,
		});
	};
	return (
		<div className="flex justify-between gap-4 items-center w-full">
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input
					type="text"
					placeholder="Tìm kiếm"
					onChange={(e) => setText(e.target.value)}
				/>
				<Button type="submit" onClick={handleSearch}>
					<Search />
				</Button>
			</div>
			<div className="flex justify-center items-center gap-2">
				<p>Sắp xếp theo:</p>
				<Select
					defaultValue={options[2].value}
					onValueChange={handleSelect}
				>
					<SelectTrigger className="w-62">
						<SelectValue placeholder="" />
					</SelectTrigger>
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default FilterProject;
