/**
 * Hub file
 */

// libs
import { connect } from "react-redux";

// redux
import { rpc_cities } from "@redux/actions/rpc_cities";
import { rpc_filter } from "@redux/actions/rpc_filter";
import { rpc_location } from "@redux/actions/rpc_location";
import { rpc_models } from "@redux/actions/rpc_models";
import { rpc_sort } from "@redux/actions/rpc_sort";

import { Homepage as Homepage_ } from "./Homepage";

export const Homepage = (() => {
    const 
        mapStateToProps = (state) => ({
            rpc_cities: state.rpc_cities,
            rpc_filter: state.rpc_filter,
            rpc_location: state.rpc_location,
            rpc_models: state.rpc_models,
            rpc_sort: state.rpc_sort,
        }), 
        mapDispatchToProps = (dispatch) => ({
            action_rpc_cities: () => {
                dispatch(rpc_cities());
            },
            action_rpc_filter: () => {
                dispatch(rpc_filter());
            },
            action_rpc_location: () => {
                dispatch(rpc_location());
            },
            action_rpc_models: () => {
                dispatch(rpc_models({}));
            },
            action_rpc_sort: () => {
                dispatch(rpc_sort());
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(Homepage_);
})();
