import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {Button, List, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import * as deviceAction from "../../redux/actions/DeviceActions";
import {SendWebSocketMessage} from "../../utils/WebSocket"
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

class Home extends Component {
    static navigationOptions = {
        title: '主页',
        headerBackTitle: '返回',
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
    };

    // constructor(props){
    //   super(props)
    //   this.state = {
    //     list:[]
    //   }
    // }

    componentWillMount() {
        //云端 -- >> APP
        this.listener = RCTDeviceEventEmitter.addListener('SOCKET_ON_MESSAGE_SERVER', (value) => {
            if (value.op === 0) {//登录成功
                console.log('app指令 op:0 - 登录成功 ' + JSON.stringify(value.content));
                this.props.dispatch(deviceAction.initDevices(value.content.Devices))
            }
        });
    }

    componentWillUnmount() {
        this.listener.remove();
    }

    handlerUserRefresh() {
        SendWebSocketMessage(1, {});
    }


    handlerListItem(item) {
        // let newStatus = item.Status;
        // newStatus[6] = newStatus[6] -1;
        // let Timestamp = this.getBJTimesTamp();
        // let i = {
        //     Id:item.DeviceId,
        //     Model:item.Product.Model,
        //     Series:item.Product.Series,
        //     Timestamp:Timestamp,
        //     MsgId:2,
        //     Status:item.Status,
        // };
        // console.log('点击设备行-->'+JSON.stringify(item,null,'\t'))
        // console.log('下发控制-->'+JSON.stringify(i))
        // SendWebSocketMessage(4,i)
        this.props.navigation.push('GasL8', {Info: item})
    }

    _onPressReset() {
        this.props.dispatch(countAction.reset());
    }

    _onPressInc() {
        this.props.dispatch(countAction.increase());
    }

    _onPressDec() {
        this.props.dispatch(countAction.deincrease());
    }

    render() {
        const list = this.props.Devices
        // console.log('HOME PAGE   :'+JSON.stringify(list,null,'\t'))
        return (
            <ScrollView>
                <Button backgroundColor={'#33ccb5'} style={{padding: 10}} onPress={this.handlerUserRefresh.bind(this)}
                        title="刷新"/>
                <Button
                    title="跳转至登录页"
                    onPress={() => this.props.navigation.push('Login')}
                />
                <List>
                    {
                        list.map((l, i) => (
                            <ListItem
                                roundAvatar
                                avatar={{uri: l.Product.Icon}}
                                key={i}
                                title={l.Alias}
                                onPress={this.handlerListItem.bind(this, l)}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }
}


function select(store) {
    return {
        Devices: store.deviceReducer.Devices
    }
}

export default connect(select)(Home)


// export default Home
