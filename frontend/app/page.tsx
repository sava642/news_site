'use client'

import { useState, useEffect } from 'react';
import { Article } from './types';
import NewsCart from './components/NewsCart';
import Pagination from './components/Pagination';
import { fetchArticles, fetchArticlesCount } from './utils';

const MainPage = () => {
	const [allNews, setAllNews] = useState<Article[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [articlesCount, setArticlesCount] = useState(0);

	const defaultImage = './images/def_IMG.jpg';

	useEffect(() => {
		const loadNews = async () => {
			try {
				const news = await fetchArticles(currentPage);
				setAllNews(news);
				console.log(news)
				const count = await fetchArticlesCount()
				setArticlesCount(count)
			} catch (err) {
				setError('Failed to fetch news');
			} finally {
				setIsLoading(false);
			}
		};

		loadNews();
	}, [currentPage]);

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

			<div className="flex justify-between items-center">
				<div className="text-left font-bold mb-4">
					List news
				</div>
				<div className="text-right font-bold mb-4">
					Number of articles: {articlesCount}
				</div>
			</div>
			{!isDataEmpty ? (
				<section>
					<div>
						{allNews.map((news, index) => (
							<NewsCart
								key={news._id}
								id={news._id}
								title={news.title ?? ''}
								content={news.content ?? ''}
								image={news.image ?? defaultImage}
								author={news.author ?? ''}
								date={news.date ?? ''}
							/>
						))}
					</div>
					<Pagination currentPage={currentPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
				</section>
			) : (
				<div>
					<h2 className="font-bold mb-4">No news available</h2>
					<button onClick={handlePrevPage} className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out">
						Previous
					</button>
				</div>
			)}
		</div>
	);
};

export default MainPage;



