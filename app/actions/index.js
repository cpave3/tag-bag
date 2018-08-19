export const DATA_AVAILABLE = 'DATA_AVAILABLE';

// Import sample data
import Data from '../instructions.json';

export const getData = () => {
    return (dispatch) => {
        // Would make the API call here
        const data = Data.instructions;
        dispatch({ type: DATA_AVAILABLE, data }, 2000);
    };
};