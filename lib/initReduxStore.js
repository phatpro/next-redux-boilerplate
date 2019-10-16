import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import todosReducer from '../redux/reducers/todosReducer';

const initialState = {};

const rootReducer = combineReducers({ todos: todosReducer });

export default function initReduxStore(preloadState = initialState) {
	const store = createStore(rootReducer, preloadState, composeWithDevTools(applyMiddleware()));

	return store;
}
