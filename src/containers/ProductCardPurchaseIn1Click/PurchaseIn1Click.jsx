// libs
import React, { useEffect, useState } from "react";

// components
import { Modal, Area, Alert } from "@components/Modal";
import { Link } from "@components/Link";

// forms
import { Form } from "@forms";

// helpers
import { phone } from "@helpers/phone";

// styles
import styles from "./purchaseIn1Click.scss";
import fontSize from "@styles/fontSize.sass";

export const PurchaseIn1Click = (readonlyProps) => {
    const {
        onClose,
        selectedProduct,
        action_rpc_formCode,
    } = readonlyProps;

    const rpc_formCode_response = { ...readonlyProps.rpc_formCode.response };
    const fields_formCode = rpc_formCode_response.data?.fields ?? [];

    const [openState, setOpenState] = useState(true);
    const [showState, setShowState] = useState(0);

    useEffect(() => {
        remoteProcedureCall();
    }, []);

    const remoteProcedureCall = () => {
        action_rpc_formCode({ formCode: 'click_buy' });
    };
    
    const 
        successCallback = () => {
            setOpenState(true);
            setShowState(1);
        },
        failCallback = () => {
            setOpenState(true);
            setShowState(2);
        };

    const onSubmit = (_, e) => {
        const formData = new FormData(e.target);

        const obj = {
            formCode: 'click_buy',
            body: formData,
            successCallback,
            failCallback,
        };

        readonlyProps.action_rpc_formCode(obj);
        setShowState(-1);
    };

    const handleCloseModal = (bool) => {
        setOpenState(bool);
        onClose(bool);
    };

    const 
        onChangePhone = ({ replace }, { target }) => {
            const value = target.value.replace(/\D$/g, '');
            const format = phone.autoFormat(value);
            
            replace(format);
        },
        validatePhone = (value) => {
            if (!/^\+7/.test(value)) {
                return false;
            }

            const bool = phone.isValid(value);
            
            return bool;
        };

    const 
        validateEmail = (value) => {
            const bool = /^[\w.-]+@[\w.-]+$/s.test(value);

            return bool;
        };

    const 
        validateText =  (value) => {
            return value.length > 2;
        };

    const fields = fields_formCode.map((item) => {
        const {
            code,
            name,
            type,
        } = item;

        const obj = {
            type,
            label: name,
            name: code,
        };

        switch (type) {
            case 'hidden':
                obj.defaultValue = selectedProduct;
                break;

            case 'text':
                obj.required = true;
                obj.validate = validateText;
                break;

            case 'email':
                obj.required = true;
                obj.validate = validateEmail;
                break;

            case 'phone':
                obj.required = true;
                obj.defaultValue = '+7';
                obj.onChange = onChangePhone;
                obj.validate = validatePhone;
                break;
            
            case 'textarea':
                obj.required = false;
        }

        return obj;
    });

    switch (showState) {
        case -1: return (
            <Modal useOpen={[openState, handleCloseModal]}>
                <Alert>
                    <center>
                        <p className={fontSize.s14}>
                            Запрос обрабатывается, пожалуйста подождите...
                        </p>
                    </center>
                </Alert>
            </Modal>
        );

        case 0: return (
            <Modal useOpen={[openState, handleCloseModal]}>
                <Area className={styles.areaForm}>
                    <div className={styles.wrapperForm}>
                        <center>
                            <h1>Закажите в 1 клик!</h1>
                        </center>
                        <Form {...{ onSubmit, fields, submit: 'Подтвердить заказ' }} />
                        <p className={fontSize.s14}>
                            Нажимая на кнопку, вы соглашаетесь с <Link href="https://lazurit.com/confident" target="_blank">договором оферты</Link> и подтверждаете свое согласие на обработку персональных данных
                        </p>
                    </div>
                </Area>
            </Modal>
        );

        case 1: return (
            <Modal useOpen={[openState, handleCloseModal]}>
                <Alert>
                    <center>
                        <h1>Спасибо! Ваша заявка отправлена</h1>
                        <p className={fontSize.s14}>
                            Менеджер свяжется с вами в течение 30 минут для согласования заказа
                        </p>
                    </center>
                </Alert>
            </Modal>
        );

        case 2: return (
            <Modal useOpen={[openState, handleCloseModal]}>
                <Alert>
                    <center>
                        <h1>= (</h1>
                        <p className={fontSize.s14}>
                            При выполнении заказа произошла ошибка
                        </p>
                    </center>
                </Alert>
            </Modal>
        );
    }
};
