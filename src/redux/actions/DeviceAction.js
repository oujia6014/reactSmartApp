import * as TYPES from '../ActionType';

export function actionDevice(list) {
    return ((dispatch) => {
        console.log('调用reduex初始化函数~~~')
        dispatch(init(list))//初始化设备列表
    })
}

function init(list) {
    console.log('reduex初始化   :'+(JSON.stringify(list,null,'\t')))
    return {
        type: TYPES.DEVICE_IN_INIT,
        message: '初始化设备列表',
        beam: list
    }
}
function get(list){
    return{
        type : TYPES.DEVICE_IN_UPDATE,
        message : '获取设备列表数据',
        bean : list,
    }
}
