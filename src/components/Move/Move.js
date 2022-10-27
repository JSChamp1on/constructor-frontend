// libs
import React, { createRef, PureComponent } from "react";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./move.scss";

export class Move extends PureComponent {
    constructor(props) {
        super();
        
        this.ref = props.fwdref ? props.fwdref : createRef(null);
        this.touchX = createRef(null);
        this.touchY = createRef(null);
        this.isMove = createRef(null);
        
        this.downEffect = this.downEffect.bind(this);
        this.upEffect = this.upEffect.bind(this);
        this.moveEffect = this.moveEffect.bind(this);
    }

    componentDidMount() {
        this.ref.current.addEventListener(this.isDevice ? 'touchstart' : 'mousedown', this.downEffect, false);
        this.ref.current.addEventListener(this.isDevice ? 'touchend' : 'mouseup', this.upEffect, false);
        this.ref.current.addEventListener(this.isDevice ? 'touchcancel' : 'mouseleave', this.upEffect, false);
        this.ref.current.addEventListener(this.isDevice ? 'touchmove' : 'mousemove', this.moveEffect, false);
    }

    componentWillUnmount() {
        this.ref.current.removeEventListener(this.isDevice ? 'touchstart' : 'mousedown', this.downEffect, false);
        this.ref.current.removeEventListener(this.isDevice ? 'touchend' : 'mouseup', this.upEffect, false);
        this.ref.current.removeEventListener(this.isDevice ? 'touchcancel' : 'mouseleave', this.upEffect, false);
        this.ref.current.removeEventListener(this.isDevice ? 'touchmove' : 'mousemove', this.moveEffect, false);
    }

    get isDevice() {
        return 'ontouchmove' in document.documentElement;
    }

    downEffect() {
        this.touchX.current = null;
        this.touchY.current = null;
        this.isMove.current = true;
    }

    upEffect() {
        this.isMove.current = false;
    }

    moveEffect(event) {
        if (this.isDevice) {
            const touch = event.touches[0];

            if (this.touchX.current !== null) {
                const 
                    x = touch.clientX - this.touchX.current,
                    y = touch.clientY - this.touchY.current;;

                this.props.onChange?.({ x, y, event, ref: this.ref });
            }

            this.touchX.current = touch.clientX;
            this.touchY.current = touch.clientY;
        } else {
            if (!this.isMove.current || event.which !== 1) {
                return null;
            }

            const 
                x = event.movementX,
                y = event.movementY;
                
            this.props.onChange?.({ x, y, event, ref: this.ref });
        }
    }

    render() {
        const {
            children,
        } = this.props;

        const classes = [
            styles.move,
        ];
        
        if (children.props.className) {
            classes.push(children.props.className);
        }

        const props = {
            ...children.props,
            ref: this.ref,
            className: mergeClasses(...classes),
        };
    
        return <this.props.children.type {...props} />;
    }
};
