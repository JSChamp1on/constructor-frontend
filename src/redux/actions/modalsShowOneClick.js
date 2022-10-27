// redux
import { constants } from "@redux";

// constants
const {
    APP: {
        APP__TYPE: {
            APP__SHOW_MODAL_ONE_CLICK
        },
    },
} = constants;

export const modalsShowOneClick = (isShow) => ({
    payload: {
        isShow
    },
    type: APP__SHOW_MODAL_ONE_CLICK,
});
