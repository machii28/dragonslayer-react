import React from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import dragon from './dragon.png';
import player from './player.png';

class GameData extends React.Component {
    constructor() {
        super();

        this.state = {
            player: '',
            enemy: '',
            game: '',
            actions: [],
        }

        this.player = this.player.bind(this);
        this.enemy = this.enemy.bind(this);
        this.game = this.game.bind(this);
        this.actions = this.actions.bind(this);
        this.fetchGameData = this.fetchGameData.bind(this);
        this.makePlayerMove = this.makePlayerMove.bind(this);
        this.damageEnemy = this.damageEnemy.bind(this);
        this.makeEnemyMove = this.makeEnemyMove.bind(this);
        this.damagePlayer = this.damagePlayer.bind(this);
        this.healPlayer = this.healPlayer.bind(this);
        this.sendAction = this.sendAction.bind(this);
        this.checkResult = this.checkResult.bind(this);
    }

    player(player) {
        this.setState({
            player: player
        });
    }

    enemy(enemy) {
        this.setState({
            enemy: enemy
        });
    }

    game(game) {
        this.setState({
            game: game
        });
    }
    
    actions(action) {
        this.setState(state => {
            state.actions.push(action);
            const actions = state.actions;
            
            return {
                actions
            };
        });
    }

    makePlayerMove(event) {
        let move = event.target.getAttribute('data-move');
        let action = '';
        let amount = 0;

        switch (move) {
            case 'attack':
                amount = Math.floor(Math.random() * (this.state.player.damage)) + 1;
                action = `${this.state.player.name} attacked ${this.state.enemy.name} with ${amount} damage`;
                this.actions(action);
                this.damageEnemy(amount);
                this.makeEnemyMove();
                this.sendAction(action);
                break;
            
            case 'blast':
                amount = Math.floor(Math.random() * (this.state.player.damage * 2)) + 1;
                action = `${this.state.player.name} blasted ${this.state.enemy.name} with ${amount} damage`;
                this.actions(action);
                this.damageEnemy(amount);
                this.makeEnemyMove();
                this.sendAction(action);
                break;

            case 'heal':
                amount = Math.floor(Math.random() * (this.state.player.life / 2)) + 1;
                action = `${this.state.player.name} healed his life for ${amount}`;
                this.actions(action);
                this.healPlayer(amount);
                this.makeEnemyMove();
                this.sendAction(action);
                break;

            case 'give-up':
                this.actions(action);
                this.updateGame('Given Up');
                break; 
        
            default:
                break;
        }
    }

    healPlayer(amount) {
        this.state.player.life = this.state.player.life + amount;
        this.checkResult();
    }

    damageEnemy(damage) {
        this.state.enemy.life = this.state.enemy.life > 0 ? (this.state.enemy.life - damage) : 0;
        this.checkResult();
    }

    makeEnemyMove() {
        let moves = ['attack', 'blast'];
        let move = moves[Math.floor(Math.random() * moves.length)];
        let action = '';
        let amount = 0;

        switch (move) {
            case 'attack':
                amount = Math.floor(Math.random() * (this.state.enemy.damage)) + 1;
                action = `${this.state.enemy.name} attacked ${this.state.player.name} with ${amount} damage`;
                this.actions(action);
                this.damagePlayer(amount);
                break;
            
            case 'blast':
                amount = Math.floor(Math.random() * (this.state.enemy.damage * 2)) + 1;
                action = `${this.state.enemy.name} blasted ${this.state.player.name} with ${amount} damage`;
                this.actions(action);
                this.damagePlayer(amount);
        
            default:
                break;
        }
    }

    damagePlayer(damage) {
        this.state.player.life = this.state.player.life > 0 ? (this.state.player.life - damage) : 0;
        this.checkResult();
    }

    updateGame(result) {
        let token = localStorage.getItem('token');

        fetch(`https://dragonslayer-test.herokuapp.com/api/games/${this.state.game.id}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                result: result,
                _method: 'PUT'
            })
        }).then((Response) => Response.json())
        .then((result) => {
            window.location.href = '/dragonslayer-react/dashboard'
        });
    }

    sendAction(action) {
        let token = localStorage.getItem('token');

        fetch(`https://dragonslayer-test.herokuapp.com/api/actions`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                actions: action,
                game_id: this.state.game.id
            })
        }).then((Response) => Response.json())
        .then((result) => {
        });
    }

    fetchGameData(gameId) {
        let token = localStorage.getItem('token');

        fetch(`https://dragonslayer-test.herokuapp.com/api/games/${gameId}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((Response) => Response.json())
        .then((result) => {
            if (result.success) {
                this.player(result.data.user);
                this.enemy(result.data.enemy);
                this.game(result.data);
            } else {
                this.props.history.push('/dragonslayer-react/dashboard');
            }
        });
    }

    checkResult() {
        if (this.state.player.life === 0 && this.state.enemy.life !== 0) {
            this.updateGame('Lose Game');
        } else if (this.state.player.life !== 0 && this.state.enemy.life === 0) {
            this.updateGame('Win Game');
        }
    }
    
    componentDidMount() {
        const {match: {params}} = this.props;

        this.fetchGameData(params.gameId);
    }

    renderGameData() {
        let state = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm col-md col-lg col-xl">
                        <img src={player} className="img-fluid player"></img>
                        <div className="progress">
                            <div className="progress-bar bg-success" style={{ width:`${this.state.player.life}%` }}></div>
                        </div>
                        <p className="margin-y10">{this.state.player.name} : {this.state.player.life}</p>
                        <div className="margin-auto margin-y10 attack-holder">
                            <Button variant="danger" className="margin-x10" onClick={this.makePlayerMove} data-move="attack">Attack</Button>
                            <Button variant="warning" className="margin-x10" onClick={this.makePlayerMove} data-move="blast">Blast</Button>
                            <Button variant="success" className="margin-x10" onClick={this.makePlayerMove} data-move="heal">Heal</Button>
                            <Button variant="info" className="margin-x10" onClick={this.makePlayerMove} data-move="give-up">Give Up</Button>
                        </div>
                    </div>
                    <div className="col-sm col-md col-lg col-xl">
                        <img src={dragon} className="img-fluid dragon"></img>
                        <div className="progress">
                            <div className="progress-bar bg-danger" style={{ width:`${this.state.enemy.life}%` }}></div>
                        </div>
                        <p className="margin-y10">{this.state.enemy.name} : {this.state.enemy.life}</p>
                        <div className="col-sm col-md col-lg col-xl">
                            <div style={{ height: "400px", overflow: "auto" }}>
                                <ListGroup className="margin-y10">
                                    {this.state.actions.map((action, key) => {
                                        return (<ListGroup.Item key={key}>{action}</ListGroup.Item>);
                                    })}
                                </ListGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let game = this.state.game || '';

        return game ? this.renderGameData() : (
            <span>Loading Game</span>
        );
    }
}

export default GameData;