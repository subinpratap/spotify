import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNewReleases } from '../actions/spotify.action';
import NewReleases  from "./LandingPage/NewReleases";
import Recommendations  from "./LandingPage/Recommendations";
import FeaturedPlaylists from "./LandingPage/FeaturedPlaylists";
import Categories from "./LandingPage/Categories";

class LandingPage extends Component {

    render() {
        return (
          <div className="landingPage">
            
            <Recommendations />
            <div className="ui horizontal divider sectionDivider">
              <i className="fas fa-music"></i>
            </div>
            <NewReleases /> 
            <div className="ui horizontal divider sectionDivider">
              <i className="fas fa-music"></i>
            </div>
            <FeaturedPlaylists /> 
            <div className="ui horizontal divider sectionDivider">
              <i className="fas fa-music"></i>
            </div>            
            <Categories />         
          </div>
        );
    }

}

const mapStateToProps = state => {
  ////console.log(state);
  return state;
}

export default connect(
  mapStateToProps,
  { fetchNewReleases }  
)(LandingPage);