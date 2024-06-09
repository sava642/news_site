'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterReducers';

export const store =
	configureStore({
		reducer: {
			counter: counterReducer,
			// Добавьте сюда другие редюсеры по мере необходимости
		}
	});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export type AppStore = ReturnType<typeof makeStore>;
//export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

