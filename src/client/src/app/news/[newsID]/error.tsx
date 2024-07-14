'use client'

import { useEffect } from 'react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div>
			<h2 className="font-bold">Something went wrong!</h2>
			<button className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out"
				onClick={
					() => reset()
				}
			>
				Try again
			</button>
		</div>
	)
}