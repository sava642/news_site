'use client'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Link from 'next/link';
import { MapComponent } from "../components";

const render = (status: Status): React.ReactElement<any, string | React.JSXElementConstructor<any>> => {
	if (status === Status.LOADING) return <p>Loading...</p>;
	if (status === Status.FAILURE) return <p>Error loading map</p>;
	return <MapComponent />;
};

const ContactPage = () => {
	return (
		<div className="container flex flex-col space-y-4 mx-auto p-4">
			<section >
				<h1 className="text-2xl mb-4 font-bold">NewsCompany</h1>
				<p className="font-bold">Department phones:</p>
				<ul>
					<li>Sales Department: +48 123 456 789</li>
					<li>Support Department: +48 987 654 321</li>
					<li>General Number: +48 111 222 333</li>
				</ul>
			</section>
			<section >
				<p className="font-bold">Contact us:</p>
				<form action="#" >
					<div>
						<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
						<input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
					</div>
					<div>
						<label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
						<input type="text" id="subject" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
					</div>
					<div className="sm:col-span-2">
						<label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
						<textarea id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
					</div>
					<button className="px-4 py-2 font-medium mt-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out">
						Send message
					</button>
				</form>
			</section>
			<section>
				<h1 className="font-bold my-4 mt-4">Our Location</h1>
				<div>
					<Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} render={render}>
						<MapComponent />
					</Wrapper>
				</div>
			</section>
			<section>
				<Link href="/" className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out">
					Go back to the MainPage
				</Link>
			</section>
		</div>
	);
};

export default ContactPage;



