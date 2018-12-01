import *as TYPE from '../constants/DeviceTypes'

const defaultState = {
    Devices:[
        {
            Alias:'型号1',
            Product:{
                Icon:"http://smart-vanward.oss-cn-shenzhen.aliyuncs.com/%E4%BA%A7%E5%93%81%E5%9B%BE%E6%A0%87/%E5%A3%81%E6%8C%82%E7%82%89/v.png"
            }
        },
        {
            Alias:'型号2',
            Product:{
                Icon:"http://smart-vanward.oss-cn-shenzhen.aliyuncs.com/%E4%BA%A7%E5%93%81%E5%9B%BE%E6%A0%87/%E5%A3%81%E6%8C%82%E7%82%89/v.png"
            }
        }
    ],
    Msg:'',
}
export default function device(state = defaultState, action) {
    switch (action.type) {
        case TYPE.DEVICE_IN_INIT:
            return {
                ...state,
                Devices:action.data
            }
        case TYPE.DEVICE_IN_UPDATE:
            return {
                ...state,
                Devices:state.data
            }
        case TYPE.DEVICE_IN_SORT:
            return {
                ...state,
                Devices:state.data
            }
        default:
            return state;
    }

}