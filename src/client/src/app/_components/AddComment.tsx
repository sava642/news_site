import React from 'react';
import { AddCommentIcon } from './svgs';

interface AddCommentProps {
	onClick: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
		>
			<AddCommentIcon className="w-6 h-6" />
			<span className="text-gray-700 dark:text-gray-300">Add comment</span>
		</button>
	);
};

export default AddComment;
