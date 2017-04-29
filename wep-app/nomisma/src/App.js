import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      convert_from :"GBP",
      convert_to: "EUR",
      converted_amount: undefined,
      rates:undefined,
      symbols:{"EUR":"€",
               "GBP":"£",
               "USD":"$",
               "AUS":"AU$",
               "BGN":"лв",
               "BRL":"R$",
               "CAD":"$",
               "CHF":"CHF",
               "DKK":"kr",
               "HKD":"$(HK)",
               "HUF":"Ft",
               "IDR":"Rp",
               "ILS":"₪",
               "INR":"₹",
               "JPY":"¥",
               "KRW":"₩",
               "MXN":"$(MEX)",
               "RON":"lei",
               "MYR":"RM",
               "NOK":"kr",
               "PHP":"₱",
               "PLN":"zł",
               "RUB":"₽",
               "TRY":"₺",
               "SEK":"kr",
               "CNY":"¥" },
      amount_to_convert: "",
      show_menu : false
    }
  }

  componentDidMount(){
    this.get_rates()
  }
  /*
   * Set the state that determines wether the menu is visible.
   * Triggered on change currency button click.
   * State value is boolean and set to value it is currently not.
   */
  toggle_menu_display(){
    var toggle = this.state.show_menu === true ? false:true;
    this.setState({
      show_menu : toggle
    });
  }
  /*
   *
   */
  change_from_rate(event){
    console.log(event);
    var main = this;
    //event.target.value
    this.setState({
      convert_from : event.target.value
    },function(resp){
      main.get_rates();
    })
  }
  change_to_rate(event){
    this.setState({
      convert_to : event.target.value
    });
  }

  _render_menu(){
    var main = this;
    var rates = this.state.rates;
    console.log('typeof rates',typeof(rates));
    var options = [];
    if(this.state.rates!==undefined){
      for(var rate in main.state.rates){
        options.push(<option key={rate} value={rate}>{rate}</option>)
      }
    }
    return(<div className="rates-menu"><div><select onChange={ (e) => main.change_from_rate(e) } id="change-from">{options}</select></div><div><select onChange={ (e) => main.change_to_rate(e) } id="change-to">{options}</select></div></div>)
  }
  /*
   * Get exchange rates from fixer.io api.
   * Set rates returned as state variable.
   * Called on component load && base currency change
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
      var amount = parseInt(event.target.value,10) * main.state.rates[main.state.convert_to];
      var amount_to_convert = isNaN(parseInt(event.target.value,10)) ? "" : parseInt(event.target.value,10);
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
  /*
   * Main render function. Called on state change.
   */
  render() {
    var main=this;
    return (
      <div className="nomisma-web-app">
        <div className="header">
          <div className="title"> Nomisma </div>
          <div className="menu-toggle" onClick={ (e) => main.toggle_menu_display(e) } >Change currency</div>
          {main.state.show_menu === true ?
              <span>
               {main._render_menu() }
              </span>
          : <span></span>
          }
          
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
