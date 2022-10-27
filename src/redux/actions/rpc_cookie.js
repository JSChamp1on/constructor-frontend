// redux
import { constants } from "@redux";

const {
    RPC_INITIALSTATE,
    RPC_COOKIE,
} = constants;

export const rpc_cookie = ({ body }) => async (dispatch) => {
    const {
        key,
        value,
        time,
    } = body;

    const path = '/api/v1/cookie/set/';
    const url = new URL(path, /^https?:\/\//.test(process.env.API_LINK) ? process.env.API_LINK : window.location.origin);

    url.searchParams.set('key', key);
    url.searchParams.set('value', JSON.stringify(value));
    if (time !== undefined) {
        url.searchParams.set('time', time);
    }

    const options = {
        method: 'GET',
        cache: 'no-cache',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
    };
    
    dispatch({ type: RPC_COOKIE, payload: { ...RPC_INITIALSTATE, done: -1 } });

    try {
        const response = await fetch(url.href, options);

        if (response.ok) {
            const json = await response.json();

            dispatch({ type: RPC_COOKIE, payload: { ...RPC_INITIALSTATE, response: json, done: 1, status: response.status } });
        } else {
            const error = {
                message: `${response.statusText || 'Failed'} ${path}`,
            };

            dispatch({ type: RPC_COOKIE, payload: { ...RPC_INITIALSTATE, done: 1, status: response.status, error } });
        }
    } catch (e) {
        console.info(e);

        const error = {
            message: `Failed service ${path}`,
        };

        dispatch({ type: RPC_COOKIE, payload: { ...RPC_INITIALSTATE, done: 1, error } });
    }
};
