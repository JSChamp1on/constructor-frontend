/**
 * Hub file
 */

// libs
import { connect } from "react-redux";

// redux
import { rpc_filter } from "@redux/actions/rpc_filter";
import { rpc_models } from "@redux/actions/rpc_models";
import { rpc_cityId } from "@redux/actions/rpc_cityId";
import { rpc_cookie } from "@redux/actions/rpc_cookie";

export { Header } from "./Header";
export { MenuSection } from "./MenuSection";
import { TopSection as TopSection_ } from "./TopSection";

export const TopSection = (() => {
    const 
        mapStateToProps = (state) => ({
            rpc_cities: state.rpc_cities,
            rpc_location: state.rpc_location,
            rpc_cookie: state.rpc_cookie,
        }),
        mapDispatchToProps = (dispatch) => ({
            action_rpc_filter: () => {
                dispatch(rpc_filter());
            },
            action_rpc_models: (params) => {
                dispatch(rpc_models(params));
            },
            action_rpc_cityId: ({ cityId }) => {
                dispatch(rpc_cityId({ cityId }));
            },
            action_rpc_cookie: ({ body }) => {
                dispatch(rpc_cookie({ body }));
            },
        });

    return connect(mapStateToProps, mapDispatchToProps)(TopSection_);
})();
