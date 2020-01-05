import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth.action';
import { searchArtist, searchSong } from '../actions/spotifySearch.action'
import history from '../history';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'searchTerm': '',
            'showSearchResults': false
        }

        //this.showSearchResults = false;
    }

    onChangeSearchTerm = (e) => {
        this.setState({
            'searchTerm': e.target.value
        }, () => { this.fetchResults() })
    }

    fetchResults = () => {
        if (this.state.searchTerm.length > 0) {
            this.props.searchArtist(this.state.searchTerm);
            this.props.searchSong(this.state.searchTerm);
            this.setState({
                'showSearchResults': true
            })
        } else {
            this.showSearchResults = false;
            this.setState({
                'showSearchResults': false
            })
        }
    }

    openArtistDetails = (artistId) => {
        this.showSearchResults = false;
        this.setState({
            'searchTerm': '',
            'showSearchResults': false
        })
        history.push(`/artist/${artistId}`);
    }

    openSongsDetails = (songId) => {
        this.showSearchResults = false;
        this.setState({
            'searchTerm': '',
            'showSearchResults': false
        })
        history.push(`/song/${songId}`);
    }

    renderArtistSearchResults = () => {
        const { search_artist } = this.props;
        if(typeof search_artist !== 'undefined') {
           // this.showSearchResults = true;
        }
        if (search_artist && search_artist.length > 0) {
            return search_artist.map((art, i) => {
                if (art && art.images && art.images[0] && art.images[0].url) {
                    return (
                        <div onClick={() => { this.openArtistDetails(art.id) } } className="item" key={art.id}>
                            <img className="ui avatar image" src={art.images[0].url} />
                            <div className="content">
                                <div className="header">{art.name}</div>
                            </div>
                        </div>
                    );
                }
            })
        } else {
            return <li>No results found</li>
        }
    }

    renderSongSearchResults = () => {
        const { search_song } = this.props;
        
        if (typeof search_song !== 'undefined') {
           // this.showSearchResults = true;
        }
        if (search_song && search_song.length > 0) {
            return search_song.map((art, i) => {
                ////console.log(art);
                if (art && art.album.images && art.album.images[0] && art.album.images[0].url) {
                    return (
                        <div onClick={() => { this.openSongsDetails(art.id) }} className="item" key={art.id}>
                            <img className="ui avatar image" src={art.album.images[0].url} />
                            <div className="content">
                                <div className="header">{art.name}</div>
                            </div>
                        </div>
                    );
                }
            })
        } else {
            return <li>No results</li>
        }
    }

    render() {

        const { loggedIn, user } = this.props.auth;
        ////console.log(loggedIn, user);

        return (
            <section className="headerComponent">
                <nav className="mb-1 navbar navbar-expand-lg navbar-dark secondary-color lighten-1">
                    <Link className="navbar-brand" to="/home">gSpotify</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
                        aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/home" className="nav-link">Home

                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">My Music</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Playlists</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto nav-flex-icons">
                            <form className="form-inline my-1 searchBar">
                                <div className="md-form form-sm my-0">
                                    <input className="form-control form-control-sm mr-sm-2 mb-0" type="text" placeholder="Search"
                                        aria-label="Search" onChange={this.onChangeSearchTerm} />
                                </div>
                                <div className={'searchResults ' + (this.state.showSearchResults? 'showResults': '')}>
                                    <div className="artists ui middle aligned animated list">
                                        <h4 className="ui horizontal divider header">
                                            Artists
                                        </h4>
                                        { this.renderArtistSearchResults() }
                                        
                                    </div>
                                    <div className="songs ui middle aligned animated list">
                                        <h4 className="ui horizontal divider header">
                                            Songs
                                        </h4>
                                        {this.renderSongSearchResults()}
                                    </div>
                                </div>
                            </form>
                            <li className="nav-item">
                                <a className="nav-link waves-effect waves-light notifications">1
                                    <i className="fas fa-envelope"></i>
                                </a>
                            </li>
                            <li>
                                {
                                    loggedIn &&
                                    <span className="item userName">
                                        {user.charAt(0).toUpperCase() + user.slice(1)}
                                    </span>
                                }
                            </li>
                            <li className="nav-item avatar dropdown">

                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" className="rounded-circle z-depth-0"
                                        alt="avatar image" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
                                    aria-labelledby="navbarDropdownMenuLink-55">
                                    {
                                        loggedIn &&
                                        <a className="dropdown-item">My Profile</a>
                                    }
                                    {
                                        loggedIn &&
                                        <a className="dropdown-item">Account Settings</a>
                                    }
                                    {
                                        !loggedIn &&
                                        <a onClick={() => { history.push('/register') }} className="dropdown-item">
                                            <span>Register</span>
                                        </a>
                                    }

                                    {
                                        loggedIn &&
                                        <a onClick={() => { this.props.logout() }} className="dropdown-item">
                                            <span>Logout</span>
                                        </a>
                                    }
                                    {
                                        !loggedIn &&
                                        <a onClick={() => { history.push('/login') }} className="dropdown-item">
                                            <span>Login</span>
                                        </a>
                                    }
                                </div>

                            </li>
                        </ul>
                    </div>
                </nav>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    const { search_artist, search_song } = state.spotifySearch;
    const { auth } = state;
    return { auth, search_artist, search_song };
}

export default connect(
    mapStateToProps,
    { logout, searchArtist, searchSong }
)(Header);