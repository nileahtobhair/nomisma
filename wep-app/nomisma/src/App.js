import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      convert_from :"EUR",
      convert_to: "USD",
      converted_amount: undefined,
      rates:undefined,
      symbols:{"EUR":"€","GPB":"£","USD":"$"},
      amount_to_convert: ""
    }
  }

  componentDidMount(){
    this.get_rates()
  }
  /*
   * Get exchange rates from fixer.io api.
   * Set rates returned as state variable.
   * Called on component load.
   */
  get_rates(){
    var main=this;
    fetch('http://api.fixer.io/latest?base='+main.state.convert_from)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState((state) => {
          return {
           rates: responseJson.rates
          }
        });
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  /*
   * Calculate input equivalent amount in convert_from currency.
   * convert_from & conversion rates stored in state variables.
   * Set "" as converted amount if converted amount isNan.
   * Triggered on input change.
   */
  calculate_amount(event) {
    var main=this;
    if( typeof event.target.value !== undefined && event.target.value !== ""){
      var amount = parseInt(event.target.value) * main.state.rates[main.state.convert_to];
      var amount_to_convert = isNaN(parseInt(event.target.value)) ? "" : parseInt(event.target.value);
      amount  = isNaN(amount) ? 0 : amount;
      this.setState({
        converted_amount : amount.toFixed(2),
        converted_amount_precise: amount, 
        amount_to_convert : amount_to_convert
      })
    }else{
       this.setState({
        amount_to_convert : 0
      })
    }
  }
  render() {
    var main=this;
    return (
      <div className="nomisma-web-app">
        <div className="header">
          <div className="title"> Nomisma </div>
        </div>
        <div className="main-component">
          <div className="convert-from-container">
            <div className="from-symbol">{main.state.symbols[main.state.convert_from]}</div>
            <input value={main.state.amount_to_convert} onChange={ (e) => main.calculate_amount(e) } type="text" placeholder="Enter Amount"/>
          </div>
          {main.state.converted_amount!==undefined ?
            <div className="convert-to-container">
            <div className="to-symbol">{main.state.symbols[main.state.convert_to]}</div>
            <div className="converted-amount">{main.state.converted_amount}</div>
            </div>
            : <span></span>
          }
        </div>
      </div>
    );
  }
}

export default App;
