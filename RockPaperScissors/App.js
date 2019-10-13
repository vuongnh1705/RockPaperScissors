import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

const CHOICES = [
  {
    name: 'rock',
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png'
  },
  {
    name: 'paper',
    uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png'
  },
  {
    name: 'scissors',
    uri:
      'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png'
  }
];

const Button = props => (
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => props.onPress(props.name)}
  >
    <Text style={styles.buttonText}>
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
);

const ChoiceCard = ({ player, choice: { uri, name } }) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>{player}</Text>
      <Image source={{ uri }} resizeMode="contain" style={styles.choiceImage} />
      <Text style={styles.choiceCardTitle}>{title}</Text>
    </View>
  );
};
const randomComputerChoice = () =>
  CHOICES[Math.floor(Math.random() * CHOICES.length)];

const getRoundOutcome = userChoice => {
  const computerChoice = randomComputerChoice().name;
  let result;
  if (userChoice === 'rock') {
    result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'paper') {
    result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'scissors') {
    result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === computerChoice) result = 'Tie game!';
  return [result, computerChoice];
};


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gamePrompt: 'Choose your weapon!',
      userChoice: '',
      computerChoice: '',
      count: 0,
      win: 0,
      lose: 0,
      tie: 0,
      percentWin: 0,
      percentLose: 0,
      percentTie: 0
    }
  }
  render() {
    const onPress = playerChoice => {
      const [result, compChoice] = getRoundOutcome(playerChoice);
      const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
      const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);
      var c = this.state.count + 1;
      var w, l, t;
      var percentW = 0, percentL = 0, percentT = 0;
      if (result === 'Victory!') {
        w = this.state.win + 1;
        l = this.state.lose;
        t = this.state.tie;
      }
      else if (result === 'Defeat!') {
        l = this.state.lose + 1;
        w = this.state.win;
        t = this.state.tie;
      }
      else {
        t = this.state.tie + 1;
        w = this.state.win;
        l = this.state.lose;
      }
      percentW = (w / c * 100).toFixed(2);
      percentL = (l / c * 100).toFixed(2);
      percentT = (t / c * 100).toFixed(2);
      this.setState({
        userChoice: newUserChoice,
        computerChoice: newComputerChoice,
        gamePrompt: result,
        count: c,
        win: w,
        lose: l,
        tie: t,
        percentLose: percentL,
        percentWin: percentW,
        percentTie: percentT
      })
    };

    const getResultColor = () => {
      if (this.state.gamePrompt == 'Victory!') return 'green';
      if (this.state.gamePrompt == 'Defeat!') return 'red';
      if (this.state.gamePrompt == 'Tie game!') return 'yellow';
      return null;
    };
    return (
      <View style={styles.container} >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={{ fontSize: 35, color: getResultColor() }}>{this.state.gamePrompt}</Text>
          <View style={styles.choicesContainer}>
            <ChoiceCard player="Player" choice={this.state.userChoice} />
            <Text style={{ color: '#025952' }}>vs</Text>
            <ChoiceCard player="Computer" choice={this.state.computerChoice} />
          </View>
          {CHOICES.map(choice => {
            return (
              <Button
                key={choice.name}
                name={choice.name}
                onPress={onPress}
              />
            )
          })}
          <View><Text style={{ color: 'blue', fontSize: 29, fontWeight: 'bold' }}>Game History</Text></View>
          <View>
            <Text>Player Total: {this.state.count}</Text>
            <Text>Win:  {this.state.win} : {this.state.percentWin}%</Text>
            <Text>Lose: {this.state.lose} : {this.state.percentLose}%</Text>
            <Text>Tie:  {this.state.tie} : {this.state.percentTie}%</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  scroll: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 100,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#250902'
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  }
});
