// redux
import { constants } from "@redux";

// helpers
import { cookies } from "@helpers/cookies";

const {
    RPC_INITIALSTATE,
    RPC_FILTER,
} = constants;

export const rpc_filter = () => async (dispatch) => {
    const paramCityId = cookies.has('userCity') ? JSON.parse(cookies.get('userCity')).id : 2;
    const paramProductTypeId = 1;

    const path = '/api/v1/catalog/filter/';
    const url = new URL(path, /^https?:\/\//.test(process.env.API_LINK) ? process.env.API_LINK : window.location.origin);

    url.searchParams.set('cityId', paramCityId);
    url.searchParams.set('productTypeId', paramProductTypeId);

    const options = {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    dispatch({ type: RPC_FILTER, payload: { ...RPC_INITIALSTATE, done: -1 } });

    try {
        const response = await fetch(url.href, options);

        if (response.ok) {
            const json = await response.json();

            dispatch({ type: RPC_FILTER, payload: { ...RPC_INITIALSTATE, request: { url: url.toString() }, response: json, done: 1, status: response.status } });
        } else {
            const error = {
                message: `${response.statusText || 'Failed'} ${path}`,
            };

            dispatch({ type: RPC_FILTER, payload: { ...RPC_INITIALSTATE, request: { url: url.toString() }, done: 1, status: response.status, error } });
        }
    } catch (e) {
        console.info(e);

        const error = {
            message: `Failed service ${path}`,
        };

        dispatch({ type: RPC_FILTER, payload: { ...RPC_INITIALSTATE, request: { url: url.toString() }, done: 1, error } });
    }
};
