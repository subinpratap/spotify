
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from "react-redux";

export default ChildComponent => {

    class ComposedComponent extends Component {

        componentDidMount() {
            if (this.props.auth.loggedIn) {
                this.props.history.push('/home')
            }
        }

        componentDidUpdate() {
            if (this.props.auth.loggedIn) {
                this.props.history.push('/home')
            }
        }
     
        render() {
            return <ChildComponent {...this.props}/>
        }
    }

    const mapStateToProps = (state) => {
        //console.log(state);
        return state;
    }

    return connect(mapStateToProps)(ComposedComponent);

};