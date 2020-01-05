import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNewReleases } from '../../actions/spotify.action';
import { Link } from "react-router-dom";
import history from '../../history';

class NewReleases extends Component {

    componentDidMount() {
        this.props.fetchNewReleases();
    }

    renderNewReleases = () => {
        const { items } = this.props.spotify && this.props.spotify.new_releases;
        //console.log(items);
        if (items && items.length) {
            return items.map(item => {
                return (

                    <div className="card card-cascade wider" key={item.id}>
                        <div className="view view-cascade overlay" onClick={() => { history.push(`/album/${item.id}`) }}>
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
                            <h4 className={'card-title' + (item.name.length > 20? ' text-truncate-custom': '')}>
                                <strong>{item.name}</strong>
                            </h4>
                            <Link to={`/artist/${item.artists[0].id}`}>
                                <h5 className={'blue-text pb-2' + (item.artists[0].name.length > 20 ? ' text-truncate-custom' : '')}>
                                    <strong>{item.artists[0].name}</strong>
                                </h5>
                            </Link>
                            {/* <p className="card-text">
                  Sed ut perspiciatis unde omnis iste natus sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam.
                </p>

                <a className="px-2 fa-lg li-ic">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="px-2 fa-lg tw-ic">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="px-2 fa-lg fb-ic">
                  <i className="fab fa-facebook-f"></i>
                </a> */}
                        </div>
                    </div>
                )
            })
        } else {
            return <p>Loading......</p>
        }
    }

    render() {
        return (

            <section className="new-releases-section">
                <div className="cardsContainer">
                    <p className="section-title">New Releases</p>
                    {this.props.spotify && this.props.spotify.new_releases && this.renderNewReleases()}
                </div>
            </section>
        );
    }

}

const mapStateToProps = state => {
    //console.log(state);
    return state;
}

export default connect(
    mapStateToProps,
    { fetchNewReleases }
)(NewReleases);