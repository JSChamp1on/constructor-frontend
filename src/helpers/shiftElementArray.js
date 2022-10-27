export const shiftElementArray = (array = [], fromIndex = 0, inIndex = 0) => {
    if (fromIndex >= 0 && inIndex >= 0) {
        const copyEl = array[fromIndex];
        array.splice(fromIndex, 1);
        array.splice(inIndex, 0, copyEl);
    }
};
