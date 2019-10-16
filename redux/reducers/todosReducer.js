export default function todosReducer(state = {}, action) {
	switch (action.type) {
		case 'GET_TODOS':
			return {
				...state,
				hihi: 'todo 1'
			};
		default:
			return {
				...state,
				second: 'không có gì'
			};
	}
}
