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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeebe8',
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
  amountInput:{
    height:50,
    borderRadius:3,
    width:355,
    textAlign: 'center',
    marginLeft:30,
    marginBottom: 30,
    backgroundColor: '#fff',
    shadowColor: 'rgba(187,187,187,1)'
  },
  switch:{
    width:50,
    height:50,
    marginLeft:300,
    marginTop:30
  },
  result:{
    borderBottomWidth:2,
    borderBottomColor:'#000',
    width:355,
    height:50,
    textAlign:'center',
    marginTop:55,
    paddingTop:10,
    backgroundColor:'#fff',
    borderRadius:4
  }
});

AppRegistry.registerComponent('nomisma', () => nomisma);
