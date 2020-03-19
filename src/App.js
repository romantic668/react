import React from 'react';
import './App.css';
import Header from './components/Header'
import Bugs from './components/Bugs'


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activeTab : 0
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(index){
    console.log(index)
    this.setState({
      activeTab: index
    });
  }

  render(){
    
    return (
      <div className="App">
        <Header handleSelect={this.handleSelect}/>
        <Bugs activeTab={this.state.activeTab}/>
      </div>
    );
  }
}
  

export default App;
