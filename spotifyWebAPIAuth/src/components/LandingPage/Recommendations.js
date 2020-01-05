import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecommendations, addSongToUserPlaylists } from '../../actions/spotify.action';
import { playSong } from '../../actions/player.action';
import { Link } from "react-router-dom";
import PlaylistModal from '../PlaylistModal';

class Recommendations extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalData: {
        'showModal': false,
        'content': null,
        'payload': null
      }
    };
  }

  componentDidMount() {
    this.props.fetchRecommendations();
  }

  checkPlaylistAndaddToFavouriteSongs(songId) {
    this.checkPlaylist(songId);
  }

  async createPlaylist() {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + window.accessToken
      }
    }

    const body = {
      "name": "New Playlist testing",
      "description": "New playlist description",
      "public": 'false'
    };

    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists`,
        {
          method: 'post',
          body: JSON.stringify(body),
          headers: options.headers
        });
      const json = await response.json();
      console.log(json);

    } catch (error) {
      console.log(error);
    }
  }

  async checkPlaylist(songId) {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + window.accessToken
      }
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/playlists`, options);
      const json = await response.json();
      if (json.items.length > 0) {
        this.showPlaylistModal(json.items);
      } else {
        this.createPlaylist();
      }

    } catch (error) {
      console.log(error);
      return {};
    }
  }

  showPlaylistModal(playlists, songId) {
    const data = {
      'showModal': true,
      'content': playlists,
      'payload': songId
    }
    this.setState({
      modalData: data
    });
  }

  hidePlaylistModal() {
    const data = {
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
          <div className="card card-cascade wider" key={item.id}>
            <div className="view view-cascade overlay" onClick={(e) => { e.preventDefault(); this.props.playSong(`spotify:track:${item.id}`) }}>
              <img className="card-img-top" src={item.album.images[1].url} alt="Album Art" />
              <a href="#!">
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>

            <div className="card-body card-body-cascade text-center">
              <h4 className={"card-title" + (item.name.length > 20 ? " text-truncate-custom" : "")} >
                <strong>{item.name}</strong>
              </h4>
              <Link to={`/artist/${item.artists[0].id}`}>
                <h5 className={"blue-text pb-2" + (item.artists[0].name.length > 20 ? " text-truncate-custom" : "")} >
                  <strong>{item.artists[0].name}</strong>
                </h5>
              </Link>
              <a className="like" onClick={() => { this.checkPlaylistAndaddToFavouriteSongs(item.id) }}><i className="fas fa-heart"></i></a>
              {/* <i className="far fa-heart"></i> */}
            </div>
          </div>
        );
      });
    } else {
      return <p>Loading......</p>;
    }
  };

  renderModalActions() {
    return (
      <React.Fragment>
        <button onClick={() => { this.props.deleteStream(this.props.match.params.id) }} className="ui negative button">Add</button>
        <button className="ui button" onClick={() => { this.hidePlaylistModal() }}>Cancel</button>
      </React.Fragment>
    );
  }

  renderModalContentt() {
    console.log(this.state.modalData.content);
    return this.state.modalData.content.map((playlist, id) => {
      return (
        <div className="item" key={playlist.id}>
          <div className="playlistName"><span>{playlist.name.match(/\b(\w)/g).join('')}</span></div>
          <div className="content">
            <div className="header">{playlist.name}</div>
          </div>
        </div>
      );
    });
  }

  renderModalContent() {
    return (
      <div className="ui middle aligned selection list">
        {this.renderModalContentt()}
      </div>
    );
  }

  renderModal() {
    return (
      <PlaylistModal
        title="Your playlists"
        content={this.renderModalContent()}
        actions={this.renderModalActions()}
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

const mapStateToProps = state => {
  const { recommendation } = state.spotify;
  return { recommendation };
}

export default connect(
  mapStateToProps,
  { fetchRecommendations, playSong, addSongToUserPlaylists }
)(Recommendations);