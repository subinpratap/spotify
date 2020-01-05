import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-rangeslider';
import { playSong, getCurrentPlaying } from "../../actions/player.action";

class Player extends Component {

    constructor() {
        super();

        this.state = {
            item: {
                image: '',
                name: '',
                artists: '',
                duration_ms: 0,
                id: 0
            },
            is_playing: false,
            progress_ms: 0,
            paused: false,
            nextTracks: [],
            prevTracks: [],
            allTracks: [],
            width: {
                width: '0%'
            },
            volume: 50,
            songIndex: 0
        };

        this.timer=0;
    }

    componentDidMount() {
       
    }

    startTimer() {
        this.timer = setInterval(() => {
            if(this.state.item.duration_ms > this.state.progress_ms) {
                this.setState(prevState => ({
                    width: {
                        width: (((prevState.progress_ms + 1) / (this.state.item.duration_ms / 1000)) * 100).toString() + '%'
                    },
                    progress_ms: prevState.progress_ms + 1
                }));
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.nowPlaying.playing ) {
            console.log("OLD ID: ", this.state.item.id);
            console.log("NEW ID: ", newProps.nowPlaying.id);
            console.log(newProps);
            if ((this.state.item.id !== newProps.nowPlaying.id)) {
                setTimeout(() => {
                    this.props.getCurrentPlaying();
                }, 1000);
            }

            const { now_playing } = newProps.nowPlaying;

            if (now_playing && (this.state.item.id !== now_playing.track_window.current_track.id)) {
                clearInterval(this.timer);
                this.setState({
                    item: {
                        image: now_playing.track_window.current_track.album.images[0].url,
                        name: now_playing.track_window.current_track.name,
                        artists: now_playing.track_window.current_track.artists[0].name,
                        duration_ms: now_playing.track_window.current_track.duration_ms,
                        id: now_playing.track_window.current_track.id
                    },
                    paused: now_playing.paused, 
                    width: {
                        width: '0%'
                    },
                    progress_ms: 0,
                    //nextTracks: now_playing.track_window.next_tracks,
                    //prevTracks: now_playing.track_window.previous_tracks,
                    is_playing: true
                });
                console.log('SETTING SONG INFO', this.state);
                if (window.playlistSongs && window.playlistSongs.length > 0 ) {
                    
                    if (this.state.prevTracks && this.state.prevTracks.length == 0 && this.state.nextTracks && this.state.nextTracks.length == 0) {
                        
                        this.setState({
                            allTracks: window.playlistSongs,
                            nextTracks: ['abc'],
                            songIndex: 0
                        });
                    }
                }
                console.log(this.state, 'HEREEEEEEEEEEEEEEEEEEEEE');
                this.startTimer();
            }
        }
    }

    handleChange = value => {
        this.setState({
            volume: value
        })
    };

    handleChangeComplete = () => {
        window.player.setVolume(this.state.volume/100).then(() => {
            
        });
    };

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    pauseCurrentPlaying() {
        window.player.pause().then(() => {
            this.stopTimer();
            this.setState({
                paused: true
            })
        });
    }

    playPrevTrack() {

        if (this.state.songIndex > 0) {
            const id = this.state.songIndex - 1;
            console.log("ID", id);

            this.props.playSong(this.state.allTracks[id].track.uri);
            this.setState(prevState => ({
                songIndex: id
            }));


            if (id > 0) {
                this.setState({
                    prevTracks: ['abc']
                });
            } else {
                this.setState({
                    prevTracks: []
                });
            }
        }
    }

    playNextTrack() {
        if(this.state.songIndex !== this.state.allTracks.length-1) {
            const id = this.state.songIndex + 1;
            console.log("ID", id);

            this.props.playSong(this.state.allTracks[id].track.uri);
            this.setState(prevState => ({
                songIndex: id,
                prevTracks: ['abc']
            }));

            if (this.state.allTracks.length == id) {
                this.setState({
                    nextTracks: []
                });
            }
        }
        console.log("NEXT TRACKSSSS", this.state.prevTracks)

        /* this.setState(prevState => ({
            songIndex: prevState.songIndex++,
            prevTracks: ['abc']
        }), this.playNextTrackCallback()); */
    }

    /* playNextTrackCallback() {    
        if (this.state.allTracks.length == this.state.songIndex + 1) {
            this.setState({
                nextTracks: []
            });
        }
        console.log("PREVTARCSSS", this.state);
        console.log("PREVTARCSSS", this.state.songIndex);
        console.log("PREVTARCSSS", this.state.allTracks[this.state.songIndex].track.uri);
        this.props.playSong(this.state.allTracks[this.state.songIndex].track.uri);
    } */

    playCurrentPlaying() {
        window.player.resume().then(() => {
            this.startTimer();
            this.setState({
                paused: false
            })
        });
    }

    secondsToMinutesAndSeconds(time) {
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;

        return this.str_pad_left(minutes, '0', 2) + ':' + this.str_pad_left(seconds, '0', 2);
    }

    str_pad_left(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }    

    renderPlayer() {
        const data = this.state;
        const { volume } = this.state;

        return (
            <div>
                <img className="image" src={this.state.item.image}/>
                <div className="info">
                    <span className="songName">
                        {this.state.item.name}
                    </span>
                    <span className="artist">
                        {this.state.item.artists}
                    </span>
                    <i className="far fa-heart"></i>
                </div>
                <div className="player">
                    <div className="controls">
                        <i className={'fas fa-step-backward fa-2x ' + (this.state.prevTracks.length > 0 ? '' : 'disableControls')} onClick={() => { this.playPrevTrack() }}></i>
                        {
                            this.state.paused && <i className="far fa-play-circle fa-2x" onClick={() => { this.playCurrentPlaying()}}></i>
                        }
                        {
                            !this.state.paused && <i className="far fa-pause-circle fa-2x" onClick={() => { this.pauseCurrentPlaying()}}></i>
                        }
                        <i className={'fas fa-step-forward fa-2x ' + (this.state.nextTracks.length > 0 ? '' : 'disableControls')} onClick={() => { this.playNextTrack() }}></i>
                    </div>
                    <div className="progress-barCustom">
                        <span className="startTime">{this.secondsToMinutesAndSeconds(parseInt(this.state.progress_ms)) }</span>
                        <div className="progress md-progress">
                            <div className="progress-bar bg-success" role="progressbar" style={this.state.width} ></div>
                        </div>
                        <span className="endTime">{this.millisToMinutesAndSeconds(this.state.item.duration_ms)}</span>
                    </div>
                </div>
                <div className="volume">
                    <i className="fas fa-volume-up"></i>
                    <div className='slider'>
                        <Slider
                            min={0}
                            max={100}
                            value={volume}
                            onChangeStart={this.handleChangeStart}
                            onChange={this.handleChange}
                            onChangeComplete={this.handleChangeComplete}
                        />
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {
                    this.state.is_playing &&
                    <div className="PlayerComponent">
                        { this.renderPlayer() }
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state);
    return state;
}

export default connect(
    mapStateToProps,
    { playSong, getCurrentPlaying }
)(Player);