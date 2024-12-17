import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';

const App = () => {
  const [isCross, setIsCross] = useState(false); // Track player (cross or circle)
  const [gameWinner, setGameWinner] = useState(''); // Track the game winner
  const [gameState, setGameState] = useState(new Array(9).fill('empty')); // Initial empty board

  // Function to reload/reset the game
  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty'));
  };

  // Function to display messages (toast or alert)
  const showMessage = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.LONG);
    } else {
      Alert.alert('Game Info', message);
    }
  };

  // Function to check the winner
  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameState[a] !== 'empty' &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        setGameWinner(gameState[a]);
        showMessage(`${gameState[a]} won the game! 🏆`);
        return;
      }
    }

    // Check if the game board is full (draw)
    if (!gameState.includes('empty')) {
      setGameWinner('Draw');
      showMessage("It's a draw! 🤝");
    }
  };

  // Function to handle a player's move
  const onBoxPress = (index) => {
    if (gameState[index] === 'empty' && !gameWinner) {
      const newGameState = [...gameState];
      newGameState[index] = isCross ? 'X' : 'O';
      setGameState(newGameState);
      setIsCross(!isCross);
      checkWinner();
    } else {
      showMessage('This box is already filled! 🚫');
    }
  };

  // Render each box of the Tic Tac Toe board
  const renderBox = (index) => (
    <TouchableOpacity
      key={index}
      style={styles.box}
      onPress={() => onBoxPress(index)}
    >
      <Text style={[styles.boxText, { color: gameState[index] === 'X' ? 'red' : 'blue' }]}>
        {gameState[index] !== 'empty' ? gameState[index] : ''}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
      <View>
        <Text style={styles.title}>Tic Tac Toe</Text>
        <Text style={styles.subtitle}>
          {gameWinner
            ? gameWinner === 'Draw'
              ? "It's a Draw! 🤝"
              : `${gameWinner} won the game! 🏆`
            : isCross
            ? "X's Turn"
            : "O's Turn"}
        </Text>
      </View>

      {/* Tic Tac Toe Grid */}
      <View style={styles.board}>
        {gameState.map((_, index) => renderBox(index))}
      </View>

      {/* Reload Game Button */}
      <TouchableOpacity style={styles.button} onPress={reloadGame}>
        <Text style={styles.buttonText}>Restart Game 🔄</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Stylesheet for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#aaaaaa',
    marginBottom: 20,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 2,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ff4757',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default App;
