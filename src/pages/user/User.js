import React, {Component} from 'react';
import {View,Button} from 'react-native';

class User extends Component {
    static navigationOptions = {
      title:'用户设置',
      headerBackTitle:'返回'
    }
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title="跳转至登录页"
            onPress={() => this.props.navigation.push('Login')}
          />
        </View>
      );
    }
  }
  export default User