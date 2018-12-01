import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import * as deviceAction from "../redux/actions/DeviceActions";

var ws = '';
var hearBeatTimer;
//链接云端
function ContentWebSocket(data,cb) {
    ws = new WebSocket('wss://rubycomet.vanward.com:2301/ws');
    ws.onopen = () => {
        let prams = {
            Id: data.User.Uuid,
            Token: data.User.Token
        };
        console.log('登录云端:  ' + JSON.stringify(prams));
        let senddata = sendMessages(0, JSON.stringify(prams));
        ws.send(senddata);
        _handlerSendHeartBeat();
        OnWebSocketMessage(ws);
        cb()

    };

    ws.onclose = () => {
        console.log('已断开云端链接');
        clearInterval(hearBeatTimer);
    };

    ws.onerror = (e) => {
        console.log('错误：' + e.message);
    };
}

// 接收云端消息
function OnWebSocketMessage(ws) {
    ws.onmessage = (e) => {
        let resDataArray = new Uint8Array(e.data);
        let op = bytesToInt([resDataArray[0]]);
        let content = uintToString(resDataArray.slice(5, resDataArray.length));
        if (op === 0) {
            content = JSON.parse(content)
        }
        //处理op值,然后进行内部广播
        _handlerSocketOnMessage(op, content);
    }
}

//向云端发送数据
function SendWebSocketMessage(op, data = {}) {
    console.log('向云端发送OP: ' + op);
    console.log('向云端发送JSON: ' + data);
    let sendData = sendMessages(op, JSON.stringify(data));
    ws.send(sendData)
}

//开启socket心跳
function _handlerSendHeartBeat() {
    hearBeatTimer = setInterval(() => {
        console.log("发送心跳 op:10 ");
        let sendheart = sendMessages(10, "");
        ws.send(sendheart);
    }, 60000)
}

function _handlerSocketOnMessage(op, content) {
    let value = {
        op: op,
        content: content
    };
    if (op > 32) {
        op = op - 32;
        if (op === 0) {
            console.log('云->APP op:0 - 添加设备 '+content);
        } else if (op === 1) {
            console.log('云->APP op:1 - 固件登录 '+content);
        } else if (op === 2) {
            console.log('云->APP op:2 - 固件状态更新 '+content);
        } else if (op === 3) {
            console.log('云->APP op:3 - 固件在线 '+content);
        } else if (op === 4) {
            console.log('云->APP op:4 - 固件离线 '+content);
        } else if (op === 5) {
            console.log('云->APP op:5 - 固件解绑 '+content);
        } else if (op === 5) {
            console.log('云->APP op:6 - 没有解绑直接触发绑定 '+content);
        }
        RCTDeviceEventEmitter.emit('SOCKET_ON_MESSAGE_APP', value);

    } else { //app指令
        if (op === 0) {//登录成功
            console.log('app指令 op:0 - 登录成功 '+JSON.stringify(content));
        } else if (op === 1) {//刷新列表指令
            console.log('app指令 op:1 - 刷新列表指令 '+content);
        } else if (op === 2) {//刷新列表指令
            console.log('app指令 op:2 - 刷新用户设备信息 '+content);
        } else if (op === 3) {//刷新用户设备状态
            console.log('app指令 op:3 - 刷新用户设备状态 '+content);
        } else if (op === 4) {//发送控制
            console.log('app指令 op:4 - 发送控制 '+content);
        } else if (op === 10) {//心跳发送
            console.log('app指令 op:10 - 心跳发送 '+content);
        } else if (op === 12) {//天气获取
            console.log('app指令 op:12 - 天气获取 '+content);
        }
        RCTDeviceEventEmitter.emit('SOCKET_ON_MESSAGE_SERVER', value);
    }
}




function sendMessages(op, data) {
    var msg = new Uint8Array(5);
    msg[0] = op;
    let messageArray = stringToUint(data);
    let messageArrayLen = messageArray.length;
    msg[1] = messageArrayLen >> 24;
    msg[2] = messageArrayLen >> 16;
    msg[3] = messageArrayLen >> 8;
    msg[4] = messageArrayLen & 0xFF;
    let sendDataArray = new Uint8Array(msg.length + messageArray.length);
    for (var i = 0; i < msg.length; i++) {
        sendDataArray[i] = msg[i];
    }
    for (var i = 0, k = msg.length, allSize = k + messageArray.length; k < allSize; k++, i++) {
        sendDataArray[k] = messageArray[i];
    }
    return sendDataArray;
}

function stringToUint(data) {
    let string = data,
        charList = string.split(''),
        uintArray = [];
    for (var i = 0; i < charList.length; i++) {
        uintArray.push(charList[i].charCodeAt(0));
    }
    return new Uint8Array(uintArray);
}

function uintToString(uintArray) {
    let encodedString = String.fromCharCode.apply(null, uintArray),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}

function bytesToInt(bytesArray) {
    var resultInt = 0;
    var bLoop;
    for (var i = 0; i < bytesArray.length; i++) {
        bLoop = bytesArray[i];
        resultInt += (bLoop & 255) << (8 * i);
    }
    return resultInt;
}


export {
    ContentWebSocket,
    SendWebSocketMessage
}

