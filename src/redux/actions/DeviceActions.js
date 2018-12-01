import * as TYPES from '../constants/DeviceTypes';

function initDevices(data) {
    return {type: TYPES.DEVICE_IN_INIT,data}
}

function updateDevices() {
    return {type: TYPES.DEVICE_IN_UPDATE,data}
}

function sortDevices() {
    return {type: TYPES.DEVICE_IN_SORT,data}
}
function reset() {
    return {type: TYPES.DEVICE_IN_RESET}
}

export {
    initDevices,
    updateDevices,
    sortDevices
}