// libs
import { PureComponent } from "react";
import ReactDOM from "react-dom";

export class Portal extends PureComponent {
    constructor(props) {
        super();

        this.portal = props.fwdref ?? document.getElementById('root');
        this.domElement = document.createElement('div');
    }

    componentDidMount() {
        this.portal.appendChild(this.domElement);
    }

    componentWillUnmount() {
        this.portal.removeChild(this.domElement);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.domElement);
    }
};
