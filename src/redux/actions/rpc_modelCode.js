//app
import {constants as appConstants} from "@app";

// redux
import { constants } from "@redux";

// helpers
import { cookies } from "@helpers/cookies";

const {
    RPC_INITIALSTATE,
    RPC_MODELCODE,
} = constants;

const {
    QUERY: {
        VALUES
    },
} = appConstants;

export const rpc_modelCode = (params) => async (dispatch, getState) => {
    const {
        query,
        values,
    } = params ?? {};

    const cityId = cookies.has('userCity') ? JSON.parse(cookies.get('userCity')).id : 2;

    const state = getState();
    const responseState = state.rpc_modelCode.response;
    // TEMP FIX
    // const selectedProductId = responseState?.data.selectedProduct;
    const selectedProductId = null;

    const modelCode = window.location.pathname.substring(1).split('/')[1];

    const productIdQuery = selectedProductId ? `productId=${selectedProductId}&` : '';
    const requestQuery = productIdQuery + query;
    const formattedRequestQuery = requestQuery ? `?${requestQuery}` : '';
    const path = `/api/v1/catalog/models/${modelCode}/${formattedRequestQuery}`;
    const url = new URL(path, /^https?:\/\//.test(process.env.API_LINK) ? process.env.API_LINK : window.location.origin);

    url.searchParams.set('cityId', cityId);
    if (values) {
        url.searchParams.set(VALUES, JSON.stringify(values));
    }
    
    const searchParams = [ ...url.searchParams.entries() ].reduce((res, [key, val]) => ({ ...res, [key]: val }), {});

    const options = {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    dispatch({ type: RPC_MODELCODE, payload: { ...RPC_INITIALSTATE, response: responseState, done: -1 } });

    try {
        const response = await fetch(url.href, options);

        if (response.ok) {
            const json = await response.json();

            const payload = { 
                ...RPC_INITIALSTATE, 
                request: { params: searchParams }, 
                response: json.success ? json : responseState, 
                done: 1, 
                status: response.status,
            };
            
            if (!json.success) {
                payload.error = {
                    message: 'Параметры фильтрации привели к ошибке',
                };
            }

            dispatch({ type: RPC_MODELCODE, payload });

            return {
                ...json,
            };
        } else {
            const error = {
                message: `${response.statusText || 'Failed'} ${path}`,
            };

            dispatch({ type: RPC_MODELCODE, payload: { ...RPC_INITIALSTATE, request: { params: searchParams }, done: 1, status: response.status, error } });
        }
    } catch (e) {
        console.info(e);

        const error = {
            message: `Failed service ${path}`,
        };

        dispatch({ type: RPC_MODELCODE, payload: { ...RPC_INITIALSTATE, request: { params: searchParams }, done: 1, error } });
    }

    return {};
};
