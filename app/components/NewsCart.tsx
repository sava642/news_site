import { Like } from './svgs';
import { Dislike } from './svgs';


const NewsCart = ({ title, description, url, urlToImage }: { title: string, description: string, url: string, urlToImage: string }) => {
	const defaultImage = './images/def_IMG.jpg';
	return (
		<div className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4">
			<div className="col-span-12 lg:col-span-2 img box">
				<img src={urlToImage || defaultImage} alt="news image" className="max-lg:w-full lg:w-[180px]" />
			</div>
			<div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
				<div className="flex items-center justify-between w-full mb-4">
					<h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">{title}</h5>
				</div>
				<p className="font-normal text-base leading-7 text-gray-500 mb-6">
					{description} <a href={url} className="text-indigo-600">More....</a>
				</p>
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-4">
						<button className="h-10 w-10 group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
							<Like className="text-yellow-500 h-10 w-10" />
						</button>
						<input type="text" id="number" className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center" placeholder="2" />
						<button className="h-10 w-10 group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
							<Dislike className="text-yellow-500 h-10 w-10" />
						</button>
						<input type="text" id="number" className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center" placeholder="2" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsCart;
