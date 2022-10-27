/**
 * Hub file
 */

// libs
import { connect } from "react-redux";

// redux
import { rpc_models } from "@redux/actions/rpc_models";

import { Icons as Icons_ } from "./Icons";

export const Icons = (() => {
    const 
        mapStateToProps = (state) => ({
            rpc_filter: state.rpc_filter,
        }),
        mapDispatchToProps = (dispatch) => ({
            action_rpc_models: (params, request) => {
                dispatch(rpc_models(params, request));
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(Icons_);
})();
