export const isEmpty = (value) => {
    return value.trim() === '';
};

export const hasEmptyValue = (array) => {
    return array.some((el) => isEmpty(el));
};
