import React from 'react';
import './Game.css';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

class Game extends React.Component {
    constructor() {
        super();

        this.state = {
            games: '',
        }

        this.games = this.games.bind(this);
        this.renderGames = this.renderGames.bind(this);
        this.createGame = this.createGame.bind(this);
    }

    games(games) {
        this.setState({
            games: games
        });
    }

    createGame() {
        let token = localStorage.getItem('token');

        fetch('https://dragonslayer-test.herokuapp.com/api/games', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((Response) => Response.json())
        .then((result) => {
            window.location.href = `/dragonslayer-react/games/${result.data.id}`
        });
    }

    renderGames() {
        let games = this.state.games.map((game, key) => {
            return (
                <div style={{ 'margin-top': "10px" }} className="col-sm-3 col-md-3 col-lg-3 col-xl-3" key={game.id}>
                    <div className="card">
                        <div className="card-header">
                            {game.result}
                        </div>
                        <div className="card-body">
                            <p>Game: {game.name}</p>
                            <p>Enemy: {game.enemy.name}</p>
                        </div>
                        <div className="card-footer">

                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="container">
                <button onClick={this.createGame} className="btn btn-success">Start New Game</button>
                <div className="row game-container">
                    {games}
                </div>
            </div>
        );
    }

    componentDidMount() {
        let _this = this;

        window.setTimeout(function() {
            let token = localStorage.getItem('token');

            fetch('https://dragonslayer-test.herokuapp.com/api/games', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then((Response) => Response.json())
            .then((result) => {
                if (result.success) {
                    _this.games(result.data);
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/dragonslayer-react/login'
                }
            });
        }, 1000);
    }

    render() {
        let games = this.state.games || '';
        
        return games ? this.renderGames() : (
            <span>Loading games...</span>
        );
    }
}

export default Game;