﻿import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            tokenContent: '',
            userName: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.baseUrl = document.getElementById('baseGatewayUrl').value;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        this.setState({
            loggedIn: true
        });

        var data = {
            userName: this.state.userName,
            password: this.state.password
        };

        const url = this.baseUrl
            + "/api/Auth/";

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    authenticated: response.authenticated,
                    tokenContent: response.tokenContent
                });
                if (response.authenticated === true) {
                    this.props.onHandleLogin(response.tokenContent);
                }
            }).catch((err) => {
                this.setState({
                    authenticated: false
                });
                alert('ERROR:' + err.message);
            });
        event.preventDefault();
    }

    handleLogout(event) {
        this.setState({
            authenticated: false,
            userName: '',
            password: '',
            tokenContent: ''
        });
        this.props.onHandleLogout();
        event.preventDefault();
    }

    render() {

        if (this.state.authenticated === true) {
            return (
                <div className="col-md-12">
                    <div className="well well-sm">
                        <div className="row">
                            <div className="col-md-2">
                                <button className="btn btn-sm btn-danger" type="button" onClick={this.handleLogout}>Logout</button>
                            </div>
                            <div className="col-md-10">
                                <div className="col-md-3">
                                    <strong>UserName:</strong>
                                </div>
                                <div className="col-md-8">
                                    {this.state.userName}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="col-md-12">
                <div className="well well-sm">
                    <div className="row">
                        <form onSubmit={this.handleSubmit}>
                            <div className="col-md-3">
                                <label className="control-label col-md-5">UserName:</label>
                                <div className="col-md-7">
                                    <input className="form-control" name="userName" value={this.state.userName} onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label col-md-5">Password:</label>
                                <div className="col-md-7">
                                    <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-sm btn-primary" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}