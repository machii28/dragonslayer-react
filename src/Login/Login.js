import React, { Component } from 'react';
import './../App.css';
import { Container, Row, Col, CardGroup, CardBody, InputGroup, Input, Button, Form, Card } from 'reactstrap';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            token: ''
        }

        this.password = this.password.bind(this);
        this.email = this.email.bind(this);
        this.token = this.token.bind(this);
        this.login = this.login.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    email(event) {
        this.setState({
            email: event.target.value
        });
    }

    password(event) {
        this.setState({
            password: event.target.value
        });
    }

    token(token) {
        this.setState({
            token: token
        });
    }
    
    getUser(event) {
        fetch('http://localhost:8000/api/users', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        }).then((Response) => Response.json())
        .then((result) => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.setItem('user', JSON.stringify(result.data));
            localStorage.setItem('token', this.state.token);
        })
    }

    login(event) {
        fetch('http://localhost:8000/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then((Response) => Response.json())
        .then((result) => {
            if (result.success) {
                this.token(result.data.token);
                this.getUser();
                this.props.history.push('/dashboard');
            } else {
                alert('Invalid Credentials')
            }
        });
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <CardGroup>
                                <Card className="p-2">
                                    <CardBody>
                                        <Form>
                                            <div className="row mb-2 pageheading">
                                                <div className="col-sm-12 btn btn-primary">Login</div>
                                            </div>
                                            <InputGroup className="mb-3">
                                                <Input type="text" onChange={this.email} placeholder="Email Address"></Input>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <Input type="password" onChange={this.password} placeholder="Password"></Input>
                                            </InputGroup>
                                            <Button onClick={this.login} color="success" block>Login</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;