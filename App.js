import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const MapComponent = () => {
  const map = [
    [0, 0, 1, 0, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0],
  ];

  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  const movePlayer = (direction) => {
    const { x, y } = playerPosition;
    let newPosition = { x, y };

    switch (direction) {
      case 'up':
        newPosition = { x, y: y - 1 };
        break;
      case 'down':
        newPosition = { x, y: y + 1 };
        break;
      case 'left':
        newPosition = { x: x - 1, y };
        break;
      case 'right':
        newPosition = { x: x + 1, y };
        break;
      default:
        break;
    }

    // Vérifie les collisions
    if (
      newPosition.x >= 0 &&
      newPosition.x < map[0].length &&
      newPosition.y >= 0 &&
      newPosition.y < map.length &&
      map[newPosition.y][newPosition.x] === 0
    ) {
      setPlayerPosition(newPosition);
    }
  };

  const handleInput = (direction) => {
    movePlayer(direction);
  };

  // Gère les entrées via des boutons ou des gestes
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        {/* Carte */}
        <View style={styles.map}>
          {map.map((row, rowIndex) =>
            row.map((cell, cellIndex) => {
              const isPlayerHere =
                playerPosition.x === cellIndex && playerPosition.y === rowIndex;
              return (
                <View
                  key={`${rowIndex}-${cellIndex}`}
                  style={[
                    styles.cell,
                    cell === 1 ? styles.blocked : styles.free,
                    isPlayerHere && styles.player,
                  ]}
                />
              );
            })
          )}
        </View>

        {/* Boutons de direction */}
        <View style={styles.controls}>
          <View style={styles.row}>
            <TouchableWithoutFeedback onPress={() => handleInput('up')}>
              <View style={styles.button}>
                <View style={styles.arrowUp} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.row}>
            <TouchableWithoutFeedback onPress={() => handleInput('left')}>
              <View style={styles.button}>
                <View style={styles.arrowLeft} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handleInput('down')}>
              <View style={styles.button}>
                <View style={styles.arrowDown} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handleInput('right')}>
              <View style={styles.button}>
                <View style={styles.arrowRight} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
  },
  free: {
    backgroundColor: '#a8e6cf',
  },
  blocked: {
    backgroundColor: '#ff8b94',
  },
  player: {
    backgroundColor: '#ffd700',
  },
  controls: {
    marginTop: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    margin: 5,
    borderRadius: 30,
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#000',
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#000',
  },
  arrowLeft: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderRightWidth: 15,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#000',
  },
  arrowRight: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#000',
  },
});