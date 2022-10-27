export const sumByClasses = (amount) => {
    if (typeof amount === 'number') {
        const str = String(Math.ceil(amount));

        const r = s => s.split('').reverse().join('');

        const rub = r(r(str).match(/\d{3}|\d{2}|\d/g).join(' '));

        return `${rub} ₽`;
    }
    
    return amount;
};
