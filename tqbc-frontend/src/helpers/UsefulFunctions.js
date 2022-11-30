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