import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAlbum } from "../../actions/spotify.action";
import { playSong } from '../../actions/player.action';

class Album extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("COMPONENT DID MOUNT", this.props.match.params.id)
        this.props.fetchAlbum(this.props.match.params.id);
    }

    componentWillReceiveProps(newProp) {
        //console.log('COMPONENT WILL RECV PROPS', this.props.match.params.id !== newProp.match.params.id);
        //console.log(this.props.match.params.id);
        //console.log(newProp.match.params.id);
        if (this.props.match.params.id !== newProp.match.params.id) {
            //console.log('true');
            this.props.fetchAlbum(newProp.match.params.id);
        }
    }

    renderArtists(artists) {
        if (artists.length > 0) {
            return artists.map((artist, i) => {
                return (
                    
                        <span key={artist.id}>
                            <Link to={`/artist/${artist.id}`}>
                                {artist.name}{(i != artists.length - 1) ? ', ' : ''}
                            </Link>
                        </span>
                );
            })
        } else {
            return <span>Currently Unavailable</span>
        }
    }

    renderAlbumInfo() {
        const { album } = this.props.spotify;

        if (album) {
            return (
                <div className="artist-intro-container">
                    <div className="image-wrapper">
                        <img
                            className="artist-banner-image"
                            src={album.images[0].url}
                            alt="Album Image"
                        />
                    </div>
                    <div className="artist-details">
                        <p className="name">{album.name}</p>
                        <p className="type">{album.label}</p>
                        <p className="genre">Artists: {
                            this.renderArtists(album.artists)
                        }</p>
                    </div>

                </div>
            );
        } else {
            return <div>Currently Unavailable</div>
        }
    }

    renderAlbumTracks() {
        if (this.props.spotify && this.props.spotify.album && this.props.spotify.album.tracks) {
            const { items } = this.props.spotify.album.tracks;

            if (items && items.length > 0) {
                return items.map(track => {
                    return (
                        <div className="item" key={track.id} onClick={(e) => { e.preventDefault(); this.props.playSong(`spotify:track:${track.id}`) }}>
                            <i className="fas fa-music"></i>
                            <img className="ui avatar image" src={this.props.spotify.album.images[0].url} />
                            <div className="content songTitle">
                                <a className="header">{track.name}</a>
                                {track.explicit && <div className="explicit"><span>Explicit</span></div>}
                            </div>
                            <div className="right floated content">
                                <span> {this.millisToMinutesAndSeconds(track.duration_ms)}</span>
                            </div>
                        </div>
                    );
                })
            } else {
                return <div>Currently Unavailable</div>
            }
        }
    }

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    render() {
        return (
            <div className="artistComponent albumComponent">
                {
                    this.renderAlbumInfo()
                }
                <div className="artistComponentContent">
                    <div className="artist-topTracks-container ui very relaxed list">
                        <p className="section-title">Top Tracks</p>
                        {
                            this.renderAlbumTracks()
                        }
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return state;
}

export default connect(
    mapStateToProps,
    { fetchAlbum, playSong }
)(Album);