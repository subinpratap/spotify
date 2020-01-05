import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFeaturedPlaylists } from '../../actions/spotify.action';
import { Link } from "react-router-dom";
import history from '../../history';

class FeaturedPlaylists extends Component {

    gradients = [
        "purple-gradient",
        "blue-gradient",
        "aqua-gradient",
        "peach-gradient",
        "near-moon-gradient",
        "morpheus-den-gradient",
        "sunny-morning-gradient",
        "young-passion-gradient",
        "rainy-ashville-gradient",
        "amy-crisp-gradient"
    ];

    getRandomGradients = i => this.gradients[Math.floor((Math.random() * this.gradients.length))];

    componentDidMount() {
        this.props.fetchFeaturedPlaylists();
    }

    renderFeaturedPlaylists = () => {
        const { featured_playlist } = this.props;
        ////console.log(featured_playlist);
        if (featured_playlist && featured_playlist.length) {
            return featured_playlist.slice(0,10).map((item, i) => {
                return (

                    <div className="card testimonial-card" onClick={() => { history.push(`/playlist/${item.id}`) }} key={item.id}>

                        <div className={'card-up ' + this.getRandomGradients(i) }></div>

                        <div className="avatar mx-auto white">
                            <img src={item.images[0].url} className="rounded-circle" alt="Mood Art" />
                        </div>

                        <div className="card-body">
                            <hr />
                            <i className="fas fa-quote-left"></i> 
                            <p 
                            dangerouslySetInnerHTML={{ __html: item.description }}>
                                
                            </p>
                        </div>

                    </div>
                )
            })
        } else {
            return <p>Loading......</p>
        }
    }

    render() {
        //console.log(this.props);
        return (

            <section className="FeaturedPlaylists-section">
                <div className="cardsContainer">
                    <p className="section-title">Featured Playlists</p>
                    {
                        this.props.featured_playlist && this.renderFeaturedPlaylists()
                    }
                </div>

            </section>
        );
    }

}

const mapStateToProps = state => {
    const { featured_playlist } = state.spotify;
    return { featured_playlist };
}

export default connect(
    mapStateToProps,
    { fetchFeaturedPlaylists }
)(FeaturedPlaylists);