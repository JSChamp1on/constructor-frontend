// libs
import React from "react";
import { useController, useForm, useFieldArray } from "react-hook-form";

// forms
import { TextField, TextArea } from "@forms";

// helpers
import { mergeClasses } from "@helpers/mergeClasses";

// styles
import styles from "./form.scss";
import buttonStyles from "@styles/button";
import fontSize from "@styles/fontSize.sass";

export const Form = (readonlyProps) => {
    const {
        onSubmit = Function(),
        fields = [],
        submit = 'Отправить',
    } = readonlyProps;

    if (!fields.length) {
        return null;
    }

    const { handleSubmit, control } = useForm();

    // fix due to useFieldArray function
    const fixValue = (callback) => (data) => {
        if (Array.isArray(data)) {
            return callback?.(data[0]) ?? data[0];
        }

        return callback?.(data) ?? data;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {
                fields.map((item, index) => {
                    const {
                        type = '',
                        label = '',
                        name = '',
                        defaultValue = '', 
                        onChange = ({ replace }, { target }) => replace(target.value),
                        validate = () => true,
                        required = false,
                        disabled = false,
                    } = item;

                    const {
                        field: { value, ...attributes },
                        fieldState,
                    } = useController({
                        name,
                        control,
                        defaultValue,
                        rules: {
                            onChange: onChange.bind(null, useFieldArray({ name, control })),
                            validate: fixValue(validate),
                            required,
                            disabled,
                        },
                    });

                    switch (type) {
                        case 'hidden':
                            return <input {...{ key: index, type, name, defaultValue }} />;

                        case 'text':
                        case 'email':
                        case 'phone':
                            return (
                                <TextField 
                                    key={index}
                                    label={label}
                                    error={fieldState.error} 
                                    type={type}
                                    value={fixValue()(value)} 
                                    {...attributes}
                                />
                            );
                    
                        case 'textarea': 
                            return (
                                <TextArea 
                                    key={index}
                                    label={label}
                                    error={fieldState.error} 
                                    value={fixValue()(value)} 
                                    {...attributes}
                                />
                            );

                        default:
                            return null;
                    }
                })
            }
            <button type="submit" className={mergeClasses(styles.submit, buttonStyles.blue)}>
                <span className={fontSize.s16}>{ submit }</span>
            </button>
        </form>
    );
};
