import {constants as appConstants} from "@app";

const {
    QUERY: {
        FILTER,
        PRODUCT_ID,
        VALUES
    },
} = appConstants;

export const getUrlFilter = (queryName) => {
    const {search} = document.location;
    const instanceURLSearchParams = new URLSearchParams(search);

    const currentFilterString = instanceURLSearchParams.get(queryName);

    if(currentFilterString) {
        try {
            return JSON.parse(currentFilterString);
        } catch(err) {
            console.error(err);
        }
    }

    return {};
}

export const setUrlFilter = ({additionalQueryList, newFilterList, queryName}) => {
    const {hash, pathname, search} = document.location;
    const instanceURLSearchParams = new URLSearchParams(search);

    const currentFilterString = instanceURLSearchParams.get(queryName);
    let currentFilter = {};

    if(currentFilterString) {
        try {
            currentFilter = JSON.parse(currentFilterString);
        } catch(err) {
            console.error(err);
        }
    }

    const newFilter = newFilterList.reduce((acc, {name, valuesList}) => {
        delete acc[name];

        if(!valuesList.length) {
            return acc;
        }

        return {
            [name]: [...valuesList],
            ...acc,
        };
    }, currentFilter);

    const isEmpty = Object.keys(newFilter).length === 0

    if(isEmpty) {
        instanceURLSearchParams.delete(queryName);
    } else {
        try {
            instanceURLSearchParams.set(queryName, JSON.stringify(newFilter));

            if(additionalQueryList) {
                additionalQueryList.forEach(({name, value}) => {
                    if(value) {
                        instanceURLSearchParams.set(name, value);
                    } else {
                        instanceURLSearchParams.delete(name);
                    }
                });
            }
        } catch(err) {
            console.error(err);
        }
    }

    return {
        newUrl: pathname + '?' + instanceURLSearchParams.toString()  + hash,
    };
}

export const resetFilters = () => {
    const {hash, pathname, search} = document.location;
    const instanceURLSearchParams = new URLSearchParams(search);

    instanceURLSearchParams.delete(FILTER);
    instanceURLSearchParams.delete(PRODUCT_ID);
    instanceURLSearchParams.delete(VALUES);

    return pathname + '?' + instanceURLSearchParams.toString()  + hash;
}
