// redux
import { constants } from "@redux";

// helpers
import { cookies } from "@helpers/cookies";

const {
    RPC_INITIALSTATE,
    RPC_FORMCODE,
} = constants;

export const rpc_formCode = (args) => async (dispatch) => {
    const {
        formCode, 
        body, 
        successCallback, 
        failCallback,
    } = args;

    dispatch({ type: RPC_FORMCODE, payload: { ...RPC_INITIALSTATE, done: -1 } });

    const query = async () => {
        const path = `/web/v1/form/${formCode}/`;
        const url = new URL(path, /^https?:\/\//.test(process.env.API_LINK) ? process.env.API_LINK : window.location.origin);

        const options = {
            cache: 'no-cache',
        };
        if (body) {
            options.method = 'POST';
            options.headers = {
                'Accept': 'application/json',
                'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN'),
            };
            options.body = body;
        } else {
            options.method = 'GET';
            options.headers = {
                'Content-Type': 'application/json',
            };
        }

        try {
            const response = await fetch(url.href, options);

            if (response.ok) {
                const json = await response.json();

                dispatch({ type: RPC_FORMCODE, payload: { ...RPC_INITIALSTATE, response: json, done: 1, status: response.status } });
                
                if (json.success) {
                    successCallback?.();
                } else {
                    console.log('json.success else', json.success, args);
                    failCallback?.();
                }
            } else {
                const error = {
                    message: `${response.statusText || 'Failed'} ${path}`,
                };

                dispatch({ type: RPC_FORMCODE, payload: { ...RPC_INITIALSTATE, done: 1, status: response.status, error } });
                
                failCallback?.();
            }
        } catch (e) {
            console.info(e);

            const error = {
                message: `Failed service ${path}`,
            };

            dispatch({ type: RPC_FORMCODE, payload: { ...RPC_INITIALSTATE, done: 1, error } });
            
            failCallback?.();
        }
    };

    if (body) {
        fetch(new URL('/sanctum/csrf-cookie/', /^https?:\/\//.test(process.env.API_LINK) ? process.env.API_LINK : window.location.origin).href, {
            method: 'GET',
            cache: 'no-cache',
        }).then(query);
    } else {
        query();
    }
};
