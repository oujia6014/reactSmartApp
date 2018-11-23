import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store'
import { AppNavigator } from '../pages/navigator';


export default class Root extends Component {
    render(){
        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        )
    }
}
