const getFilterValues = (queryName, filterName) => {
    const {search} = document.location;
    const instanceURLSearchParams = new URLSearchParams(search);
    const currentFilterString = instanceURLSearchParams.get(queryName);

    if(currentFilterString) {
        try {
            const currentFilterList = JSON.parse(currentFilterString);
            const values = currentFilterList[filterName];

            if(values) {
                return values;
            }
        } catch(err) {
            console.error(err)
        }
    }

    return [];
}

export const addFilterValue = (queryName, filterName, value) => {
    const values = getFilterValues(queryName, filterName);
    const filteredValues = values.filter((currentValue) => currentValue !== value);

    return [...filteredValues, value];
}

export const removeFilterValue = (queryName, filterName, value) => {
    const values = getFilterValues(queryName, filterName);

    return values.filter((currentValue) => currentValue !== value);
}


