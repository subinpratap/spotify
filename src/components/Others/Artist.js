import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchArtist, fetchArtistAlbums, fetchArtistTopTracks, fetchArtistAppearsON, followArtists, checkIfFollowingArtist, removefollowArtists } from "../../actions/spotify.action";
import history from '../../history';
import { playSong } from '../../actions/player.action';
import Card from '../Elements/Card';

class Artist extends Component {

    constructor(props) {
        super(props);
        this.checkDuplicateAlbum = '';

        this.state = {
            'following': false,
            'prevProps': this.props
        }
    }

    componentDidMount() {
        console.log(this.props)
        window.scrollTo(0, 0);
        //console.log("COMPONENT DID MOUNT")
        this.props.fetchArtist(this.props.match.params.id);
        this.props.fetchArtistTopTracks(this.props.match.params.id);
        this.props.fetchArtistAlbums(this.props.match.params.id);
        this.props.fetchArtistAppearsON(this.props.match.params.id);
        this.props.checkIfFollowingArtist(this.props.match.params.id);
    }
    
    componentWillReceiveProps(newProp) {
        if (this.props.match.params.id !== newProp.match.params.id) {
            this.props.fetchArtist(newProp.match.params.id);
            this.props.fetchArtistTopTracks(newProp.match.params.id);
            this.props.fetchArtistAlbums(newProp.match.params.id);
            this.props.fetchArtistAppearsON(newProp.match.params.id);
            this.props.checkIfFollowingArtist(newProp.match.params.id);
        }

        console.log("WILL RECV PROPS", newProp.spotify.following && newProp.spotify.following[0]);

        const data = (newProp.spotify.following && newProp.spotify.following[0])? true: false;

        if (this.state.following != data) {
            this.setState({
                'following': data
            });
        }
    }

    /* shouldComponentUpdate() {
        //console.log("UPDATE");
    } */
    /* static getDerivedStateFromProps(newProp, prevState) {
        
        console.log(newProp);
        console.log(prevState.prevProps);
        
        if (prevState.prevProps.match.params.id !== newProp.match.params.id) {
            console.log('true');
            prevState.prevProps.fetchArtist(newProp.match.params.id);
            prevState.prevProps.fetchArtistTopTracks(newProp.match.params.id);
            prevState.prevProps.fetchArtistAlbums(newProp.match.params.id);
            prevState.prevProps.fetchArtistAppearsON(newProp.match.params.id);
            prevState.prevProps.checkIfFollowingArtist(newProp.match.params.id);
        }

        console.log("WILL RECV PROPS", newProp.spotify.following && newProp.spotify.following[0]);

        if (newProp.spotify.following && newProp.spotify.following[0]) {
            const data = newProp.spotify.following[0]
            return { 'prevProps': newProp, 'following': true }
        } else {
            return { 'prevProps': newProp, 'following': false };

        }
    } */

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

    renderArtistInfo() {
        const { artist_info } = this.props.spotify;

        if (artist_info) {
            return (
                <div className="artist-intro-container">
                    <div className="image-wrapper">
                        <img
                            className="artist-banner-image"
                            src={artist_info.images[0].url}
                            alt="Artist Image"
                        />
                    </div>
                    <div className="artist-details">
                        <p className="name">{artist_info.name}</p>
                        <p className="type">Artist</p>
                        <p className="followers">{artist_info.followers.total.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + " "} Followers </p>
                        <p className="genre">Genres: {this.renderGenres(artist_info.genres)}</p>
                        { this.state.following }
                    </div>
                    { !this.state.following && <button className="followBtn" onClick={() => { this.props.followArtists(artist_info.id) } }>Follow</button> }
                    { this.state.following && <button className="followBtn" onClick={() => { this.props.removefollowArtists(artist_info.id) } }>Following</button> }
                </div>
            );
        } else {
            return <div>Currently Unavailable</div>
        }
    }

    renderArtistTopTracks() {
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

    renderArtistAlbums = () => {
        const { artist_albums } = this.props.spotify;
        //console.log(artist_albums);
        if (artist_albums && artist_albums.length > 0) {
            
            return artist_albums.map((item) => {
                if (item.name !== this.checkDuplicateAlbum) {
                    
                    this.checkDuplicateAlbum = item.name;

                    return (
                        <Card
                            type="album"
                            key={item.id}
                            item={item}/>
                       
                    );
                }
            })
        } else {
            return <div>Currently Unavailable</div>
        }
    }

    renderArtistAppearsOn = () => {
        const { artist_appearson } = this.props.spotify;

        if (artist_appearson && artist_appearson.length > 0) {
            return artist_appearson.map((item, i) => {
                
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
                                <a href="#!">
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
                {this.renderArtistInfo()}
                <div className="artistComponentContent">
                    <div className="artist-topTracks-container ui very relaxed list">
                        <p className="section-title">Top Tracks</p>
                        {this.renderArtistTopTracks()}
                    </div>
                    
                    <div className="ui divider"></div>
                    
                    <div className="artist-albums">
                        <p className="section-title">Albums</p>
                        {this.renderArtistAlbums()}
                    </div>

                    <div className="ui divider"></div>

                    <div className="appears-on">
                        <p className="section-title">Appears On</p>
                        {this.renderArtistAppearsOn()}
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
    { fetchArtist, fetchArtistAlbums, fetchArtistTopTracks, fetchArtistAppearsON, playSong, followArtists, checkIfFollowingArtist, removefollowArtists }
)(Artist);