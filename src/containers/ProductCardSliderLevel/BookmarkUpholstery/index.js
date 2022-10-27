/**
 * Hub file
 */

// app
import { constants as appConstants } from "@app";

// libs
import { connect } from "react-redux";

// redux
import { rpc_modelCode } from "@redux/actions/rpc_modelCode";

import { BookmarkUpholstery as BookmarkUpholstery_ } from "./BookmarkUpholstery";
import { PreviewOfOptions as PreviewOfOptions_ } from "./PreviewOfOptions";

const {
    TABS: {
        CODES: {
            UPHOLSTERY,
        }
    }
} = appConstants

export const BookmarkUpholstery = (() => {
    const 
        mapStateToProps = (state) => {
            const response = state.rpc_modelCode.response;
            let upholsteryTabData = null;

            if(response?.success) {
                const data = response.data.tabs.find(({code}) => code === UPHOLSTERY);

                if(data) {
                    upholsteryTabData = {...data}
                }
            }

            return {
                rpc_modelCode: state.rpc_modelCode,
                upholsteryTabData,
            };
        },
        mapDispatchToProps = (dispatch) => ({
            action_rpc_modelCode: (params) => {
                dispatch(rpc_modelCode(params));
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(BookmarkUpholstery_);
})();

export const PreviewOfOptions = (() => {
    const 
        mapStateToProps = null, 
        mapDispatchToProps = (dispatch) => ({
            action_rpc_modelCode: (params) => {
                dispatch(rpc_modelCode(params));
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(PreviewOfOptions_);
})();
