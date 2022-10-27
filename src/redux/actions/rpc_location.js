// redux
import { constants } from "@redux";

const {
    RPC_INITIALSTATE,
    RPC_LOCATION,
} = constants;

export const rpc_location = () => async (dispatch) => {
    const path = '/api/v1/location/';
    const url = new URL(path, /^https?:\/\//.test(process.env.API_LINK) ? process.env.API_LINK : window.location.origin);

    const options = {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    dispatch({ type: RPC_LOCATION, payload: { ...RPC_INITIALSTATE, done: -1 } });

    try {
        const response = await fetch(url.href, options);

        if (response.ok) {
            const json = await response.json();

            dispatch({ type: RPC_LOCATION, payload: { ...RPC_INITIALSTATE, response: json, done: 1, status: response.status } });
        } else {
            const error = {
                message: `${response.statusText || 'Failed'} ${path}`,
            };

            dispatch({ type: RPC_LOCATION, payload: { ...RPC_INITIALSTATE, done: 1, status: response.status, error } });
        }
    } catch (e) {
        console.info(e);

        const error = {
            message: `Failed service ${path}`,
        };

        dispatch({ type: RPC_LOCATION, payload: { ...RPC_INITIALSTATE, done: 1, error } });
    }
};
