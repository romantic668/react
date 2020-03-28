import React from 'react';
import './App.css';
import Header from './components/Header'
import Profile from './components/Profile'
import { Button } from 'react-bootstrap'
import Body from './components/Body'
import { Provider } from 'react-redux'
import store from './store';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt, Switch} from 'react-router-dom';
const Route = require("react-router-dom").Route;




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
        <Router>

          <div className="App">
            <nav className="topnav">
                <ul className="nav nav-tabs bg-primary">
                
                    <li className="" onClick={this.handleSelect.bind(this,0)}>
                        <Link to="/profile">
                          
                            <span><i className="fas fa-id-badge"></i> Profile</span>
                          
                      </Link>
                    </li>
                    <li onClick={this.handleSelect.bind(this,1)}> 
                      <Link to="/bugs">
                            
                            <span><i className="fas fa-id-badge"></i> Bugs</span>
                          
                      </Link>
                    </li>
                    <li ><a id="log_out" href="/login" aria-expanded="true" className="navbar-right"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
                </ul>
            </nav>
            
            <Switch>
              <Route path="/profile">
                <Profile activeTab={this.state.activeTab}/>
              </Route>
              <Route path="/bugs">
                <Body activeTab={this.state.activeTab}/>
              </Route>
            </Switch>
           
          </div>
        </Router>

      </Provider>
    );
  }
}
  

export default App;
