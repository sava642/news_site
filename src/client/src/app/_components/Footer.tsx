"use client";

import React, { useState, useEffect } from "react";

const Footer = () => {
	const [currentTime, setCurrentTime] = useState("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setCurrentTime(now.toLocaleTimeString());
		};

		updateTime();
		const intervalId = setInterval(updateTime, 1000);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<footer className="bg-gray-800 text-white p-4 container mx-auto p-4 ">
			<div className="container mx-auto">
				<p>&copy; {new Date().getFullYear()} - Current Time: {currentTime}</p>
			</div>
		</footer>
	);
};

export default Footer;

