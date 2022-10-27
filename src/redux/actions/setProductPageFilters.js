// redux
import { constants } from "@redux";

// constants
const {
    PAGES: {
        PAGES__TYPE: {
            PAGES__PRODUCT__RESET_FUTURE_FILTERS,
            PAGES__PRODUCT__SET_APPLIED_FILTERS,
            PAGES__PRODUCT__SET_FILTER,
        },
    },
} = constants;

export const resetProductPageFutureFilters = () => ({
    type: PAGES__PRODUCT__RESET_FUTURE_FILTERS,
});

export const setProductPageFilter = (data) => ({
    payload: {
        ...data
    },
    type: PAGES__PRODUCT__SET_FILTER,
});

export const setProductPageAppliedFilters = (data) => ({
    payload: {
        appliedFilters: {...data}
    },
    type: PAGES__PRODUCT__SET_APPLIED_FILTERS,
});
