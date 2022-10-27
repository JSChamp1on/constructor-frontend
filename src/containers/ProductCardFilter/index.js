/**
 * Hub file
 */

import {connect} from "react-redux";

import {resetProductPageFutureFilters, setProductPageFilter} from "@redux/actions/setProductPageFilters";

export { Filter } from "./Filter";
export { DesktopMenu } from "./DesktopMenu";
import { DeviceMenu as DeviceMenu_ } from "./DeviceMenu";

export const DeviceMenu = (() => {
    const
        mapStateToProps = (state) => ({
            filtersData: {...state.pages.product.filters},
        }),
        mapDispatchToProps = (dispatch) => ({
            action_resetFutureFilters: () => {
                dispatch(resetProductPageFutureFilters());
            },
            action_setFilter: (data) => {
                dispatch(setProductPageFilter(data));
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(DeviceMenu_);
})();
