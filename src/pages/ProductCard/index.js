/**
 * Hub file
 */

// libs
import { connect } from "react-redux";

// redux
import { constants } from "@redux";
import { rpc_cities } from "@redux/actions/rpc_cities";
import { rpc_location } from "@redux/actions/rpc_location";
import { rpc_modelCode } from "@redux/actions/rpc_modelCode";
import { setAppLevel, setAppLevels } from "@redux/actions/setAppLevel";
import { setProductPageAppliedFilters } from "@redux/actions/setProductPageFilters";
import { modalsShowOneClick } from "@redux/actions/modalsShowOneClick";

import { ProductCard as ProductCard_ } from "./ProductCard";

const {
    RPC_INITIALSTATE,
    RPC_MODELCODE,
} = constants;

export const ProductCard = (() => {
    const 
        mapStateToProps = (state) => ({
            rpc_cities: state.rpc_cities,
            rpc_location: state.rpc_location,
            isShowModal: state.app.modals.oneClick.isShow,
            app: {...state.app},
            rpc_modelCode: state.rpc_modelCode,
            rpc_models: state.rpc_models,
        }), 
        mapDispatchToProps = (dispatch) => ({
            action_rpc_cities: () => {
                dispatch(rpc_cities());
            },
            action_rpc_location: () => {
                dispatch(rpc_location());
            },
            action_rpc_modelCode: (params) => {
                return dispatch(rpc_modelCode(params));
            },
            action_rpc_modelCode_clear: () => {
                dispatch({ type: RPC_MODELCODE, payload: RPC_INITIALSTATE });
            },
            action_setAppLevel: (data) => {
                dispatch(setAppLevel(data));
            },
            action_setAppLevels: (levels) => {
                dispatch(setAppLevels(levels));
            },
            action_setAppliedFilters: (filtersData) => {
                dispatch(setProductPageAppliedFilters(filtersData));
            },
            action_modalsShowOneClick: (isShow) => {
                dispatch(modalsShowOneClick(isShow));
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(ProductCard_);
})();