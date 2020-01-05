import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class PlaylistModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalData: {
                'content': null,
                'showContent': false,
                'showCreateNew': false,
                'playlistName': ''
            },
            playlistId: null
        };
    }

    handleChange = (e) => {
        const data = {
            ...this.state.modalData,
            'playlistName': e.target.value
        }
        this.setState({
            modalData: data
        });
    }

    componentDidMount() {
        this.checkPlaylist();
    }

    componentWillReceiveProps(newProps) {
        //console.log(newProps)
    }

    async checkPlaylist() {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + window.accessToken
            }
        }

        try {
            const response = await fetch(`https://api.spotify.com/v1/me/playlists`, options);
            const json = await response.json();
            if (json.items && json.items.length > 0) {
                this.showPlaylistModal(json.items);
            } else {
                this.createPlaylist();
            }

        } catch (error) {
            console.log(error);
            return {};
        }
    }

    showPlaylistModal(playlists) {
        const data = {
            'showContent': true,
            'content': playlists
        }
        this.setState({
            modalData: data
        });
    }

    addToPlaylist() {
        this.props.cancel();
        const payload = { "uris": [`spotify:track:${this.props.payload}`] }
        
        this.props.add(this.state.playlistId, payload);
    }

    setPlaylist(playlistId) {
        this.setState({
            ...this.state,
            'playlistId': playlistId
        });
    }

    renderModalContentt() {
        console.log(this.state.modalData.content);
        
        if ((this.state.modalData.content.length > 0)) {
            return this.state.modalData.content.map((playlist, id) => {
                return (
                    <div className="item playlistItem" key={playlist.id} onClick={() => { this.setPlaylist(playlist.id) }}>

                        <div className="ui radio checkbox">
                            <input type="radio" name="radio" />
                            <label></label>
                        </div>
                        <div className="playlistName"><span>{playlist.name.match(/\b(\w)/g).join('')}</span></div>
                        <div className="content">
                            <div className="header">{playlist.name}</div>
                        </div>
                    </div>
                );
            })
        } else {
            return <div><p>Looks like you haven't created any playlist</p></div>
        }
         
    }

    renderModalContent() {
        return (
            <div className="ui middle aligned selection list">
                {
                    this.renderModalContentt()
                }
            </div>
        );
    }

    openCreateNewPlaylist() {
        const data = {
            ...this.state.modalData,
            'showCreateNew': true
        }
        this.setState({
            modalData: data
        });
    }

    closeCreateNewPlaylist() {
        const data = {
            ...this.state.modalData,
            'showCreateNew': false
        }
        this.setState({
            modalData: data
        });

    }

    async createNewPlaylist() {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + window.accessToken
            }
        }

        const body = {
            "name": this.state.modalData.playlistName,
            "description": "New playlist description",
            "public": true
        };

        try {
            const response = await fetch(`https://api.spotify.com/v1/users/11k25by7iyj5ux70czuxll82z/playlists`,
                {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: options.headers
                });
            const json = await response.json();
            
            if(json.id) {
                
                const data = {
                    ...this.state.modalData,
                    'showCreateNew': false,
                    'playlistName': '',
                    'content': [...this.state.modalData.content, json]
                }
                
                this.setState({
                    modalData: data
                });
                console.log(this.state.modalData.content);
            }

        } catch (error) {
            console.log(error);
        }
    }

    renderCreateNew() {
        return (
            <div className="createNewPlaylist">
                <div className="ui input focus">
                    <input type="text" placeholder="Playlist name" name="playlistName" onChange={this.handleChange}/>
                </div>
                <button className="ui inverted green button" onClick={() => this.createNewPlaylist() }>Add</button>
                <i className="far fa-times-circle" onClick={() => { this.closeCreateNewPlaylist() }}></i>
                <div className="ui section divider"></div>
            </div>
        );
    }

    render() {
        return ReactDOM.createPortal(
            <div onClick={this.props.onDismiss} className="ui dimmer modals visible active playListModall">
                <div onClick={(e) => { e.stopPropagation() }} className="ui standard modal visible active">
                    <div className="header">
                        {this.props.title}
                        <i className="fas fa-plus" onClick={() => { this.openCreateNewPlaylist() }}></i>
                    </div>
                    <div className="content">

                        {this.state.modalData.showCreateNew && this.renderCreateNew()}

                        {
                            this.state.modalData.showContent && this.renderModalContent()
                        }
                    </div>
                    <div className="actions">
                        {
                        //this.props.actions
                        }
                        <button onClick={() => { this.addToPlaylist() } } className="ui negative button">Add</button>
                        <button className="ui button" onClick={ this.props.cancel }>Cancel</button>
                    </div>
                </div>
            </div>,
            document.querySelector('#playlistModal')
        );
    }
};

export default PlaylistModal;