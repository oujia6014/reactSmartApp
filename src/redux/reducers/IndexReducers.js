import { combineReducers } from 'redux';
import InitDeviceReducer from './item/DeviceReducer';


//这里面必须要有初始数据 - 否则报错
const rootReducer = combineReducers({
    InitDeviceReducer,
});
 export default rootReducer
