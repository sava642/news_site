
interface PaginationProps {
	currentPage: number;
	handleNextPage: () => void;
	handlePrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, handleNextPage, handlePrevPage }) => {

	return (
		<div className="flex space-x-4">
			<button onClick={handlePrevPage} className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out">
				Previous
			</button>
			<button onClick={handleNextPage} className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out">
				Next
			</button>
		</div>
	);
};

export default Pagination;
