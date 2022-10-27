/**
 * Hub file
 */

// libs
import { connect } from "react-redux";

import { SliderLevel as SliderLevel_ } from "./SliderLevel";

export const SliderLevel = (() => {
    const 
        mapStateToProps = (state) => {
            const modelCodeResponse = state.rpc_modelCode.response;
            let model = null;

            if(modelCodeResponse?.success) {
                model = {...modelCodeResponse.data};
            }

            return {
                app: {...state.app},
                model,
            }
        };

    return connect(mapStateToProps)(SliderLevel_);
})();