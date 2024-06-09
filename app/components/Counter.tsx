import type { RootState } from '../lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../lib/reducers/counterReducers';

const Counter = () => {
	if (typeof window === 'undefined') {
		return <div>Counter is not supported on the server side</div>;
	}

	const dispatch = useDispatch();
	const count = useSelector((state: RootState) => state.counter.value);

	return (
		<div>
			<h1 className="text-2xl">{count}</h1>
			<button onClick={() => dispatch(increment())} className="px-4 py-2 bg-blue-500 text-white rounded">
				Increment
			</button>
			<button onClick={() => dispatch(decrement())} className="px-4 py-2 bg-blue-500 text-white rounded">
				Decrement
			</button>
			<button onClick={() => dispatch(incrementByAmount(5))} className="px-4 py-2 bg-blue-500 text-white rounded">
				Increment by 5
			</button>
		</div>
	);
};

export default Counter;

