// redux
import { constants } from "@redux";

const {
    APP: {
        APP__TYPE: {
            APP__CHANGE_LEVEL,
            APP__CHANGE_LEVELS,
        }
    }
} = constants;

export const setAppLevel = ({code, index}) => ({
    payload: {
        code,
        index,
    },
    type: APP__CHANGE_LEVEL,
});

export const setAppLevels = (levels) => ({
    payload: {
        levels: [...levels]
    },
    type: APP__CHANGE_LEVELS,
});
