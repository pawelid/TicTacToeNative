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
  Dimensions,
  Alert
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const dim = Dimensions.get('window');

class Square extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        borderColor: 'black',
        borderWidth: 1,
        flex: 1/3,
      }}
      >

        <Text style={{
          flex: 1,
          fontSize: 100,
          textAlign: 'center',
          textAlignVertical: 'center'
        }}
          onPress={() => { this.props.onPress() }}>
          {this.props.value}
        </Text>
      </View>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    /*
    this.state = {
      squares: Array(9).fill(null),
    };
    */
    this.state = {
      squares: [
        'O', null, 'X',
        'X', 'X', 'O',
        'O', null, null,
      ],
      xIsNext: true
    }
  }

  handlePress(i) {
    let squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onPress={() => { this.handlePress(i) }} />
    );
  }

  renderRow(n) {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
      }}>
        {this.renderSquare(n * 3)}
        {this.renderSquare(n * 3 + 1)}
        {this.renderSquare(n * 3 + 2)}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
      </View>
    );
  }
}

export default class App extends Component {
  render() {

    // TODO how to see log?
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
