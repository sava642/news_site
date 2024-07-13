'use client'

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Article, Message } from '../../../types';
import { ChatMessage, LikeDislike } from '../../_components';
import { Chat } from '../../_components';
import AddComment from '../../_components/AddComment';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function NewsPage({ params }: { params: { newsID: string } }) {

	const [news, setNews] = useState<Article | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [showInputMessenger, setShowInputMessenger] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const handleAddCommentClick = () => {
		setShowInputMessenger(!showInputMessenger);
	};
	const defaultImage = './images/def_IMG.jpg';

	useEffect(() => {
		if (params.newsID) {
			const fetchNews = async () => {
				try {
					const response = await axios.get(`http://localhost:3001/articles/${params.newsID}`);
					setNews(response.data);
					if (response.data && response.data.comments) {
						setMessages(response.data.comments);
					}
				} catch (error) {
					console.error('Error fetching news:', error);
				}
			};
			fetchNews();
		}
		socket.on('connect', () => {
			console.log('Connected to WebSocket server');
		});

		socket.on('chat message', (msg) => {
			console.log('Message from server:', msg);
			setMessages(prevMessages => [...prevMessages, msg]);
		});

		return () => {
			socket.disconnect();
		};
	}, [params.newsID, messages]);

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
			<div className="p-4 flex items-center gap-4">
				<LikeDislike
					articleId={params.newsID}
					initialLikes={news?.likes || 0}
					initialDislikes={news?.dislikes || 0}
				/>
				<AddComment onClick={handleAddCommentClick} />
			</div>
			{messages.length > 0 && (
				<div className="messages">
					{messages.map((msg, index) => (
						<ChatMessage key={index} message={msg} />
					))}
					<div ref={messagesEndRef} />
				</div>
			)}
			{showInputMessenger && <Chat articleId={params.newsID} />}
		</div>
	);
}



