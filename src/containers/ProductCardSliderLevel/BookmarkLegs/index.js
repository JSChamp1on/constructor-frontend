/**
 * Hub file
 */

// app
import { constants as appConstants } from "@app";

import {connect} from "react-redux";
import {rpc_modelCode} from "@redux/actions/rpc_modelCode";

import { BookmarkLegs as BookmarkLegs_ } from "./BookmarkLegs";
import { PreviewOfOptions as PreviewOfOptions_ } from "./PreviewOfOptions";

const {
    TABS: {
        CODES: {
            LEGS,
        }
    }
} = appConstants

export const BookmarkLegs = (() => {
    const
        mapStateToProps = (state) => {
            const response = state.rpc_modelCode.response;
            let tabData = null;

            if(response?.success) {
                const data = response.data.tabs.find(({code}) => code === LEGS);

                if(data) {
                    tabData = {...data}
                }
            }

            return {
                rpc_modelCode: state.rpc_modelCode,
                tabData,
            };
        },
        mapDispatchToProps = (dispatch) => ({
            action_rpc_modelCode: (params) => {
                dispatch(rpc_modelCode(params));
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(BookmarkLegs_);
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
