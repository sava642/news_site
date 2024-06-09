import axios from 'axios';

export async function fetchNews(currentPage: number) {
	try {
		const response = await axios.get('https://newsapi.org/v2/top-headlines', {
			params: {
				country: 'us',
				apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
				page: currentPage, // Добавляем параметр для указания текущей страницы
			},
		});

		const result = response.data.articles;
		console.log(result);
		return result;
	} catch (error) {
		console.error('Error fetching news:', error);
		throw new Error('Failed to fetch news');
	}
}

export async function fetchNews_server() {
	try {
		const response = await axios.get('https://newsapi.org/v2/top-headlines', {
			params: {
				country: 'us',
				apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
			},
		});

		const result = response.data.articles;
		return result;
	} catch (error) {
		throw new Error('Failed to fetch news');
	}
}


