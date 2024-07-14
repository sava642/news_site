import axios from 'axios';

export async function fetchArticles(currentPage: Number, limit = 5) {
	try {
		const response = await axios.get('http://localhost:3001/articles', {
			params: {
				page: currentPage,
				limit: limit
			}
		});
		return response.data.articles;
	} catch (error) {
		console.error('Error fetching articles:', error);
		throw error;
	}
};
export async function SendMessage(
	email: string,
	subject: string,
	message: string
) {
	try {
		const response = await axios.post('http://localhost:3001/send-message', {
			params: {
				email,
				subject,
				message
			}
		});
		return response.data;
	} catch (error) {
		console.error('Error sending message:', error);
		throw error;
	}
};
export async function fetchArticlesCount() {
	try {
		const response = await axios.get('http://localhost:3001/articles/count');
		return response.data.count;
	} catch (error) {
		console.error('Error fetching articles count:', error);
	}
};




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


