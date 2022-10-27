// styles
import breakpoint from "@styles/breakpoint.json";

export const constants = (() => {
    const obj = {};

    for (let item in breakpoint)
        obj[item.replace(/-/g, '_').toUpperCase()] = item;

    return obj;
})();
