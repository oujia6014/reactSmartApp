import React, {Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
// import { increase, decrease, reset } from '../../redux/actions/DeviceAction';
class Home extends Component {
    static navigationOptions = {
      title:'主页',
      headerBackTitle:'返回',
      tabBarIcon:<View style={{height:30,width:30,backgroundColor:'blue'}}></View>,
    }

    // constructor(props){
    //   super(props)
    //   this.state = {
    //     list:[]
    //   }
    // }
    _onPressReset() {
        this.props.dispatch(reset());
    }

    _onPressInc() {
        this.props.dispatch(increase());
    }

    _onPressDec() {
        this.props.dispatch(decrease());
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

            {/*<Text>{this.props.counter.count}</Text>*/}
            <TouchableOpacity onPress={()=>this._onPressReset()}>
                <Text>归零</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>this._onPressInc()}>
                <Text>加1</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>this._onPressDec()}>
                <Text>减1</Text>
            </TouchableOpacity>

        </View>
      );
    }
  }

export default Home
// const mapStateToProps = state => ({
//     counter: state.counter
// })

// export default connect(mapStateToProps)(Home);

// function select(store) {
//     return {
//       InitDeviceReducer : store.InitDeviceReducer,
//     }
// }
// export default connect(select)(Home);