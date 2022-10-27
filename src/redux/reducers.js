// redux
import { constants } from '@redux';
import {getNewValues} from "@redux/helpers/filters";

// constants
const {
    APP: {
        APP__STATE,
        APP__TYPE: {
            APP__CHANGE_LEVEL,
            APP__CHANGE_LEVELS,
            APP__SHOW_MODAL_ONE_CLICK
        },
    },
    PAGES: {
        PAGES__STATE,
        PAGES__TYPE: {
            PAGES__PRODUCT__SET_APPLIED_FILTERS,
            PAGES__PRODUCT__RESET_FUTURE_FILTERS,
            PAGES__PRODUCT__SET_FILTER,
        },
    },
    RPC_INITIALSTATE,
    RPC_CITIES,
    RPC_CITYID,
    RPC_COOKIE,
    RPC_FILTER,
    RPC_FORMCODE,
    RPC_LOCATION,
    RPC_MODELCODE,
    RPC_MODELS,
    RPC_SORT,
} = constants;

/**
 * Remote procedure call
 */

export const rpc_cities = (state = RPC_INITIALSTATE, action) => {
    switch (action.type) {
        case RPC_CITIES:
            return action.payload;
        default:
            return state;
    }
};

export const rpc_cityId = (state = RPC_INITIALSTATE, action) => {
    switch (action.type) {
        case RPC_CITYID:
            return action.payload;
        default:
            return state;
    }
};

export const rpc_cookie = (state = RPC_INITIALSTATE, action) => {
    switch (action.type) {
        case RPC_COOKIE:
            return action.payload;
        default:
            return state;
    }
};

export const rpc_filter = (state = RPC_INITIALSTATE, action) => {
    switch (action.type) {
        case RPC_FILTER:
            return action.payload;
        default:
            return state;
    }
};

export const rpc_formCode = (state = RPC_INITIALSTATE, action) => {
    switch (action.type) {
        case RPC_FORMCODE:
            return action.payload;
        default:
            return state;
    }
};

export const rpc_location = (state = RPC_INITIALSTATE, action) => {
    switch (action.type) {
        case RPC_LOCATION:
            return action.payload;
        default:
            return state;
    }
};

export const rpc_modelCode = (state = RPC_INITIALSTATE, action) => {
    switch (action.type) {
        case RPC_MODELCODE:
            return action.payload;
        default:
            return state;
    }
};

export const rpc_models = (state = RPC_INITIALSTATE, action) => {
    switch (action.type) {
        case RPC_MODELS:
            return action.payload;
        default:
            return state;
    }
};

export const rpc_sort = (state = RPC_INITIALSTATE, action) => {
    switch (action.type) {
        case RPC_SORT:
            return action.payload;
        default:
            return state;
    }
};

/**
 * Sync
 */
export const app = (state = APP__STATE, {payload, type}) => {
    switch (type) {
        case APP__CHANGE_LEVEL:
            const {code, index} = payload;

            return {
                ...state,
                levels: {
                    ...state.levels,
                    currentLevel: {
                        ...state.levels.currentLevel,
                        code,
                        index,
                    },
                }
            };
        case APP__CHANGE_LEVELS:
            const {end, start} = state.levels.levelsData;
            const {levels} = payload;

            return {
                ...state,
                levels: {
                    ...state.levels,
                    current: [start, ...levels, end],
                }
            };
        case APP__SHOW_MODAL_ONE_CLICK:
            const {isShow} = payload;

            return {
                ...state,
                modals: {
                    ...state.modals,
                    oneClick: {
                        isShow,
                    }
                }
            };
        default:
            return state;
    }
};

export const pages = (state = PAGES__STATE, {payload = {}, type}) => {
    switch (type) {
        case PAGES__PRODUCT__SET_APPLIED_FILTERS:
            const {appliedFilters} = payload;

            return {
                ...state,
                product: {
                    ...state.product,
                    filters: {
                        ...state.product.filters,
                        applied: {
                            ...appliedFilters,
                        },
                        future: {
                            ...appliedFilters,
                        }
                    }
                },
            };
        case PAGES__PRODUCT__RESET_FUTURE_FILTERS:
            return {
                ...state,
                product: {
                    ...state.product,
                    filters: {
                        ...state.product.filters,
                        future: {
                            ...state.product.filters.applied,
                        }
                    }
                },
            };
        case PAGES__PRODUCT__SET_FILTER:
            const {name} = payload;

            return {
                ...state,
                product: {
                    ...state.product,
                    filters: {
                        ...state.product.filters,
                        future: {
                            ...state.product.filters.future,
                            [name]: getNewValues(state, payload),
                        }
                    }
                },
            };
        default:
            return state;
    }
};
