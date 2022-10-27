/**
 * Hub file
 */

// libs
import {connect} from "react-redux";

import {Transitions as Transitions_} from "./Transitions";
import {setAppLevel} from "@redux/actions/setAppLevel";
import {modalsShowOneClick} from "@redux/actions/modalsShowOneClick";

export const Transitions = (() => {
    const
        mapStateToProps = (state) => {
            let page_productCard = null;

            if (state.rpc_modelCode.response?.success) {
                page_productCard = {...state.rpc_modelCode.response.data};
            }

            return {
                app: {...state.app},
                page_productCard,
                rpc_modelCode_response: state.rpc_modelCode.response,
            }
        },
        mapDispatchToProps = (dispatch) => ({
            setAppLevel: (data) => {
                dispatch(setAppLevel(data));
            },
            action_modalsShowOneClick: (isShow) => {
                dispatch(modalsShowOneClick(isShow));
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(Transitions_);
})();