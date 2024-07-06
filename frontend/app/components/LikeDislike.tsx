'use client'

import { useState } from 'react';
import { Like, Dislike } from './svgs';

interface LikeDislikeProps {
	initialLikes: number;
	initialDislikes: number;
}

export default function LikeDislike({ initialLikes, initialDislikes }: LikeDislikeProps) {
	const [likes, setLikes] = useState(initialLikes);
	const [dislikes, setDislikes] = useState(initialDislikes);

	const handleLike = () => {
		setLikes(likes + 1);
	};

	const handleDislike = () => {
		setDislikes(dislikes + 1);
	};

	return (
		<div className="p-4 flex items-center gap-4">
			<button
				className="h-10 w-10 group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
				onClick={handleLike}
			>
				<Like className="text-yellow-500 h-10 w-10" />
			</button>
			<div className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center flex items-center justify-center">
				{likes}
			</div>
			<button
				className="h-10 w-10 group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
				onClick={handleDislike}
			>
				<Dislike className="text-yellow-500 h-10 w-10" />
			</button>
			<div className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center flex items-center justify-center">
				{dislikes}
			</div>
		</div>
	);
}
