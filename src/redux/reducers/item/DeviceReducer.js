import * as TYPES from '../../ActionType';

const initialState = {
    status: 'null',
    isSuccess: false,
    bean:null,
    message : '',
}


export default function loginIn(state=initialState, action) {
    switch (action.type) {
      case types.DEVICE_IN_INIT:
        return {
          ...state,
          status: '初始化',
          isSuccess: false,
          user: null,
        }
        break;
      default:
      case types.DEVICE_IN_INIT:
      return {
        ...state,
        status: '初始化',
        isSuccess: false,
        user: null,
      }
      break;
    default:
      console.log(state);
        return state;
    }
  }
  
// export default function getDevice(state = initialState, action) {
//     switch (action.type) {
//         case TYPES.DEVICE_IN_INIT: // 初始状态
//             return Object.assign({}, state, {
//                 status: 'init',
//                 isSuccess: false,
//                 bean : action.bean,
//                 message : action.message,
//             });
//             break;
//         default:
//             return state;
//   }
// }