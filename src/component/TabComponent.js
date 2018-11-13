import React from 'react';
import { Keyboard } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';

export default class TabComponent extends React.Component {
  state = { visible: true };

  componentDidMount() {
    this.kbShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.kbHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  keyboardWillShow = () => {
    console.log('keyboardwillshow');
    this.setState({ visible: false });
  };

  keyboardWillHide = () => {
    console.log('keyboardwillhide');
    this.setState({ visible: true });
  };

  componentWillUnmount() {
    this.kbShowListener.remove();
    this.kbHideListener.remove();
  }

  render() {
    return this.state.visible && <BottomTabBar {...this.props} />
  }
}