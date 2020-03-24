import React from 'react';
import './App.css';
import Header from './components/Header'
import Body from './components/Body'
import { Provider } from 'react-redux'
import store from './store';



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
      <Provider store ={store}>
        <div className="App">
          <Header handleSelect={this.handleSelect}/>
          <Body activeTab={this.state.activeTab}/>
        </div>
      </Provider>
    );
  }
}
  

export default App;
