import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/Store';
import { AppNavigator } from '../pages/navigator';

const store = configureStore();

export default class Root extends Component {
    render(){
        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        )
    }
}
