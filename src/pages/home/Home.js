
import React, {Component} from 'react';
import {View} from 'react-native';
import { Button } from 'react-native-elements'
class Home extends Component {
    static navigationOptions = {
      title:'主页',
      headerBackTitle:'返回',
      tabBarIcon:<View style={{height:30,width:30,backgroundColor:'blue'}}></View>,
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
  export default Home