import { combineReducers } from 'redux';

import { COLLECTIONS_AVAILABLE, ADD_COLLECTION, UPDATE_COLLECTION, DELETE_COLLECTION } from '../actions/';

let initialState = { data: [], loading: true };

const dataReducer = (state = initialState, action) => {
    let data;
    let index;
    let collection;
    switch (action.type) {

        case ADD_COLLECTION:
            data = [...state.data];
            data = [action.collection, ...data];
            return Object.assign({}, state, { data });

        case COLLECTIONS_AVAILABLE:
            return Object.assign({}, state, { data: action.data, loading: false });

        case UPDATE_COLLECTION:
            collection = action.collection;
            data = [...state.data];
            index = getIndex(data, collection.id);
            if (index !== -1) {
                data[index]['name'] = collection.name;
                data[index]['tags'] = collection.tags;
                data[index]['includes'] = collection.includes;
            }
            return Object.assign({}, state, { data });

        case DELETE_COLLECTION:
            data = [...state.data];
            index = getIndex(data, action.id);
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

const getIndex = (data, id) => {
    return [...data].findIndex((obj) => obj.id === id);
};

export default rootReducer;