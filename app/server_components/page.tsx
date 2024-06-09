import { fetchNews_server } from '../utils';


export default async function AboutPage() {

	const allNews = await fetchNews_server();

	const isDataEmpty = !Array.isArray(allNews) || allNews.length < 1;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">List news</h1>
			{!isDataEmpty ? (
				<section>
					<div>
						{allNews.map((news, index) => (
							<div key={index} className="mb-4">
								<h2 className="text-xl font-semibold">{news.title}</h2>
								<p>{news.description}</p>
								<a href={news.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
									Read more
								</a>
							</div>
						))}
					</div>
				</section>
			) : (
				<div>
					<h2>Oops, no results</h2>
					<p>No news available</p>
				</div>
			)}
		</div>
	);
};

