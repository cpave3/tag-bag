const helpers = {
    getIndex: (data, id) => {
        return [...data].findIndex((obj) => obj.id === id);
    }
};

export default helpers;