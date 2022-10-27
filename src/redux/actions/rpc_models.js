// redux
import { constants as constants_type } from "@redux";

// helpers
import { cookies } from "@helpers/cookies";

const 
{
    RPC_INITIALSTATE,
    RPC_MODELS,
} = constants_type;
const
    CITY_ID = 2,
    USER_ID = 1,
    PRODUCT_TYPE_ID = 0,
    LIMIT = 24,
    PAGE_NUM = Number(new URLSearchParams(location.search).get('page')) || 1,
    SORT_BY = 'price',
    SORT_ORDER = 'asc';

export const rpc_models = (params) => async (dispatch, getState) => {
    const {
        productTypeId,
        filter,
        sortBy,
        sortOrder,
        pageNum,
    } = params ?? {};

    const paramCityId = cookies.has('userCity') ? JSON.parse(cookies.get('userCity')).id : CITY_ID;

    const state = getState();
    const paramsState = state.rpc_models.request?.params ?? {};

    const path = '/api/v1/catalog/models/';
    const url = new URL(path, /^https?:\/\//.test(process.env.API_LINK) ? process.env.API_LINK : window.location.origin);

    url.searchParams.set('cityId', paramCityId);
    url.searchParams.set('userId', USER_ID);
    url.searchParams.set('productTypeId', productTypeId ?? paramsState['productTypeId'] ?? PRODUCT_TYPE_ID);
    url.searchParams.set('limit', LIMIT);
    url.searchParams.set('pageNum', pageNum ?? PAGE_NUM);
    url.searchParams.set('sortBy', sortBy ?? paramsState['sortBy'] ?? SORT_BY);
    url.searchParams.set('sortOrder', sortOrder ?? paramsState['sortOrder'] ?? SORT_ORDER);
    url.searchParams.set('filter', JSON.stringify({
        ...JSON.parse(paramsState['filter'] ?? null),
        ...filter,
    }));

    const searchParams = [ ...url.searchParams.entries() ].reduce((res, [key, val]) => ({ ...res, [key]: val }), {});

    const options = {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    dispatch({ type: RPC_MODELS, payload: { ...RPC_INITIALSTATE, request: { params: searchParams }, done: -1 } });

    try {
        const response = await fetch(url.href, options);

        if (response.ok) {
            const json = await response.json();

            dispatch({ type: RPC_MODELS, payload: { ...RPC_INITIALSTATE, request: { params: searchParams }, response: json, done: 1, status: response.status } });
        } else {

            const error = {
                message: `${response.statusText || 'Failed'} ${path}`,
            };

            dispatch({ type: RPC_MODELS, payload: { ...RPC_INITIALSTATE, request: { params: searchParams }, done: 1, status: response.status, error } });
        }
    } catch (e) {
        console.info(e);

        const error = {
            message: `Failed service ${path}`,
        };

        dispatch({ type: RPC_MODELS, payload: { ...RPC_INITIALSTATE, request: { params: searchParams }, done: 1, error } });
    }
};
