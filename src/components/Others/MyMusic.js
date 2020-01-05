import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyPlaylists, fetchFollowingArtists } from "../../actions/spotify.action";
import history from '../../history';
import { playSong } from '../../actions/player.action';

class MyMusic extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //console.log("COMPONENT DID MOUNT")
        window.scrollTo(0, 0);
        this.props.fetchMyPlaylists();
        this.props.fetchFollowingArtists();
    }

    componentWillReceiveProps(newProp) {

    }

    renderMyPlaylists = () => {
        const { my_playlist } = this.props.spotify;

        if (my_playlist && my_playlist.length > 0) {

            return my_playlist.map((item) => {
                return (
                    <div className="card card-cascade wider" key={item.id}>
                        <div className="view view-cascade overlay" onClick={(e) => { history.push(`/playlist/${item.id}`) }}>
                            {(item.images.length > 0) &&
                                <img
                                    className="card-img-top"
                                    src={item.images[0].url}
                                    alt="Album Art"
                                />
                            }
                            <a>
                                <div className="mask rgba-white-slight"></div>
                            </a>
                        </div>

                        <div className="card-body card-body-cascade text-center">
                            <h4 className={'card-title' + (item.name.length > 20 ? ' text-truncate-custom' : '')}>
                                <strong>{item.name}</strong>
                            </h4>
                        </div>
                    </div>
                );
            })
        } else {
            return <div>Currently Unavailable</div>
        }
    }

    renderFollowingArtists() {
        const { following_artists } = this.props.spotify;

        if (following_artists && following_artists.length > 0) {

            return following_artists.map((artist) => {
                return (
                    <div className="image-wrapper" key={artist.id} onClick={() => { history.push(`/artist/${artist.id}`) } }>
                        <div className="circular">
                            <img src={artist.images[0].url} alt='artist image' key={artist.id} />
                        </div>
                        <p className="artistName">{artist.name}</p>
                    </div>
                );
            })
        } else {
            return <div>Currently Unavailable</div>
        }
    }

    render() {
        return (
            <div className="artistComponent myMusicComponent">
                <div className="artistComponentContent">
                    <div className="artist-albums">
                        <p className="section-title">My Playlists</p>
                        {this.renderMyPlaylists()}
                    </div>

                    <div className="ui divider"></div>

                    <div className="following-artist-container">
                        <p className="section-title">Following</p>
                        {this.renderFollowingArtists()}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    console.log(state)
    return state;
}

export default connect(
    mapStateToProps,
    { fetchMyPlaylists, fetchFollowingArtists, playSong }
)(MyMusic);