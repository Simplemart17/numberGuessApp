import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          // source={require('../assets/success.png')} // for local images
          source={{uri: 'https://image.freepik.com/free-vector/game-background_23-2148080814.jpg'}} // for network images
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{' '} 
          <BodyText style={styles.highlight}>{props.roundsCount}</BodyText> rounds to guess the number{' '}
          <BodyText style={styles.highlight}>{props.userNumber}</BodyText>
        </BodyText>
      </View>
      <MainButton onPress={props.startNewGame}>START NEW GAME</MainButton>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlight: {
    color: Colors.primary,
    fontWeight: '700',
    marginVertical: 30,
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 25
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    marginBottom: 20,
    marginHorizontal: 30,
  },
  resultText: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
  }
});

export default GameOverScreen;
