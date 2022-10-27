import "intl-tel-input/build/js/utils.js";
import iti from "intl-tel-input/build/js/data.min.js";

export const phone = {
    INTERNATIONAL: window.intlTelInputUtils.numberFormat.INTERNATIONAL,

    autoFormat: function (number, iso2) {
        if (!iso2) {
            iso2 = this.getContry(number).iso2;
        }
        
        const format = window.intlTelInputUtils.formatNumber(number, iso2, this.INTERNATIONAL);

        return format.replace(/^\+?(.+)$/s, '+$1');
    },

    isValid: (number) => {
        return window.intlTelInputUtils.isValidNumber(number);
    },

    getContry: (number) => {
        const num = number.replace(/\D/g, '');

        return iti.find((item) => {
            const {
                dialCode,
                areaCodes,
            } = item;

            const dialCodeBool = num.indexOf(dialCode) === 0;

            if (dialCodeBool && areaCodes) {
                return areaCodes.find((item) => {
                    return new RegExp(`^${dialCode}${item}`).test(num);
                }) ?? false;
            }

            return dialCodeBool;
        }) ?? {};
    },
};
