import React, { Component } from 'react';
import { Link } from "react-router-dom";
import history from '../../history';

class Card extends Component {    

    render() {
        const item = this.props.item;
        console.log(this.props);
        return (
            <div className="card card-cascade wider" key={item.id}>
                <div className="view view-cascade overlay" onClick={(e) => { 
                        e.preventDefault(); 
                        if (this.props.type == 'song') {
                            this.props.playSong(`spotify:track:${item.id}`)
                        } else {
                            history.push(`/album/${item.id}`)
                        }
                    }}>
                    {this.props.type == 'song' && <img className="card-img-top" src={item.album.images[1].url} alt="Album Art" /> }
                    {this.props.type == 'album' && <img className="card-img-top" src={item.images[1].url} alt="Album Art" /> }
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
                    {
                        this.props.type == 'song' && 
                        <a className="like" onClick={() => { this.props.checkPlaylistAndaddToFavouriteSongs(item.id) }}>
                            <i className="fas fa-heart"></i>
                        </a>
                    }
                </div>
            </div>
        )
    }
}

export default Card;
