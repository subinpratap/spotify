import React, { Component } from "react";
import { connect } from "react-redux";
import { alertActions } from "../actions/alert.action";

class Messages extends Component {


  // Can also call this method from render() to show alert messages 
  /* renderMsg() {      
      const { alert } = this.props;
      //console.log(this.props);
      if (alert && alert.message) {
          return (
              <div className={`ui message ${(alert.type === 'alert-success') ? 'positive' : 'negative'}`}>
                  <i className="close icon"> </i>
                  <p>{alert.message}</p>
              </div>
          )
      }
  } */

  render() {
    const { alert } = this.props;
    return (
      <div className="ui container genericMsgContainer">
        { 
          alert.message &&
                <div className={`ui message genericMsg ${(alert.type === 'alert-success') ? 'positive' : (alert.type === 'alert-info') ? 'info':'negative'}`}>
                    <i className="close icon" onClick={() => { this.props.clearAlerts() }}> </i>
                    <div className="header">
                    {`${(alert.type === 'alert-success' || alert.type == 'alert-info') ? 'Success' : 'Failed'}` }
                    </div>
                    <p>{alert.message}</p>
                </div>
        }
        
      </div>
    );
  }
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const mapStateToProps = state => {
  const { alert } = state;
  return { alert };
};

export default connect(
    mapStateToProps, 
    actionCreators
)(Messages);
