import React from 'react';
import { Link } from 'react-router-dom';
import noresults from "../images/noresults.png";

const NotFound = () => (
    <div className="notFoundPageWrapper">
        <div className="notFoundPage">
            <img src={ noresults } />
            <h3>404 page not found</h3>
            <p>We are sorry but the page you are looking for does not exist.</p>

            <center><Link to="/home">Return to Home Page</Link></center>
        </div>
    </div>
);

export default NotFound;