export const makeValueDropdownFriendly = (value) => {
    return {
        label: value,
        value: value
    }
}

export const makeOptionsDropdownFriendly = (array) => {
    let returnMe = [];
    for (const element of array) {
        returnMe.push(
            {
                label: element,
                value: element
            }
        )
    }
    return returnMe;
}

export const formatScore = (num) => {
    return Number(num).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
}

export const range = n => [...Array(n).keys()];

export const rangeInt = (from,to) => Array.from( { length: to-from+1 }, (e, i) => i + from );

export const round_number = (number,dp) => {
    const places = 10**dp;
    const res = Math.round(number * places)/places;
    return(res)
}