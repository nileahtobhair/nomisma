/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

class nomisma extends Component {
  constructor(props){
    super(props);
    this.state = {text: undefined};
    this.state.convertFrom= 'GBP';
    this.state.convertTo= 'EUR';
  }

  switchCurrency(){
    var oldTo = this.state.convertTo;
    var oldFrom = this.state.convertFrom;
 
    this.setState((state) => {
      return {
        convertTo: oldFrom,
        convertFrom: oldTo,
        equivalentAmount:''
      }
    });
  }

  home(){

  }

  getAmount(amount){
    this.setState((state) => {
      return {
        text: ''
      }
    });
    var rates = fetch('http://api.fixer.io/latest?base='+this.state.convertFrom)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState((state) => {
          return {
            equivalentAmount: responseJson.rates[this.state.convertTo]*amount
          }
        });
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.home}>
          <Image
            style={styles.logo}
            source={require('./logo.png')}
        />
       </TouchableHighlight>
         <TextInput
            style={styles.amountInput}
            keyboardType='number-pad'
            placeholder="Enter amount"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onSubmitEditing={(event) => this.getAmount(event.nativeEvent.text)}
        ></TextInput>
        <TouchableHighlight onPress={this.switchCurrency.bind(this)}>
          <Image
            style={styles.switch}
            source={require('./switch.png')}
        />
       </TouchableHighlight>
         <Text
          style={styles.result}>
          {this.state.equivalentAmount}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  amountInput:{
    height:50,
    width:355,
    textAlign: 'center',
    marginLeft:30,
    marginTop:60,
    borderWidth:1,
    borderColor:'#A19A9A',
    color:'#A19A9A'
  },
  switch:{
    width:40,
    height:40,
    marginTop:50
  },
   logo:{
    marginTop:100,
    width:185,
    height:185,
  },
  result:{
    borderColor:'#A19A9A',
    width:355,
    height:50,
    paddingTop:15,
    textAlign:'center',
    marginTop:55,
    fontSize:16,
    borderWidth:1,
    color:'#A19A9A'
  }
});

AppRegistry.registerComponent('nomisma', () => nomisma);
