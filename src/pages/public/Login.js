import React, {Component} from 'react';
import {View,Image,TouchableOpacity} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage,Button,Text } from 'react-native-elements'
import HttpRequest from '../../utils/HttpRequest'
import { connect } from 'react-redux';
import {ContentWebSocket,SendWebSocketMessage} from "../../utils/WebSocket"
export class Login extends Component {
    static navigationOptions = {
      header:null
    }
    constructor(props){
      super(props)
      this.state={
        userPhone:'17620683001',
        userPassword:'1234567a'
      }
    }

    handlerUserLogin() {
        let fromData = {
            mobile: this.state.userPhone,
            password: this.state.userPassword,
            code: ''
        };
        HttpRequest("/user/login", fromData)
            .then((response) => {
                console.log('登录成功');
                let data = JSON.parse(response);
                ContentWebSocket(data,(()=>{
                    this.props.navigation.goBack()
                }))//链接云端
            })
            .catch(error => {
                console.log(`登录失败： ${error[_bodyInit]}`)
            });
    }
    handlerUserRefresh(){
        SendWebSocketMessage(1,{});
    }

    handlerGoBack(){
      console.log('点击了返回~~')
      this.props.navigation.goBack()
    }

    render() {
    return (

        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <TouchableOpacity style={{width: 50, height: 50, right: 0, marginTop: 50, zIndex: 2, position: 'absolute'}} onPress={this.handlerGoBack.bind(this)}>
                <Text>123</Text>
            </TouchableOpacity>
            <View style={{height: 160, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require("../../assets/img/logo.png")} style={{height: 110, width: 110, marginTop: 70}}/>
            </View>
            <View style={{padding: 10}}>
                <FormLabel>手机号: </FormLabel>
                <FormInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} placeholder={'请输入手机号'} value={this.state.userPhone} onChangeText={(userPhone) => this.setState({userPhone})}/>
                {/* <FormValidationMessage>请输入手机号</FormValidationMessage> */}
                <FormLabel>密码:</FormLabel>
                <FormInput placeholder={'请输入密码'} value={this.state.userPassword}
                           onChangeText={(userPassword) => this.setState({userPassword})}/>
                {/* <FormValidationMessage>请输入密码</FormValidationMessage> */}
            </View>
            <Button backgroundColor={'#33ccb5'} style={{padding: 10}} onPress={this.handlerUserLogin.bind(this)}
                    title="登录"/>

            <View style={{flex: 1, padding: 5, flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{opacity: 1, color: '#33ccb5'}}>快速注册</Text>
                <Text style={{marginLeft: 10, marginRight: 10, opacity: .5}}>|</Text>
                <Text style={{opacity: .5}}>忘记密码</Text>
            </View>
        </View>
      );
    }
}

function select(store) {
    return {
        Devices:store.deviceReducer.Devices
    }
}

export default connect(select)(Login)