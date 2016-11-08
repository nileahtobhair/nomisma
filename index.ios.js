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
    this.state.symbols = {"EUR":"€","GBP":"£"};
    this.state.equivalentAmount = '';
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
        <View style={styles.logoView}><TouchableHighlight style={styles.logo} onPress={this.home}><Image source={require('./logo.png')} /></TouchableHighlight></View>
        <View style={styles.revertView}><TouchableHighlight style={styles.switch} onPress={this.switchCurrency.bind(this)}><Image source={require('./switch.png')}/></TouchableHighlight></View>
        <View style={styles.amountView}><Text style={styles.currencySymbol}>{this.state.symbols[this.state.convertTo]}</Text><TextInput style={styles.amountInput} keyboardType='number-pad'  placeholder="Enter amount" onChangeText={(text) => this.setState({text})} value={this.state.text} onSubmitEditing={(event) => this.getAmount(event.nativeEvent.text)}></TextInput></View>
         <View style={styles.resultView}><Text style={styles.currencySymbol}>{this.state.symbols[this.state.convertFrom]}</Text><Text style={styles.amountEqv}>{this.state.equivalentAmount}</Text></View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo:{
  },
  logoView:{
    justifyContent: 'center',
    alignItems: 'center',
    flex:1.5,
    alignItems: 'center',
    paddingRight:10
  },
  revertView:{
    flex:0.25,
  },
  switch:{
     alignSelf: 'flex-end',
     marginRight:20
  },
  amountView:{
    flex:0.5,
    justifyContent: 'center',
    alignItems: 'center'

  },
  resultView:{
    flex:0.5,
    flexDirection: 'row'
  },
  amountInput:{
    borderWidth:1,
    borderColor:'#000',
    width:250,
    height:50,
    borderRadius:4,
    padding:15,
    alignSelf: 'center',
    flex:0.5
  },
  amountEqv:{
    borderWidth:1,
    borderColor:'#000',
    height:50,
    padding:15,
    fontSize:16,
    borderRadius:4,
    alignSelf: 'center',
    flex:6
  },
  currencySymbol:{
    flex:1,
    height:50,
    fontSize:20,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft:80,
    paddingTop:15
  }


});

AppRegistry.registerComponent('nomisma', () => nomisma);
