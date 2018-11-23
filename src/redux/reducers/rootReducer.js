import {combineReducers} from 'redux';
import count from './DeviceReducer';

const rootReducer = combineReducers({
    countReducer:count
})
export default rootReducer;