import React from 'react';
import './App.css';
import Profile from './components/Profile'
import SignIn from './components/auth/SignIn'
import Logout from './components/auth/Logout'

import Body from './components/Body'
import { Provider } from 'react-redux'
import store from './store';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
const Route = require("react-router-dom").Route;




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: JSON.parse(localStorage.getItem("activeTab")) || 0
    };
    this.handleSelect = this.handleSelect.bind(this);
  }



  handleSelect(index) {
    this.setState({
      activeTab: index
    });
    localStorage.setItem("activeTab", index)
  }

  render() {
    const navBar = (<nav className="topnav">
      <ul className="nav nav-tabs bg-primary">

        <li className={!this.state.activeTab ? "active" : ""} onClick={this.handleSelect.bind(this, 0)}>
          <Link to="/profile">

            <span><i className="fas fa-id-badge"></i> Profile</span>

          </Link>
        </li>
        <li className={this.state.activeTab ? "active" : ""} onClick={this.handleSelect.bind(this, 1)}>
          <Link to="/bugs">

            <span><i className="fas fa-bug"></i> Bugs</span>

          </Link>
        </li>
        <Logout />
      </ul>
    </nav>);

    return (
      <Provider store={store}>
        <Router>

          <div className="App">


            <Switch>
              <Route path="/(|home|login|logout)/" exact>
                <SignIn activeTab={this.state.activeTab} handleSelect={this.handleSelect} />
              </Route>
              <Route path="/profile">
                {navBar}
                <Profile activeTab={this.state.activeTab} />
              </Route>
              <Route path="/bugs">
                {navBar}
                <Body activeTab={this.state.activeTab} />
              </Route>
            </Switch>

          </div>
        </Router>

      </Provider>
    );
  }
}


export default App;
