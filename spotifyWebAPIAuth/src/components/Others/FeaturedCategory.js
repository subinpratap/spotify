import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategoriesDetails } from '../../actions/spotify.action';
import { Link } from "react-router-dom";
import history from '../../history';

class FeaturedCategory extends Component {

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
        this.props.fetchCategoriesDetails(this.props.match.params.id);
    }

    renderFeaturedCategory = () => {
        const { featured_Categories } = this.props;
        //console.log(featured_Categories);
        if (featured_Categories && featured_Categories.length) {
            return featured_Categories.slice(0, 10).map((item, i) => {
                return (

                    <div className="card testimonial-card" onClick={() => { history.push(`/playlist/${item.id}`) }} key={item.id}>

                        <div className={'card-up ' + this.getRandomGradients(i)}></div>

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

            <section className="FeaturedCategory-section">
                <div className="cardsContainer">
                    <p className="section-title">{this.props.match.params.id.charAt(0).toUpperCase() + this.props.match.params.id.slice(1)}</p>
                    {
                       this.props.featured_Categories && this.renderFeaturedCategory()
                    }
                </div>

            </section>
        );
    }

}

const mapStateToProps = state => {
    const { featured_Categories } = state.spotify;
    //console.log(featured_Categories);
    return { featured_Categories };
}

export default connect(
    mapStateToProps,
    { fetchCategoriesDetails }
)(FeaturedCategory);