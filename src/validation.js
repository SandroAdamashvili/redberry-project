export function minTwoSymbols(value) {
    return value.length >= 2;
}

export function onlyNumbers(value) {
    if (value.length === 0) {
        return false;
      }

    const number = Number(value);
    return !isNaN(number);
}

export function onlyIntegers(value) {
    if (value.length === 0) {
        return false;
      }

    const number = Number(value);
    return Number.isInteger(number);
}

export function minFiveWords(value) {
    const wordsArr = value.trim().split(' ');
    const newArr = wordsArr.filter(word => word.length > 0)
    return newArr.length >= 5;
}

export function emailValidation(value) {
    return value.endsWith('@redberry.ge')
}

export function phoneValidation(value) {

}

export function imgValidation(value) {
    if(value.size > 1024000 && value === null) {
        return false
    }
}