'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const AddArticle = () => {
	const [title, setTitle] = useState('');
	const [date, setDate] = useState('');
	const [author, setAuthor] = useState('');
	const [content, setContent] = useState('');
	const [image, setImage] = useState('');
	const [message, setMessage] = useState('');
	const [errors, setErrors] = useState<{ title?: string; author?: string }>({});

	const validateFields = () => {
		const newErrors: { title?: string; author?: string } = {};

		if (title.trim().length < 2) {
			newErrors.title = 'Title must be at least 2 characters long.';
		}

		if (author.trim().length < 2) {
			newErrors.author = 'Author must be at least 2 characters long.';
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		if (!validateFields()) {
			return;
		}

		const article = {
			title,
			date,
			author,
			content,
			image,
		};

		try {
			const response = await axios.post('http://localhost:3001/articles', article);
			setMessage('Article added successfully');
			setTitle('');
			setDate('');
			setAuthor('');
			setContent('');
			setImage('');
		} catch (error) {
			console.error('Error adding article:', error);
			setMessage('Error adding article');
		}
	};

	return (
		<div className="container mx-auto p-4">
			{message && (
				<div className={`mb-4 p-4 ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-md`}>
					{message}
				</div>
			)}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="title" className="block text-sm font-medium text-gray-700">
						Title:
					</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className={`mt-1 block w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
					/>
					{errors.title && (
						<p className="mt-1 text-sm text-red-600">{errors.title}</p>
					)}
				</div>
				<div>
					<label htmlFor="date" className="block text-sm font-medium text-gray-700">
						Date:
					</label>
					<input
						type="date"
						id="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
				<div>
					<label htmlFor="author" className="block text-sm font-medium text-gray-700">
						Author:
					</label>
					<input
						type="text"
						id="author"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
						required
						className={`mt-1 block w-full px-3 py-2 border ${errors.author ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
					/>
					{errors.author && (
						<p className="mt-1 text-sm text-red-600">{errors.author}</p>
					)}
				</div>
				<div>
					<label htmlFor="content" className="block text-sm font-medium text-gray-700">
						Content (Markdown):
					</label>
					<textarea
						id="content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
				<div>
					<label htmlFor="image" className="block text-sm font-medium text-gray-700">
						Image (URL):
					</label>
					<input
						type="text"
						id="image"
						value={image}
						onChange={(e) => setImage(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
				<button
					type="submit"
					className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out"
				>
					Add news
				</button>
			</form>
			<div className="mt-8">
				<h2 className="text-xl font-bold mb-4">Preview</h2>
				<div className="prose max-w-none">
					<ReactMarkdown>{content}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}

export default AddArticle;


