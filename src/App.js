import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Dashboard from './Dashboard/Dashboard';
import GameData from './Game/GameData';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
    renderNav() {
        const token = localStorage.getItem("token");
        let nav;

        if (token) {
            nav = <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={'/dashboard'} className="nav-link">Dashboard</Link>
                </li>
            </ul>;
        } else {
            nav = <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={'/login'} className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/registration'} className="nav-link">Register</Link>
                </li>
            </ul>;
        }

        return nav;
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                        <Link to={'/'} className="nav-link">Dragonslayer</Link>
                        <div className="collapse navbar-collapse">
                            {this.renderNav()}
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <Route path='/dragonslayer-react/registration' component={Registration} />
                    </Switch>
                    <Switch>
                        <Route path='/dragonslayer-react/dashboard' component={Dashboard} />
                    </Switch>
                    <Switch>
                        <Route path='/dragonslayer-react/games/:gameId' component={GameData}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;