import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store'
import { AppNavigator } from '../pages/navigator';
import {AppState} from "react-native";


export default class Root extends Component {
    constructor(props) {
        super(props);
        this.flage = false
    }
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState != null && nextAppState === 'active') {
            if (this.flage) {
                console.log("进入前台");
            }
            this.flage = false;
        } else if (nextAppState != null && nextAppState === 'background') {
            console.log('进入后台')
            this.flage = true;
        }
    };
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }


    render(){
        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        )
    }
}
