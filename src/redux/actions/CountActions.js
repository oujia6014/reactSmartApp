import * as TYPES from '../constants/DeviceTypes';

function increase() {
    return {type: TYPES.INCREMENT}
}

function deincrease() {
    return {type: TYPES.DECREMENT}
}

function reset() {
    return {type: TYPES.RESET}
}

export {
    increase,
    deincrease,
    reset
}