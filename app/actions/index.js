export const COLLECTIONS_AVAILABLE = 'COLLECTIONS_AVAILABLE';
export const ADD_COLLECTION = 'ADD_COLLECTION';
export const UPDATE_COLLECTION = 'UPDATE_COLLECTION';
export const DELETE_COLLECTION = 'DELETE_COLLECTION';

import { AsyncStorage } from 'react-native';

export function addCollection(collection) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, data) => {
            if (data !== null) {
                data = JSON.parse(data);
                data.unshift(collection);
                AsyncStorage.setItem('data', JSON.stringify(data), () => {
                    dispatch({ type: ADD_COLLECTION, collection });
                });
            }
        });
    };
}

export function getCollections() {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, data) => {
            if (data !== null) {
                data = JSON.parse(data);
                dispatch({ type: COLLECTIONS_AVAILABLE, data });
            }
        });
    };
}

export function updateCollection(collection) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, data) => {
            if (data !== null) {
                data = JSON.parse(data);
                const index = getIndex(data, collection.id);
                if (index !== -1) {
                    data[index]['name'] = collection.name;
                    data[index]['tags'] = collection.tags;
                    data[index]['includes'] = collection.includes;
                }
                AsyncStorage.setItem('data', JSON.stringify(data), () => {
                    dispatch({ type: UPDATE_COLLECTION, collection });
                });
            }
        });
    }
}

export function deleteCollection(id) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, data) => {
            if (data !== null) {
                data = JSON.parse(data);

                const index = getIndex(data, id);
                console.log('Delete index', index, data[index], id, data);
                if (index !== -1) data.splice(index, 1);
                AsyncStorage.setItem('data', JSON.stringify(data), () => {
                    dispatch({ type: DELETE_COLLECTION, id });
                });
            }
        });
    };
}

const getIndex = (data, id) => {
    return [...data].findIndex((obj) =>  {
        obj.id === id
    });
};