export default function Page({ params }: { params: { newsID: string } }) {
	return <div className="container"> This news about {params.newsID}</div>
}


