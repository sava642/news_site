export interface Article {
	_id: string;
	title: string;
	date: string;
	author: string;
	content: string;
	image: string;
	comments: [],
	likes: number,
	dislikes: number,
}

export interface Articles {
	articles: Article[];
}
export interface Message {
	author: string;
	avatar: string;
	content: string;
	time: string;
};
export interface Messages {
	messages: Message[];
}