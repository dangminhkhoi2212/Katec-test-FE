export enum Priority {
	LOW = "LOW",
	MEDIUM = "MEDIUM",
	HIGH = "HIGH",
}

export type PriorityType = keyof typeof Priority;

export const PriorityOptions: PriorityType[] = ["LOW", "MEDIUM", "HIGH"];
