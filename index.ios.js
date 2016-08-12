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
        <Text
          style={styles.result}>
          {this.state.equivalentAmount}
        </Text>
        <TouchableHighlight onPress={this.switchCurrency.bind(this)}>
          <Image
            style={styles.switch}
            source={require('./switch.png')}
        />
       </TouchableHighlight>
        <TextInput
            style={styles.amountInput}
            keyboardType='number-pad'
            placeholder="Enter amount"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onSubmitEditing={(event) => this.getAmount(event.nativeEvent.text)}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
  amountInput:{
    height:40,
    borderColor: 'gray', 
    borderWidth: 1, 
    width:395,
    textAlign: 'center',
    marginLeft:10,
    marginTop:30
  },
  switch:{
    width:50,
    height:50,
    marginLeft:300,
    marginTop:30
  },
  result:{
    borderWidth:2,
    borderColor:'#000',
    width:395,
    height:40,
    textAlign:'center',
    paddingTop:10
  }
});

AppRegistry.registerComponent('nomisma', () => nomisma);
