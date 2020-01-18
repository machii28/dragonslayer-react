import React from 'react';

class Game extends React.Component {
    constructor() {
        super();

        this.state = {
            games: ''
        }

        this.games = this.games.bind(this);
    }

    games(games) {
        this.setState({
            games: games
        })
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
        return (
            <div>
                {this.state.games.map((game) => {
                    <p>{game.name}</p>
                })}
            </div>
        );
    }
}

export default Game;