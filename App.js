import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import Constants from "expo-constants";

import {vibrate} from './utils';

let initClockBoolean = false

export default class App0 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      work: 25,
      break: 5,
      timerstatus: "Work!",
      minutes: 0,
    }
  }

  initClock = () => {
    this.setState(prevState => ({
      minutes: prevState.work,
    }))
  }

  countStarter = () => {
    this.Itervalclock = setInterval(() => this.counterTime(), 1000)
  }

  counterTime = () => {
    if (this.state.count <= 0) {
      if (this.state.minutes <= 0 && this.state.count <= 0) {
        if (this.state.timerstatus === "Break!") {
          this.setState(prevState => ({
            timerstatus: "Work!",
          }))
          this.setState(prevState => ({
            minutes: this.state.work,
          }))
          vibrate()
        } else {
          this.setState(prevState => ({
            timerstatus: "Break!",
          }))
          this.setState(prevState => ({
            minutes: this.state.break,
          }))
          vibrate()
        }
      } else {
        this.setState(prevState => ({
          count: 59,
        }))
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
        }))
      }
    } else {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }))
    }
  }

  startClock = () => {
    if (this.Itervalclock) {
      clearInterval(this.Itervalclock)
    }

    if (!initClockBoolean) {
      this.initClock()
      initClockBoolean = true
    }
    this.countStarter()
  }

  stopClock = () => {
    clearInterval(this.Itervalclock)
  }

  resetClock = () => {
    clearInterval(this.Itervalclock)
    this.setState(prevState => ({
      timerstatus: "Work!",
    }))
    this.setState(prevState => ({
      minutes: prevState.work,
    }))
    this.setState(prevState => ({
      count: 0,
    }))
  }

  TimeControllerWork = (newText) => {

    if (parseInt(newText) >= 1 && parseInt(newText) <= 59) {
      this.setState(prevState => ({
        work: parseInt(newText),
      }))
      if (!this.Itervalclock) {
        this.initClock()
      }
    } else {
      if (parseInt(newText) <= 0) {
        this.setState(prevState => ({
          work: 1,
        }))
        if (!this.Itervalclock) {
          this.initClock()
        }
      } else if (parseInt(newText) >= 60) {
        this.setState(prevState => ({
          work: 59,
        }))
        if (!this.Itervalclock) {
          this.initClock()
        }
      }
    }
  }

  TimeControllerBreak = (newText) => {

    if (parseInt(newText) >= 1 && parseInt(newText) <= 59) {
      this.setState(prevState => ({
        break: parseInt(newText),
      }))
      if (!this.Itervalclock) {
        this.initClock()
      }
    } else {
      if (parseInt(newText) <= 0) {
        this.setState(prevState => ({
          break: 1,
        }))
        if (!this.Itervalclock) {
          this.initClock()
        }
      } else if (parseInt(newText) >= 60) {
        this.setState(prevState => ({
          break: 59,
        }))
        if (!this.Itervalclock) {
          this.initClock()
        }
      }
    }
  }

  render() {
    return (
    <View style={styles.container}>
      <Text style={styles.AppName}>Pomodoro Timer</Text>
      <Text style={styles.timerStatus}>TIME FOR: <Text style={styles.TimeFor}>{this.state.timerstatus}</Text></Text>
      <Text style={styles.clockStyle}>{("0" + this.state.minutes).slice(-2)}:{("0" + this.state.count).slice(-2)}</Text>
      <View style={styles.TextInputViews}>
        <Text>Enter work minutes. (1 - 59 minutes)</Text>
        <TextInput maxLength={2} onChangeText={this.TimeControllerWork} keyboardType="numeric" placeholder="Enter Work timer. (Default: 25 mins)" />
      </View>
      <View style={styles.TextInputViews}>
        <Text>Enter break minutes. (1 - 59 minutes)</Text>
        <TextInput maxLength={2} onChangeText={this.TimeControllerBreak} keyboardType="numeric" placeholder="Enter Break timer. (Default: 5 mins)" />
      </View>
      <View style={styles.buttonScroll}>
        <Button style={styles.buttonStyle} title="Start" onPress={() => this.startClock()}/>
        <Button style={styles.buttonStyle} title="Stop" onPress={() => this.stopClock()} />
        <Button style={styles.buttonStyle} title="Reset" onPress={() => this.resetClock()}/>
      </View>
      <StatusBar style="auto" />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  AppName: {
    fontSize: 40,
    fontWeight: "bold",
  },
  timerStatus: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 30,
  },
  TimeFor: {
    fontWeight: "bold",
  },
  clockStyle: {
    fontSize: 90,
    color: 'black',
  },
  TextInputViews: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  buttonScroll: {
    flexDirection: "row",
    backgroundColor: "gray",
    paddingRight: 100,
    paddingLeft: 100,
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: "space-between",
  },
  buttonStyle: {
    color: 'black',
    backgroundColor: "red",
    fontWeight: "bold",
    borderRadius: 15,
    justifyContent: "space-between",
  },
});
