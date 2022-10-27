/**
 * Hub file
 */

// libs
import { connect } from "react-redux";

import { ShowLevel as ShowLevel_ } from "./ShowLevel";
import {setAppLevel} from "@redux/actions/setAppLevel";
import {modalsShowOneClick} from "@redux/actions/modalsShowOneClick";

export const ShowLevel = (() => {
    const 
        mapStateToProps = (state) => ({
            app: {...state.app},
            page_productCard: state.page_productCard,
            productPage: {...state.pages.product},
            rpc_modelCode_response: state.rpc_modelCode.response,
        }),
        mapDispatchToProps = (dispatch) => ({
            action_setAppLevel: (data) => {
                dispatch(setAppLevel(data));
            },
            action_modalsShowOneClick: (isShow) => {
                dispatch(modalsShowOneClick(isShow));
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(ShowLevel_);
})();
