/**
 * Hub file
 */
// libs
import { connect } from "react-redux";

// redux
import { rpc_formCode } from "@redux/actions/rpc_formCode";

import { PurchaseIn1Click as PurchaseIn1Click_ } from "./PurchaseIn1Click";

export const PurchaseIn1Click = (() => {
    const 
        mapStateToProps = (state) => ({
            rpc_formCode: state.rpc_formCode,
        }), 
        mapDispatchToProps = (dispatch) => ({
            action_rpc_formCode: (args) => {
                dispatch(rpc_formCode(args));
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(PurchaseIn1Click_);
})();