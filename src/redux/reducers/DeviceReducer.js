import *as TYPE from '../constants/DeviceTypes'

const defaultState = {
    count: 5,
    factor: 1
}
export default function count(state = defaultState, action) {
    switch (action.type) {
        case TYPE.RESET:
            return {
                ...state,
                count:0
            }
        case TYPE.INCREMENT:
            return {
                ...state,
                count:state.count + state.factor
            }
        case TYPE.DECREMENT:
            return {
                ...state,
                count:state.count - state.factor
            }
        default:
            return state;
    }

}