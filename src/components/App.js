import React, { Component } from 'react';
import Header from './Header';
import Messages from './Messages';
import history from '../history';
import { Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import LandingPage from './LandingPage';
import Artist from "./Others/Artist";
import PlayList from "./Others/PlayList";
import FeaturedCategory from "./Others/FeaturedCategory";
import Player from "./Others/Player";
import Loader from "./Loader";
import Album from "./Others/Album";
import NotFound from "./NotFound";
import MyMusic from "./Others/MyMusic";
import '../css/index.scss'

class App extends Component {
  render() {
    return (
      <div className="mainContainer">
        <Router history={history}>
          <div>
            <Header />
            <Messages />
            <Switch>
              <Route path="/login" exact component={ Login } />
              <Route path="/register" exact component={ Register } />
              <Route path="/home" exact component={ LandingPage } />
              <Route path="/artist/:id" exact component={ Artist } />
              <Route path="/playlist/:id" exact component={ PlayList } />
              <Route path="/featured-playlists/:id" exact component={ FeaturedCategory } />
              <Route path="/album/:id" exact component={ Album } />
              <Route path="/myMusic" exact component={ MyMusic } />
              <Route path="*" component={ NotFound } />
            </Switch>
            <Player />
          </div>
        </Router>
        <Loader />
      </div>
    );
  }
}

export default App;
