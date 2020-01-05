import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from  '../actions/auth.action';
import history from '../history';
import requireAuth from "./requireAuth";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3 loginContainer">
                
                <div className="formWrapper">
                    <p className="loginTitle">Login</p>
                    <form name="ui form" onSubmit={this.handleSubmit}>
                        <div className={'md-form form-lg' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                    
                        <div className={'md-form form-lg' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <div className="loginBtnWrapper">
                                <div className="loginBtnWr"></div>
                                <button className="loginButton">Login</button>
                            </div>
                            <div className="registerBtnWrapper">
                                <Link to="/register" className="registerBtn">Register</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state);
    return state;
}

export default connect(
    null,
    {
        login
    }
)(requireAuth(Login));