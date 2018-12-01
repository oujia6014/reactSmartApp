import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import TabComponent from '../component/TabComponent'
import Home from './home/Home';
import User from './user/User'
import Login from './public/Login'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GasL8 from './device/GasL8'


const HomeStack = createStackNavigator({
    Home: Home,
    Login: Login,
    GasL8: GasL8
});

const UsersStack = createStackNavigator({
    User: User,
    Login: Login,
});

//子页面隐藏tabBar
HomeStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};
UsersStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};

/**
 * Tab点击跳转调用的公共方法
 */
const route = (navigation) => {
    if (!navigation.isFocused()) {
        navigation.navigate(navigation.state.routeName, {
            title: navigation.state.routeName
        })
    }
};

export const AppNavigator = createBottomTabNavigator({
        主页: {
            screen: HomeStack,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '主页',
                tabBarIcon: ({tintColor}) => (
                    <FontAwesome
                        name={'wpforms'}
                        size={20}
                        color={tintColor}
                    />
                ),
                tabBarOnPress: () => {
                    route(navigation)
                }
            }),
        },
        用户: {
            screen: UsersStack,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '用户',
                tabBarIcon: ({tintColor}) => (
                    <FontAwesome
                        name={'wpforms'}
                        size={20}
                        color={tintColor}
                    />
                ),
                tabBarOnPress: () => {
                    route(navigation)
                }
            }),
        }
    },
    {
        tabBarComponent: TabComponent,
        tabBarOptions: {
            activeTintColor: '#FE6822',
            inactiveTintColor: 'gray',
            showIcon: true
        },

    }
);