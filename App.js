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
  Alert,
  Button
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
      let winningSquares = Array(9).fill(false);
      winningSquares[a] = winningSquares[b] = winningSquares[c] = true;
      return {
        winner: squares[a],
        winningSquares: winningSquares
      }
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
      <View style={styles.square}>

        <Text style={{
          flex: 1,
          fontSize: this.props.highlight ? 100 : 50,
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
      winningSquares: Array(9).fill(false),
      xIsNext: true,
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

    let winner = calculateWinner(squares);
    if (winner) {
      this.setState({ winningSquares: winner.winningSquares });
    }
  }

  handleReset() {
    this.setState({
      squares: Array(9).fill(null),
      winningSquares: Array(9).fill(false),
      xIsNext: true,
    })
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        highlight={this.state.winningSquares[i]}
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
      status = "Winner: " + winner.winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <View style={styles.board}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 50
          }}>
          <Text style={styles.instructions}>
            {status}
          </Text>
          <View style={{ height: 20, width: 100 }}>
          <Button
            title='Reset'
            onPress={() => { this.handleReset() }}
          />
          </View>
        </View>
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
    height: 40,
    fontSize: 20,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: 'black',

  },
  board: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  square: {
    borderColor: 'black',
    borderWidth: 1,
    flex: 1 / 3,
  }
});
