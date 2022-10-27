/**
 * Hub file
 */

// libs
import { connect } from "react-redux";

import { Name as Name_ } from "./Name";

export const Name = (() => {
    const 
        mapStateToProps = (state) => ({
            rpc_modelCode: state.rpc_modelCode,
            page_productCard: state.page_productCard,
        });

    return connect(mapStateToProps)(Name_);
})();