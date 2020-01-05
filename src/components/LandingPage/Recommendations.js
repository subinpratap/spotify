import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecommendations, addSongToUserPlaylists } from '../../actions/spotify.action';
import { playSong } from '../../actions/player.action';
import { Link } from "react-router-dom";
import PlaylistModal from '../PlaylistModal';
import Card from '../Elements/Card';

class Recommendations extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalData: {
        'showModal': false,
        'payload': null
      }
    };
  }

  componentWillReceiveProps(newProps){
    console.log(newProps);
  }

  componentDidMount() {
    this.props.fetchRecommendations();
  }

  checkPlaylistAndaddToFavouriteSongs = (songId) => {

    const data = {
      'showModal': true,
      'payload': songId
    }

    this.setState({
      modalData: data
    });
  }

  hidePlaylistModal = () => {
    
    const data = {
      ...this.state.modalData,
      'showModal': false
    }
    
    this.setState({
      modalData: data
    });
  }

  renderRecommendations = () => {
    const { recommendation } = this.props;
    //console.log(recommendation);
    if (recommendation && recommendation.length > 0) {
      return recommendation.map(item => {
        return (
          <Card 
            type = "song"
            key = { item.id }
            item = { item }
            playSong = { this.props.playSong } 
            checkPlaylistAndaddToFavouriteSongs={ this.checkPlaylistAndaddToFavouriteSongs } />
        );
      });
    } else {
      return <p>Loading......</p>;
    }
  };

  addSongToUserPlaylists = (playlistId, payload) => {
    this.props.addSongToUserPlaylists(playlistId, payload);
  }

  renderModal() {
    return (
      <PlaylistModal
        title="Your playlists"
        payload={ this.state.modalData.payload }        
        add={this.addSongToUserPlaylists}
        cancel={this.hidePlaylistModal}
      />
    );
  }

  render() {
    //console.log(this.props);
    return (
      <section className="recommendations-section">
        <div className="cardsContainer">
          <p className="section-title">Recommended</p>
          {this.props.recommendation && this.renderRecommendations()}
        </div>
        {this.state.modalData.showModal && this.renderModal()}
      </section>
    );
  }
}

const mapStateToProps = state   => {
  const { recommendation } = state.spotify;
  return { recommendation };
}

export default connect(
  mapStateToProps,
  { fetchRecommendations, playSong, addSongToUserPlaylists }
)(Recommendations);