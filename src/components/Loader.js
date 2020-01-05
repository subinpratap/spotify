import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import '../css/index.scss';

class Loader extends Component {
    
    renderLoader = () => {
        const { interceptor } = this.props;

        if (interceptor.requestType) {
            return ReactDOM.createPortal(
                <div className="loader"></div>,
                document.querySelector('#loader')
            );
        } else {
            return null;
        }
    }
    
    render() {
        return (
            <div>
                {this.renderLoader()}
            </div>
        );
    }    
};

const mapStateToProps = (state) => {
    const { interceptor } = state;
    ////console.log("LOADING STATUS........", state);
    return { interceptor };
}

export default connect(
    mapStateToProps,
    null
)(Loader);