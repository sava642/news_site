'use client'

import axios from 'axios';
import { useState } from 'react';
import { Like, Dislike } from './svgs';

interface LikeDislikeProps {
	initialLikes: number;
	initialDislikes: number;
	articleId: string;
}

const LikeDislike: React.FC<LikeDislikeProps> = ({ initialLikes, initialDislikes, articleId }) => {
	const [likes, setLikes] = useState(initialLikes);
	const [dislikes, setDislikes] = useState(initialDislikes);
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);

	const handleLike = async () => {
		try {
			if (liked) {
				await axios.post(`http://localhost:3001/articles/${articleId}/unlike`);
				setLikes(likes - 1);
			} else {
				await axios.post(`http://localhost:3001/articles/${articleId}/like`);
				if (disliked) {
					await axios.post(`http://localhost:3001/articles/${articleId}/undislike`);
					setDislikes(dislikes - 1);
					setDisliked(false);
				}
				setLikes(likes + 1);
			}
			setLiked(!liked);
		} catch (error) {
			console.error('Error liking article:', error);
		}
	};

	const handleDislike = async () => {
		try {
			if (disliked) {
				await axios.post(`http://localhost:3001/articles/${articleId}/undislike`);
				setDislikes(dislikes - 1);
			} else {
				await axios.post(`http://localhost:3001/articles/${articleId}/dislike`);
				if (liked) {
					await axios.post(`http://localhost:3001/articles/${articleId}/unlike`);
					setLikes(likes - 1);
					setLiked(false);
				}
				setDislikes(dislikes + 1);
			}
			setDisliked(!disliked);
		} catch (error) {
			console.error('Error disliking article:', error);
		}
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
export default LikeDislike;