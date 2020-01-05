import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyMusicAlbums, fetchMyMusicTracks } from "../../actions/spotify.action";
import history from '../../history';
import { playSong } from '../../actions/player.action';

class MyMusic extends Component {

    constructor(props) {
        super(props);
        this.checkDuplicateAlbum = '';
    }

    componentDidMount() {
        //console.log("COMPONENT DID MOUNT")
        this.props.fetchMyMusicTracks(this.props.match.params.id);
        this.props.fetchMyMusicAlbums(this.props.match.params.id);
    }

    componentWillReceiveProps(newProp) {
        //console.log('COMPONENT WILL RECV PROPS', this.props.match.params.id !== newProp.match.params.id);
        //console.log(this.props.match.params.id);
        //console.log(newProp.match.params.id);
        if (this.props.match.params.id !== newProp.match.params.id) {
            //console.log('true');
            this.props.fetchMyMusicTracks(newProp.match.params.id);
            this.props.fetchMyMusicAlbums(newProp.match.params.id);
        }
    }

    renderGenres(genres) {
        if (genres) {
            return genres.map((genre, i) => {
                return (
                    <span key={genre}>{genre}{(i != genres.length - 1) ? ', ' : ''}</span>
                );
            })
        } else {
            return <span>Currently Unavailable</span>
        }
    }

    

    renderMyMusicTracks() {
        const { artist_topTracks } = this.props.spotify;

        if (artist_topTracks && artist_topTracks.length > 0) {
            return artist_topTracks.slice(0, 5).map(tracks => {
                return (
                    <div className="item" key={tracks.id} onClick={(e) => { e.preventDefault(); this.props.playSong(`spotify:track:${tracks.id}`) }}>
                        <i className="fas fa-music"></i>
                        <img className="ui avatar image" src={tracks.album.images[0].url} />
                        <div className="content songTitle">
                            <a className="header">{tracks.name}</a>
                            {tracks.explicit && <div className="explicit"><span>Explicit</span></div>}
                        </div>
                        <div className="right floated content">
                            <span> {this.millisToMinutesAndSeconds(tracks.duration_ms)}</span>
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

    renderMyMusicAlbums = () => {
        const { artist_albums } = this.props.spotify;
        //console.log(artist_albums);
        if (artist_albums && artist_albums.length > 0) {

            return artist_albums.map((item) => {
                if (item.name !== this.checkDuplicateAlbum) {

                    this.checkDuplicateAlbum = item.name;

                    return (
                        <div className="card card-cascade wider" key={item.id}>
                            <div className="view view-cascade overlay" onClick={(e) => { history.push(`/album/${item.id}`) }}>
                                <img
                                    className="card-img-top"
                                    src={item.images[1].url}
                                    alt="Album Art"
                                />
                                <a>
                                    <div className="mask rgba-white-slight"></div>
                                </a>
                            </div>

                            <div className="card-body card-body-cascade text-center">
                                <h4 className={'card-title' + (item.name.length > 20 ? ' text-truncate-custom' : '')}>
                                    <strong>{item.name}</strong>
                                </h4>
                                <Link to={`/artist/${item.artists[0].id}`}>
                                    <h5 className={'blue-text pb-2' + (item.artists[0].name.length > 20 ? ' text-truncate-custom' : '')}>
                                        <strong>{item.artists[0].name}</strong>
                                    </h5>
                                </Link>
                            </div>
                        </div>
                    );
                }
            })
        } else {
            return <div>Currently Unavailable</div>
        }
    }
    render() {
        return (
            <div className="artistComponent">
                <div className="artistComponentContent">
                    <div className="artist-albums">
                        <p className="section-title">Liked Albums</p>
                        {this.renderMyMusicAlbums()}
                    </div>

                    <div className="ui divider"></div>

                    <div className="artist-topTracks-container ui very relaxed list">
                        <p className="section-title">Liked Top Tracks</p>
                        {this.renderMyMusicTracks()}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    //console.log(state)
    return state;
}

export default connect(
    mapStateToProps,
    { fetchMyMusicAlbums, fetchMyMusicTracks, playSong }
)(MyMusic);