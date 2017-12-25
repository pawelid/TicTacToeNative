/**
 * Tic Tac Toe react native app
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert
} from 'react-native';

const dim = Dimensions.get('window');

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Square extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        borderColor: 'black',
        borderWidth: 1,
        flex: 1 / 3,
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
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  handlePress(i) {
    if (this.state.squares[i] || calculateWinner(this.state.squares)) {
      return;
    }

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
      <View style={styles.row}>
        {this.renderSquare(n * 3)}
        {this.renderSquare(n * 3 + 1)}
        {this.renderSquare(n * 3 + 2)}
      </View>
    );
  }

  render() {

    const winner = calculateWinner(this.state.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <View style={styles.board}>
        <Text style={styles.instructions}>
          {status}
        </Text>
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
          Tic Tac Toe
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
    color: 'black',
    margin: 10,
  },
  instructions: {
    fontSize: 20,
    textAlign: 'left',
    color: 'black',
    marginBottom: 10,
  },
  board: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  }
});
