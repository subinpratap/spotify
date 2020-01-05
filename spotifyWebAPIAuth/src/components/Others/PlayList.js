import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlayListDetails } from '../../actions/spotify.action';
import { playSong } from "../../actions/player.action";
import { Link } from "react-router-dom";

class PlayList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'totalSongs': [],
            'songsInView': []
        }
    }

    componentDidMount() {
        this.props.fetchPlayListDetails(this.props.match.params.id);
    }

    componentWillReceiveProps(newProps) {
        //console.log("COMPONENT WILL RECV PROPS");
        if (newProps.playlist_detail) {
            this.setState({
                'totalSongs': newProps.playlist_detail.tracks.items,
                'songsInView': newProps.playlist_detail.tracks.items.slice(0,10),
                'showLoadMore': true
            });
        }
    }

    loadMoreSongs() {
        let currentSongListLength = this.state.songsInView.length;
        let increment = 0;
        if(currentSongListLength < this.state.totalSongs.length) {
            if(currentSongListLength + 10 >= this.state.totalSongs.length) {
                increment = this.state.totalSongs.length
            }
            this.setState({
                'songsInView': this.state.totalSongs.slice(0, (increment > 0) ? increment : currentSongListLength + 10),
                'showLoadMore': (increment > 0) ? false: true
            });
            //console.log(this.state);
        }
    }

    playPlaylist() {
        window.playlistSongs = this.state.totalSongs;
        console.log(window.playlistSongs);
        this.props.playSong(this.state.totalSongs[0].track.uri);
    }

    renderArtistInfo() {
        const { playlist_detail } = this.props;

        if (playlist_detail) {
            return (
                <div className="artist-intro-container">
                    <div className="image-wrapper">
                        <img
                            className="artist-banner-image"
                            src={playlist_detail.images[0].url}
                            alt="Artist Image"
                        />
                    </div>
                    <div className="artist-details">
                        <p className="name">{playlist_detail.name}</p>
                        <p className="type">By Spotify</p>
                        <p className="followers">{playlist_detail.tracks.items.length + " Songs"}</p>
                    </div>
                    <button className="purple-gradient playPlaylist" onClick={() => { this.playPlaylist() } }>Play</button>
                </div>
            );
        } else {
            return <div>Currently Unavailable</div>
        }
    }

    renderArtistTopTracks() {
        ////console.log(this.props);
        //const { items } = this.props.playlist_detail.tracks;
        //console.log("RENDER SONGS FN");
        if (this.state.songsInView) {
            return this.state.songsInView.map(tracks => {
                return (
                    <div className="item" key={tracks.track.id}>
                        <i className="fas fa-music"></i>
                        <img className="ui avatar image" src={tracks.track.album.images[0].url} />
                        <div className="content songTitle">
                            <a className="header">{tracks.track.name}</a>
                            {tracks.track.explicit && <div className="explicit"><span>Explicit</span></div>}
                        </div>
                        <div className="right floated content">
                            <span> {this.millisToMinutesAndSeconds(tracks.track.duration_ms)}</span>
                        </div>
                    </div>
                );
            })
        } else {
            return <div>Currently Unavailable</div>
        }
    }

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    render() {
        //console.log("RENDER METHOD");
        return (
            <section className="PlayList-section">
                <div className="playListComponent">
                    {
                        this.renderArtistInfo()
                    }
                    <div className="playListComponentContent">
                        <div className="artist-topTracks-container ui very relaxed list">
                            {
                                this.props.playlist_detail && this.renderArtistTopTracks()
                            }
                        </div>
                    </div>
                    {this.state.showLoadMore && 
                        <div className="btnContainer">
                            <button className="btn btn-light-blue" onClick={() => { this.loadMoreSongs() }} >Load more</button>
                        </div>
                    }
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    //console.log(state);
    const { playlist_detail } = state.spotify;
    console.log(playlist_detail);
    return { playlist_detail };
}

export default connect(
    mapStateToProps,
    { fetchPlayListDetails, playSong }
)(PlayList);