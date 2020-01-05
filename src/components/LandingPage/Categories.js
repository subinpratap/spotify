import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions/spotify.action';
import { Link } from "react-router-dom";
import history from '../../history';

class Categories extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    navigateToCategoryDetail(id) {
        history.push(`/featured-playlists/${id}`)
    }

    renderCategories = () => {
        const { categories } = this.props;
        ////console.log(categories);
        if (categories && categories.length) {
            return categories.map(item => {
                return (
                    <div onClick={ () => { this.navigateToCategoryDetail(item.id) }} className="flip-card" key={item.id}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src={item.icons[0].url} alt="Avatar" />
                            </div>
                                <div className="flip-card-back">
                                    <h1>{ item.name }</h1>
                                </div>
                            </div>
                        </div>
                );
            });
        } else {
            return <p>Loading......</p>;
        }
    };

    render() {
        
        return (
            <section className="categories-section">
                <div className="cardsContainer">
                    <p className="section-title">Categories</p>
                    {
                        this.props.categories && this.renderCategories()
                    }
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    const { categories } = state.spotify;
    //(categories);
    return { categories };
}

export default connect(
    mapStateToProps,
    { fetchCategories }
)(Categories);