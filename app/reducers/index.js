import { combineReducers } from 'redux';

import { QUOTES_AVAILABLE, ADD_QUOTE, UPDATE_QUOTE, DELETE_QUOTE } from '../actions/';

let initialState = { data: [], loading: true };

const dataReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_QUOTE:
            let data = {...state.data};
            data.unshift(action.quote);
            return Object.assign({}, state, { data });

        case QUOTES_AVAILABLE:
            return Object.assign({}, state, { data: action.data, loading: false });

        case UPDATE_QUOTE:
            const quote = action.quote;
            const data = {...state.data};
            const index = getIndex(data, quote.id);
            if (index !== -1) {
                data[index]['author'] = quote.author;
                data[index]['text'] = quote.text;
            }
            return Object.assign({}, state, { data });

        case DELETE_QUOTE:
            const data = {...state.data};
            const index = getIndex(data, id);
            if (index !== -1) {
                data.splice(index, 1);
                return Object.assign({}, state, { data });
            }

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    dataReducer
});

const getIndex = (data, index) => {
    return {...data}.findIndex((obj) => parseInt(obj.id) === parseInt(id));
};

export default rootReducer;