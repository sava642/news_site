'use client';  // Указывает, что это клиентский компонент

import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ChatInput from './ChatInput';

const socket = io('http://localhost:3001');

interface ChatProps {
	articleId: string;
}

const Chat: React.FC<ChatProps> = ({ articleId }) => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<any[]>([]);

	useEffect(() => {
		socket.on('chat message', (msg) => {
			setMessages(prevMessages => [...prevMessages, msg]);
		});

		return () => {
			socket.off('chat message');
		};
	}, []);

	const sendMessage = async () => {
		if (message.trim()) {
			const newMessage = {
				author: 'User',
				avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcrwMvUgClCnBNDMfiBcopM8BgT74epXtu0g&s',
				content: message,
				date: new Date().toLocaleTimeString(),
				articleId,
			};

			socket.emit('chat message', newMessage);

			try {
				await axios.post(`http://localhost:3001/articles/${articleId}/comments`, newMessage);
			} catch (error) {
				console.error('Error saving comment:', error);
			}

			setMessage('');
		}
	};

	return (

		<ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />

	);
};

export default Chat;
