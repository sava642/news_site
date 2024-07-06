"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
	const pathname = usePathname();

	return (
		<nav className="container mx-auto p-4 bg-gray-800">
			<div className="container mx-auto flex justify-start items-center space-x-4">
				<Link href="/" className={`text-white hover:text-gray-300 ${pathname === '/' ? 'font-bold underline' : ''}`}>
					MainPage
				</Link>
				<Link href="/contacts" className={`text-white hover:text-gray-300 ${pathname === '/contacts' ? 'font-bold underline' : ''}`}>
					Contacts
				</Link>
				<Link href="/add_news" className={`flex  text-white hover:text-gray-300 ${pathname === '/add_news' ? 'font-bold underline' : ''}`}>
					Add news
				</Link>
				<p className="text-sm text-gray-600 flex items-center">
					<svg className="fill-current text-gray-500 w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
						<path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
					</svg>
					Members only
				</p>
			</div>
		</nav>
	);
};

export default Navbar;

