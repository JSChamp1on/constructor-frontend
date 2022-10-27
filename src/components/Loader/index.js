/**
 * Hub file
 */

// libs
import { connect } from "react-redux";

import { Loader as Loader_ } from "./Loader";

export const Loader = (() => {
    const mapStateToProps = (state) => state;

    return connect(mapStateToProps)(Loader_);
})();
