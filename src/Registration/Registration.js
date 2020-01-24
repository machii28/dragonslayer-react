import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';

class Registration extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: ''
        }

        this.name = this.name.bind(this);
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.register = this.register.bind(this);
    }

    name(event) {
        this.setState({
            name: event.target.value
        });
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

    register(event) {
        fetch('https://dragonslayer-test.herokuapp.com/api/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        }).then((Response) => Response.json())
        .then((result) => {
            if (result.success)
                alert('Welcome');
            else
                this.props.history.push('/dashboard');
        });
    }

    render() {
        return(
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form>
                                        <div className="row mb-2 pageheading">
                                            <div className="col-sm-12 btn btn-primary">Sign Up</div>
                                        </div>
                                        <InputGroup className="mb-3">
                                            <Input type="text" onChange={this.name} placeholder="Full Name"></Input>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" onChange={this.email} placeholder="Email"></Input>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" onChange={this.password} placeholder="Password"></Input>
                                        </InputGroup>
                                        <Button onClick={this.register} color="success" block>Register</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Registration;