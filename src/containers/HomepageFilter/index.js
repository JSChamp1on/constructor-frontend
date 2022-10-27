/**
 * Hub file
 */

// libs
import { connect } from "react-redux";

// redux
import { rpc_models } from "@redux/actions/rpc_models";

export { Filter } from "./Filter";
import { DesktopMenu as DesktopMenu_ } from "./DesktopMenu";
import { DeviceMenu as DeviceMenu_ } from "./DeviceMenu";

export const DesktopMenu = (() => {
    const 
        mapStateToProps = (state) => ({
            rpc_filter: state.rpc_filter,
            rpc_models: state.rpc_models,
            rpc_sort: state.rpc_sort,
        }),
        mapDispatchToProps = (dispatch) => ({
            action_rpc_models: (params) => {
                dispatch(rpc_models(params));
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(DesktopMenu_);
})();

export const DeviceMenu = (() => {
    const 
        mapStateToProps = (state) => ({
            rpc_filter: state.rpc_filter,
            rpc_models: state.rpc_models,
            rpc_sort: state.rpc_sort,
        }),
        mapDispatchToProps = (dispatch) => ({
            action_rpc_models: (params) => {
                dispatch(rpc_models(params));
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(DeviceMenu_);
})();
