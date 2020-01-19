import React from 'react';
import './Game.css';

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

        fetch('http://localhost:8000/api/games', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((Response) => Response.json())
        .then((result) => {
            
        });
    }

    renderGames() {
        let games = this.state.games.map((game, key) => {
            return (
                <div className="col-sm col-md col-lg col-xl">
                    <div className="card">
                        <div className="card-header">
                            {game.result}
                        </div>
                        <div className="card-body">
                            <p>Game: {game.name}</p>
                            <p>Enemy: {game.enemy.name}</p>
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
        let token = localStorage.getItem('token');

        fetch('http://localhost:8000/api/games', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((Response) => Response.json())
        .then((result) => {
            if (result.success)
                this.games(result.data);
        });
    }

    render() {
        let games = this.state.games || '';
        
        return games ? this.renderGames() : (
            <span>Loading games...</span>
        );
    }
}

export default Game;