/**
 * Hub file
 */

// libs
import { connect } from "react-redux";

import { SliderProduct as SliderProduct_ } from "./SliderProduct";

export const SliderProduct = (() => {
    const 
        mapStateToProps = (state) => ({
            rpc_modelCode: state.rpc_modelCode,
        });

    return connect(mapStateToProps)(SliderProduct_);
})();
