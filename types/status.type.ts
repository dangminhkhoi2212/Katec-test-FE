export enum Status {
	NEW = "NEW",
	IN_PROGRESS = "IN_PROGRESS",
	DONE = "DONE",
	LATE = "LATE",
}
export type StatusType = keyof typeof Status;

export const StatusOptions: StatusType[] = [
	"NEW",
	"IN_PROGRESS",
	"DONE",
	"LATE",
];
