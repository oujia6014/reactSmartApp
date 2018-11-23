import React, {Component} from 'react';
import {View,Image,TouchableOpacity} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage,Button,Text } from 'react-native-elements'
import HttpRequest from '../../utils/HttpRequest'
// import { connect } from 'react-redux';
// import { actionDevice } from '../../redux/actions/DeviceAction'

export class Login extends Component {
    static navigationOptions = {
      // title:'登录',
      // headerBackTitle:'返回'
      header:null
    }
    constructor(props){
      super(props)
      this.state={
        userPhone:'17620683001',
        userPassword:'1234567a'
      }
    }
    
    handlerUserLogin(){
      let fromData = {
        mobile:this.state.userPhone,
        password:this.state.userPassword,
        code:''
      }
      HttpRequest("/user/login",fromData)
        .then((response) => {
          console.log('请求成功：'+response)
          let data = JSON.parse(response)
          this.contentWebSocket(data);
        })
        .catch(error => {
          console.log(`请求失败： ${error[_bodyInit]}`)
        });
    }

    contentWebSocket(data) {
      this.ws = new WebSocket('wss://rubycomet.vanward.com:2301/ws');
      this.ws.onopen = () => {
          let prams = {
              Id: data.User.Uuid,
              Token: data.User.Token
          }
          console.log('向云发送:  ' + JSON.stringify(prams))
          let senddata = this.sendMessages(0, JSON.stringify(prams))
          this.ws.send(senddata)
      }
  
  
      this.ws.onmessage = (e) => {
          let resDataArray = new Uint8Array(e.data);
          let op = this.bytesToInt([resDataArray[0]]);
          let content = this.uintToString(resDataArray.slice(5, resDataArray.length));
          if(op === 0){
            this.props.dispatch(actionDevice(content))
          }
          console.log(op + '| 返回值: ' + content);
      }
  
      this.ws.onerror = (e) => {
          console.log('错误：' + e.message);
      }
    }


    sendMessages(op,data){
      var msg = new Uint8Array(5);
      msg[0] = op;
      let messageArray = this.stringToUint(data);
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

    stringToUint(data) {
      let string = data,
        charList = string.split(''),
        uintArray = [];
      for (var i = 0; i < charList.length; i++) {
        uintArray.push(charList[i].charCodeAt(0));
      }
      return new Uint8Array(uintArray);
    }

    uintToString(uintArray) {
      let encodedString = String.fromCharCode.apply(null, uintArray),
      decodedString = decodeURIComponent(escape(encodedString));
      return decodedString;
    }
  
    
    bytesToInt(bytesArray) {
      var resultInt = 0;
      var bLoop;  
      for (var i = 0; i < bytesArray.length; i++) {
        bLoop = bytesArray[i];
        resultInt += (bLoop & 255) << (8 * i);
      }
      return resultInt;
    }

    handlerGoBack(){
      console.log('点击了返回~~')
      this.props.navigation.goBack()
    }

    render() {
    return (
      
      <View style={{flex: 1,backgroundColor:'#fff'}}>
        <TouchableOpacity style={{width:50,height:50,right: 0,marginTop:50,zIndex:2,position:'absolute'}} onPress={this.handlerGoBack.bind(this)}> 
              <Text>123</Text>
        </TouchableOpacity>
        <View  style={{height:160,justifyContent: 'center',alignItems: 'center'}} >
          <Image  source={require("../../assets/img/logo.png")} style={{height:110,width:110,marginTop:70}}/>
        </View>
        <View style={{padding: 10}}>
          <FormLabel>手机号: </FormLabel>
          <FormInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} placeholder={'请输入手机号'} value={this.state.userPhone}  onChangeText={(userPhone) => this.setState({userPhone})}/>
          {/* <FormValidationMessage>请输入手机号</FormValidationMessage> */}
          <FormLabel>密码:</FormLabel>
          <FormInput placeholder={'请输入密码'} value={this.state.userPassword}  onChangeText={(userPassword) => this.setState({userPassword})} />
          {/* <FormValidationMessage>请输入密码</FormValidationMessage> */}
        </View>
        <Button backgroundColor={'#33ccb5'} style={{padding: 10}} onPress={this.handlerUserLogin.bind(this)} title="登录"/>
        <View style={{flex: 1,padding: 5,flexDirection:'row',justifyContent:'center'}}>
          <Text style={{opacity:1,color:'#33ccb5'}}>快速注册</Text>
          <Text style={{marginLeft:10,marginRight:10,opacity:.5}}>|</Text>
          <Text style={{opacity:.5}}>忘记密码</Text>
        </View>



      </View >
      );
    }
}

export default Login;

// function select(store) {
//     return {
//       InitDeviceReducer : store.InitDeviceReducer,
//     }
// }
// export default connect(select)(Login);