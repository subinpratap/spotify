import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/auth.action';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user.username, user.password);
        }
    }

    render() {

        const { user, submitted } = this.state;

        return (
            <div className="col-md-6 col-md-offset-3 registerComponent">
                <div className="registerWrapper">
                    <p className="registerTitle">Register</p>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'md-form form-lg' + (submitted && !user.firstName ? ' has-error' : '')}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                            {submitted && !user.firstName &&
                                <div className="help-block">First Name is required</div>
                            }
                        </div>
                        <div className={'md-form form-lg' + (submitted && !user.lastName ? ' has-error' : '')}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                            {submitted && !user.lastName &&
                                <div className="help-block">Last Name is required</div>
                            }
                        </div>
                        <div className={'md-form form-lg' + (submitted && !user.username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                            {submitted && !user.username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'md-form form-lg' + (submitted && !user.password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                            {submitted && !user.password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="md-form form-lg btnn">
                            <div className="registerBtnWrapper">
                                <div className="registerBtnWr"></div>
                                <button className="registerBtn">Register</button>
                            </div>
                            <div className="loginBtnReg">
                                <Link to="/login" className="btn btn-link">Login</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    //console.log(state);
    return state;
}

export default connect(
    mapStateToProps,
    { register }
)(Register);