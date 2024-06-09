
interface PaginationProps {
	currentPage: number;
	handleNextPage: () => void;
	handlePrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, handleNextPage, handlePrevPage }) => {

	console.log(currentPage)

	return (
		<div className="flex space-x-4">
			<button onClick={handlePrevPage} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
				Previous
			</button>
			<button onClick={handleNextPage} className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
				Next
			</button>
		</div>
	);
};

export default Pagination;
