export const QUOTES_AVAILABLE = 'DATA_AVAILABLE';
export const ADD_QUOTE = 'ADD_QUOTE';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const DELETE_QUOTE = 'DELETE_QUOTE';

import { AsyncStorage } from 'react-native';

export function addQuote(quote) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, data) => {
            if (data !== null) {
                data = JSON.parse(data);
                data.unshift(quote);
                AsyncStorage.setItem('data', JSON.stringify(data), () => {
                    dispatch({ type: ADD_QUOTE, quote });
                });
            }
        });
    };
}

export function getQuotes() {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, data) => {
            if (data !== null) {
                data = JSON.parse(data);
                dispatch({ type: QUOTES_AVAILABLE, quotes: data });
            }
        });
    };
}

export function updateQuote(quote) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, data) => {
            if (data !== null) {
                data = JSON.parse(data);
                const index = getIndex(data, quote.id);
                if (index !== -1) {
                    data[index]['author'] = quote.author;
                    data[index]['quote'] = quote.quote;
                }
                AsyncStorage.setItem('data', JSON.stringify(data), () => {
                    dispatch({ type: UPDATE_QUOTE, quote });
                });
            }
        });
    }
}

export function deleteQuote(id) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, data) => {
            if (data !== null) {
                data = JSON.parse(data);

                const index = getIndex(data, id);
                if (index !== -1) data.splice(index, 1);
                AsyncStorage.setItem('data', JSON.stringify(data), () => {
                    dispatch({ type: DELETE_QUOTE, id });
                });
            }
        });
    };
}

const getIndex = (data, id) => {
    let clone = {...data};
    return clone.findIndex(obj => parseInt(obj.id) === parseInt(id));
};