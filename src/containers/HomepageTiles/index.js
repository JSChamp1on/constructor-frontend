/**
 * Hub file
 */

// libs
import { connect } from "react-redux";

// redux
import { rpc_models } from "@redux/actions/rpc_models";

import { Tiles as Tiles_ } from "./Tiles";
export { Card } from "./Card";

export const Tiles = (() => {
    const 
        mapStateToProps = (state) => ({
            rpc_models: state.rpc_models,
        }),
        mapDispatchToProps = (dispatch) => ({
            action_rpc_models: (params) => {
                dispatch(rpc_models(params));
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(Tiles_);
})();
