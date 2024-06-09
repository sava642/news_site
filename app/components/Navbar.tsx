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
				<Link href="/server_components" className={`text-white hover:text-gray-300 ${pathname === '/server_components' ? 'font-bold underline' : ''}`}>
					Server Component
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;

