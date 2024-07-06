'use client'

import { useState, useEffect } from 'react';
import { SendMessage } from '../utils';

const ContactPage = () => {
	const [email, setEmail] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [responseMessage, setResponseMessage] = useState('');
	const [isError, setIsError] = useState(false);

	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		try {
			const response = await SendMessage(
				email,
				subject,
				message,
			);
			setResponseMessage(response.message);
			setEmail('');
			setSubject('');
			setMessage('');
		} catch (error) {
			console.error('Error sending message:', error);
			setResponseMessage('Failed to send message. Please try again later.');
			setIsError(true);
		}
	};
	useEffect(() => {
		if (responseMessage) {
			const timer = setTimeout(() => {
				setResponseMessage('');
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [responseMessage]);

	return (
		<div className="container flex flex-col space-y-4 mx-auto p-4">
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
						Your email
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="name@flowbite.com"
						required
					/>
				</div>
				<div>
					<label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
						Subject
					</label>
					<input
						type="text"
						id="subject"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
						placeholder="Let us know how we can help you"
						required
					/>
				</div>
				<div className="sm:col-span-2">
					<label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
						Your message
					</label>
					<textarea
						id="message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						rows={6}
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Leave a comment..."
					></textarea>
				</div>
				<button
					type="submit"
					className="px-4 py-2 font-medium mt-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out"
				>
					Send message
				</button>
			</form>
			{responseMessage && (
				<p className={isError ? 'text-red-500' : 'text-green-500'}>{responseMessage}</p>
			)}
		</div>
	);
};

export default ContactPage;
