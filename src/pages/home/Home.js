
import React, {Component} from 'react';
import {View} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
export class Home extends Component {
    static navigationOptions = {
      title:'主页',
      headerBackTitle:'返回',
      tabBarIcon:<View style={{height:30,width:30,backgroundColor:'blue'}}></View>,
    }

    constructor(props){
      super(props)
      this.state = {
        list:[]
      }
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.InitDeviceReducer != null){
        console.log('========================'+JSON.stringify(nextProps.InitDeviceReducer,null,'\t'))
      }
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

function select(store) {
    return {
      InitDeviceReducer : store.InitDeviceReducer,
    }
}
export default connect(select)(Home);