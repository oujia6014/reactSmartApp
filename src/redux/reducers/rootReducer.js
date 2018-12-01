import {combineReducers} from 'redux';
import device from './DeviceReducer';
import count from './CountReducer'

const rootReducer = combineReducers({
    countReducer:count,
    deviceReducer:device
})
export default rootReducer;