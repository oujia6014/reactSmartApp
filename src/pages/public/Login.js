import React, {Component} from 'react';
import {View,Text} from 'react-native';

class Login extends React.Component {
    static navigationOptions = {
      title:'登录',
      headerBackTitle:'返回'
    }
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>登录界面</Text>
        </View>
      );
    }
  }
  export default Login