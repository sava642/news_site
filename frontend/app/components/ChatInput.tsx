'use client'

import { useState, useEffect, useRef } from 'react';

interface ChatProps {
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	sendMessage: () => void;
}

const ChatInput: React.FC<ChatProps> = ({ message, setMessage, sendMessage }) => {
	const messageInputRef = useRef<HTMLDivElement>(null);
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const [isFixed, setIsFixed] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const messageInput = messageInputRef.current;
			const chatContainer = chatContainerRef.current;

			if (messageInput && chatContainer) {
				const inputRect = messageInput.getBoundingClientRect();
				const chatRect = chatContainer.getBoundingClientRect();

				if (inputRect.bottom >= window.innerHeight) {
					setIsFixed(true);
					chatContainer.style.paddingBottom = `${inputRect.height}px`;
				} else {
					setIsFixed(false);
					chatContainer.style.paddingBottom = '0px';
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div id="chat-container" ref={chatContainerRef}>
			<div ref={messageInputRef} className={`flex items-center space-x-2 p-2 ${isFixed ? 'fixed bottom-12 left-0 w-full bg-white  z-10 dark:bg-gray-800 dark:border-gray-700' : ''}`}>
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Type your message..."
					className="rounded-xl border-2 border-gray-200 p-2 flex-grow"
				/>
				<button
					onClick={sendMessage}
					className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out"
				>
					Send
				</button>
			</div>
		</div>
	);
}

export default ChatInput;
