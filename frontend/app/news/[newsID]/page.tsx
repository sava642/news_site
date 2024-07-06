'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Article } from '../../types';
import { LikeDislike } from '../../components';
import { Chat } from '../../components';

export default function NewsPage({ params }: { params: { newsID: string } }) {

	const [news, setNews] = useState<Article | null>(null);
	const defaultImage = './images/def_IMG.jpg';
	const likes = 2;
	const dislikes = 2;
	useEffect(() => {
		if (params.newsID) {
			const fetchNews = async () => {
				try {
					const response = await axios.get(`http://localhost:3001/articles/${params.newsID}`);
					setNews(response.data);
				} catch (error) {
					console.error('Error fetching news:', error);
				}
			};
			fetchNews();
		}
	}, [params.newsID]);

	if (!news) {
		return <div className="container mx-auto p-4" >Loading...</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<div className="max-w-sm w-full lg:max-w-full lg:flex">
				<div className="col-span-12 lg:col-span-2 img box">
					<img src={news.image || defaultImage} alt="news image" className="max-lg:w-full lg:w-[180px]" />
				</div>
				<div className=" p-4 bg-white  lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
					<div className="mb-8">
						<div className="text-gray-900 font-bold text-xl mb-2">{news.title}</div>
						<p className="text-gray-700 text-base">{news.content}</p>
					</div>
					<div className="flex items-center">
						<img className="w-10 h-10 rounded-full mr-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcrwMvUgClCnBNDMfiBcopM8BgT74epXtu0g&s" alt="author " />
						<div className="text-sm">
							<p className="text-gray-900 leading-none">{news.author}</p>
							<p className="text-gray-600">{news.date}</p>
						</div>
					</div>
				</div>
			</div>
			<LikeDislike initialLikes={likes} initialDislikes={dislikes} />
			<Chat />
		</div>
	);
}



