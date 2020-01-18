import React, { Component } from 'react';
import Game from './../Game/Game';
import './../App.css';

class Dashboard extends Component {
    render() {
        return (
            <div className="mb-2 pageheading row">
                <div className="col-sm-12 btn btn-primary dashboard">
                    Dashboard 
                </div>
                <Game/>
            </div>
        );
    }
}
export default Dashboard;