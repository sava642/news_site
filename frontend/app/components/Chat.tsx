'use client'

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { Message } from '../types';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const socket = io('http://localhost:3001');

const Chat = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [message, setMessage] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		socket.on('chat message', (msg) => {
			setMessages((prevMessages) => [...prevMessages, msg]);
		});

		return () => {
			socket.off('chat message');
		};
	}, []);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const sendMessage = () => {
		if (message.trim()) {
			const newMessage = {
				author: 'User',
				avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcrwMvUgClCnBNDMfiBcopM8BgT74epXtu0g&s',
				message: message,
				time: new Date().toLocaleTimeString()
			};
			socket.emit('chat message', newMessage);
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			setMessage('');
		}
	};

	return (
		<div>
			<div className="messages">
				{messages.map((msg, index) => (
					<ChatMessage key={index} message={msg} />
				))}
				<div ref={messagesEndRef} />
			</div>
			<ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
		</div>

	);
}
export default Chat;

