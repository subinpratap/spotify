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
            progress_ms: -1,
            paused: false,
            nextTracks: false,
            prevTracks: false,
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
            //console.log((this.state.item.duration_ms/1000), this.state.progress_ms);
            if((this.state.item.duration_ms/1000) > this.state.progress_ms) {
                this.setState(prevState => ({
                    width: {
                        width: (((prevState.progress_ms + 1) / (this.state.item.duration_ms / 1000)) * 100).toString() + '%'
                    },
                    progress_ms: prevState.progress_ms + 1
                }), ()=>{
                        if (this.state.progress_ms >= (this.state.item.duration_ms / 1000)) {
                            if(this.state.nextTracks) {
                                this.playNextTrack();
                            }
                        }
                });
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
                    progress_ms: -1,
                    //nextTracks: now_playing.track_window.next_tracks,
                    //prevTracks: now_playing.track_window.previous_tracks,
                    is_playing: true
                });
                console.log('SETTING SONG INFO', this.state);
                /* if (now_playing.local_playlist && now_playing.local_playlist.length > 0 ) {
                    
                    if (this.state.prevTracks && this.state.prevTracks.length == 0 && this.state.nextTracks && this.state.nextTracks.length == 0) {
                        
                        this.setState({
                            allTracks: now_playing.local_playlist,
                            nextTracks: ['abc'],
                            songIndex: 0
                        });
                    }
                } */
                console.log(this.state, 'HEREEEEEEEEEEEEEEEEEEEEE');
                this.startTimer();
            }
        } else {
            console.log(this.state);
            const { local_playlist } = newProps.nowPlaying;
            
            if (local_playlist && local_playlist.length > 0) {

                if (this.state.prevTracks === false && this.state.nextTracks === false) {
                    console.log("INSIDE");
                    const data = {
                        ...this.state,
                        allTracks: local_playlist,
                        nextTracks: true,
                        songIndex: 0
                    }

                    this.setState({
                        allTracks: local_playlist,
                        nextTracks: true,
                        songIndex: 0
                    }, () => {
                            console.log(this.state);
                            if (this.state.allTracks && this.state.allTracks.length > 0) {
                                this.props.playSong(this.state.allTracks[0].track.uri);
                            }
                    });
                }
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
            console.log("IDDDDDD", id);

            this.props.playSong(this.state.allTracks[id].track.uri);
            this.setState(prevState => ({
                songIndex: id
            }));


            if (id > 0) {
                this.setState({
                    prevTracks: true
                });
            } else {
                this.setState({
                    prevTracks: false
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
                prevTracks: true
            }));

            if (this.state.allTracks.length == id) {
                this.setState({
                    nextTracks: false
                });
            }
        }
        console.log("NEXT TRACKSSSS", this.state.prevTracks)

        /* this.setState(prevState => ({
            songIndex: prevState.songIndex++,
            prevTracks: ['abc']
        }), this.playNextTrackCallback()); */
    }

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
                        <i className={'fas fa-step-backward fa-2x ' + (this.state.prevTracks ? '' : 'disableControls')} onClick={() => { this.playPrevTrack() }}></i>
                        {
                            this.state.paused && <i className="far fa-play-circle fa-2x" onClick={() => { this.playCurrentPlaying()}}></i>
                        }
                        {
                            !this.state.paused && <i className="far fa-pause-circle fa-2x" onClick={() => { this.pauseCurrentPlaying()}}></i>
                        }
                        <i className={'fas fa-step-forward fa-2x ' + (this.state.nextTracks ? '' : 'disableControls')} onClick={() => { this.playNextTrack() }}></i>
                    </div>
                    <div className="progress-barCustom">
                        <span className="startTime">{
                            (this.secondsToMinutesAndSeconds(parseInt(this.state.progress_ms)) < this.millisToMinutesAndSeconds(this.state.item.duration_ms)) ? this.secondsToMinutesAndSeconds(parseInt(this.state.progress_ms)) : this.millisToMinutesAndSeconds(this.state.item.duration_ms)
                        }</span>
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
    console.log(state);
    return state;
}

export default connect(
    mapStateToProps,
    { playSong, getCurrentPlaying }
)(Player);