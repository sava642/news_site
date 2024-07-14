'use client'

import { useRouter } from 'next/navigation';
import { Like, Dislike } from './svgs';

const NewsCart = ({ id, title, content, image, author, date, likes, dislikes }: { id: string, title: string, content: string, image: string, author: string, date: string, likes: number, dislikes: number }) => {

	const defaultImage = './images/def_IMG.jpg';
	const router = useRouter();

	const handleClick = () => {
		router.push(`/news/${id}`);
	};
	const handleImageError: React.ReactEventHandler<HTMLImageElement> = (event) => {
		event.currentTarget.src = defaultImage;
	};

	return (
		<div onClick={handleClick} className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
			<div className="col-span-12 lg:col-span-2 img box">
				<img
					src={image || defaultImage}
					alt="news image"
					className="max-lg:w-full lg:w-[180px]"
					onError={handleImageError}
				/>
			</div>
			<div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
				<div className="flex items-center justify-between w-full mb-4">
					<h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">{title}</h5>
				</div>
				<p className="font-normal text-base leading-7 text-gray-500 mb-6">
					{author}
				</p>
				<p className="font-normal text-base leading-7 text-gray-500 mb-6">
					{date}
				</p>
				<div className="p-4 flex items-center gap-4">
					<button
						className="h-10 w-10 group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white "
					>
						<Like className="text-yellow-500 h-10 w-10" />
					</button>
					<div className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center flex items-center justify-center">
						{likes}
					</div>
					<button
						className="h-10 w-10 group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white "
					>
						<Dislike className="text-yellow-500 h-10 w-10" />
					</button>
					<div className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center flex items-center justify-center">
						{dislikes}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsCart;
