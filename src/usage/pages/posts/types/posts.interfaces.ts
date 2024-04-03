export type IPosts = IPost[];
export interface IPost {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export interface initStateCreatePosts {
	title: string,
	content: string,
}