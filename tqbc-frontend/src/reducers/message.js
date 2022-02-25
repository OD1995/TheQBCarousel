import { CLEAR_MESSAGE, SET_MESSAGE } from "../actions/types";

const intitialState = {};

export default function (state = intitialState, action) {
    const {type, payload} = action;
    switch (type) {
        case SET_MESSAGE:
            return {
                message: payload
            };
        case CLEAR_MESSAGE:
            return {
                message: ""
            };
        default:
            return state;
    }
}