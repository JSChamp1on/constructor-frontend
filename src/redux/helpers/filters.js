export const getNewValues = (state, payload) => {
    const {checked, name, value} = payload;
    const currentValues = state.product.filters.future[name];

    if(currentValues) {
        const currentValuesFiltered = currentValues.filter((appliedValue) => appliedValue !== value);

        if(checked) {
            return [...currentValuesFiltered, value];
        } else {
            return [...currentValuesFiltered];
        }
    } else {
        if(checked) {
            return [value];
        } else {
            return [];
        }
    }
}