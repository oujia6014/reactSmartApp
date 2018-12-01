import React, {Component} from 'react';
import {View, Button,Text} from 'react-native';
import {SendWebSocketMessage} from "../../utils/WebSocket";
import {GetBJTimesTamp} from "../../utils/UtilsTool";

class GasL8 extends Component {
    static navigationOptions = {
        title: ({ state }) => `：${state.params.Info.Alias}` ,
        headerBackTitle: '返回'
    }

    constructor(props) {
        super(props)
        const {navigation} = this.props;
        const inFo = navigation.getParam('Info');
        console.log('info -->' + JSON.stringify(inFo,null,'\t'));

        // this.state = {
        //     title: 'qweqwe',
        //
        // };


    }

    handlerTempOP6Jia(item) {
        let newStatus = item.Status;
        newStatus[6] = newStatus[6] +1;
        let Timestamp = GetBJTimesTamp();
        let i = {
            Id: item.DeviceId,
            Model: item.Product.Model,
            Series: item.Product.Series,
            Timestamp: Timestamp,
            MsgId: 2,
            Status: item.Status,
        };
        console.log('点击设备行-->' + JSON.stringify(item, null, '\t'))
        console.log('下发控制-->' + JSON.stringify(i))
        SendWebSocketMessage(4, i)
    }

    handlerTempOP6Jian(item) {
        let newStatus = item.Status;
        newStatus[6] = newStatus[6] -1;
        let Timestamp = GetBJTimesTamp();
        let i = {
            Id: item.DeviceId,
            Model: item.Product.Model,
            Series: item.Product.Series,
            Timestamp: Timestamp,
            MsgId: 2,
            Status: item.Status,
        };
        console.log('点击设备行-->' + JSON.stringify(item, null, '\t'))
        console.log('下发控制-->' + JSON.stringify(i))
        SendWebSocketMessage(4, i)
    }



    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button
                    title="加"
                    onPress={this.handlerTempOP6Jia.bind(this)}
                />
                <Button
                    title="剪"
                    onPress={this.handlerTempOP6Jian.bind(this)}
                />
                <Text>设备名: {params.Info.Alias}</Text>
            </View>
        );
    }
}

export default GasL8
// "ActiveDate": "2018-04-19 17:15:16",
//     "Alias": "实验室L8",
//     "DeviceId": "d7e4c9ae-bbd8-4060-a743-d0cec51c0424",
//     "Master": "5ce1ca17-dbfb-4269-97dd-a60d3e7321d0",
//     "Product": {
//     "CtrlPageUrl": "http://local/u1",
//         "FirmwareId": "frt92421-1e3f-479e-a98b-aa5692da1599",
//         "Icon": "http://smart-vanward.oss-cn-shenzhen.aliyuncs.com/vanwardsmart/1/JSQ52-26L8/%E8%AE%BE%E5%A4%87%E5%9B%BE%E6%A0%87.png",
//         "Model": "JSQ52-26L8",
//         "Name": "JSQ52-26L8",
//         "Pid": "114b6aeecc",
//         "Script": {
//         "Content": "s[1] === 1 ? '已打开':'已关闭';"
//     },
//     "Series": "L8",
//         "Type": "燃气热水器",
//         "catagoryId": 1,
//         "catagoryName": null
// },
// "Status": [
//     0,
//     1,
//     1,
//     0,
//     2,
//     0,
//     48,
//     0,
//     0,
//     1,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     129,
//     30,
//     0,
//     0,
//     0,
//     1
// ],
//     "Version": null,
//     "firmwareId": "frt92421-1e3f-479e-a98b-aa5692da1599",
//     "isOnline": true,
//     "serverId": "comet-CNS-01"
// }