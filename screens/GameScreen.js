import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const generateRandomNum = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNumber = Math.floor(Math.random() * (max - min)) + min;

  if (rndNumber === exclude) {
    return generateRandomNum(min, max, exclude);
  } else {
    return rndNumber;
  };
};

const renderNumberList = (value, numOfRounds) => (
  <View key={value} style={styles.numberLists}>
    <BodyText>#{numOfRounds}</BodyText>
    <BodyText>{value}</BodyText>
  </View>)

const GameScreen = props => {
  const initialGuess = generateRandomNum(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessedNumber, setGuessedNumber] = useState([initialGuess]);
  
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;
  
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(guessedNumber.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (direction === 'lower' && currentGuess < props.userChoice) {
      Alert.alert('Try Again!!!', `The number is greater than ${currentGuess}`, [{text: 'OKAY', style: 'cancel'}]);
      return;
    };
    if (direction === 'greater' && currentGuess > props.userChoice) {
      Alert.alert('Try Again!!!', `The number is less than ${currentGuess}`, [{text: 'OKAY', style: 'cancel'}]);
      return;
    };
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    };
      const nextNumber = generateRandomNum(currentLow.current, currentHigh.current, currentGuess);
      setCurrentGuess(nextNumber);
      setGuessedNumber(prevGuess => [nextNumber, ...prevGuess]);
  };

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's Guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <AntDesign name='left' size={24} color='white' />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <AntDesign name='right' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.listView}>
          {guessedNumber.map((number, index) => renderNumberList(number, guessedNumber.length - index))}
        </ScrollView>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    width: 300,
    maxWidth: '90%'
  },
  listContainer: {
    flex: 1,
    width: '80%',
  },
  listView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  numberLists: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'
  }
});

export default GameScreen;
