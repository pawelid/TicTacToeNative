/**
 * Tic Tac Toe react native app
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const dim = Dimensions.get('window');

class Square extends Component {
  render() {
    return (
      <View style={{
        borderColor: 'black',
        borderWidth: 1,
        flexGrow: 1,

      }}>
        <Text style={{
          flex: 1,
          flexGrow: 1,
          fontSize: 100,
          textAlign: 'center',
          textAlignVertical: 'center'
        }}>
          O
        </Text>
      </View>
    );
  }
}

class Board extends Component {
  renderRow() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
      }}>
        <Square />
        <Square />
        <Square />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {this.renderRow()}
        {this.renderRow()}
        {this.renderRow()}
      </View>
    );
  }
}

export default class App extends Component {
  render() {

    // TODO how to see
    console.log('dim');
    console.log(dim);

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Tic Tac Toe!
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Board />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
