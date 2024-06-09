'use client'
import { useState, useEffect } from 'react';
import { fetchNews } from '../app/utils';
import { Article } from '../app/types';
import NewsCart from './components/NewsCart';
import Pagination from './components/Pagination';

const MainPage = () => {
	const [allNews, setAllNews] = useState<Article[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1); // Состояние для отслеживания текущей страницы

	useEffect(() => {
		const loadNews = async () => {
			try {
				const news = await fetchNews(currentPage); // Передаем текущую страницу в функцию загрузки данных
				setAllNews(news);
			} catch (err) {
				setError('Failed to fetch news');
			} finally {
				setIsLoading(false);
			}
		};

		loadNews();
	}, [currentPage]); // Запускаем эффект каждый раз, когда изменяется currentPage

	const handleNextPage = () => {
		setCurrentPage(prevPage => prevPage + 1);
	};

	const handlePrevPage = () => {
		setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
	};

	if (isLoading) {
		return <div className="container mx-auto p-4">Loading...</div>;
	}

	if (error) {
		return <div >Error: {error}</div>;
	}

	const isDataEmpty = !Array.isArray(allNews) || allNews.length < 1;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">List news</h1>
			{!isDataEmpty ? (
				<section>
					<div>
						{allNews.map((news, index) => (
							news.title !== '[Removed]' && (
								<NewsCart
									key={index}
									title={news.title ?? ''}
									description={news.description ?? ''}
									url={news.url ?? ''}
									urlToImage={news.urlToImage ?? ''}
								/>
							)
						))}
					</div>
					<Pagination currentPage={currentPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
				</section>
			) : (
				<div>
					<h2 className="font-bold mb-4">No news available</h2>
					<button onClick={handlePrevPage} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
						Previous
					</button>
				</div>
			)}
		</div>
	);
};

export default MainPage;

