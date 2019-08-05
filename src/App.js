import React, { Component } from "react";
import Dashboard from "./components/Dashboard";

import "./style/App.css";
import "./style/custom-antd.css";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";
import {
  setNowPlaying,
  setPopular,
  setFavourites,
  setWatchLater
} from "./actions/movieActions";
import Spinner from "./components/Spinner";

const apolloFetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  getWatchLater() {
    apolloFetch({
      query: `query watchLater{
        watchLater
      }
        `
    }).then(res => {
      this.props.setWatchLater(res.data.watchLater);
    });
  }

  getFavourites() {
    apolloFetch({
      query: `query favourites{
        favourites
      }
        `
    }).then(res => {
      this.props.setFavourites(res.data.favourites);
    });
  }
  getPopular() {
    let popularIds = [];
    apolloFetch({
      query: `query popular{
            popular{
              id
            }
          }
          `
    }).then(res => {
      res.data.popular.forEach(popular => {
        popularIds.push(popular.id);
      });
      this.props.setPopular(popularIds);
    });
  }

  getNowPlaying() {
    let nowPlayingIds = [];
    apolloFetch({
      query: `query nowplaying{
        nowplaying{
              id
            }
          }
          `
    }).then(res => {
      res.data.nowplaying.forEach(nowPlaying => {
        nowPlayingIds.push(nowPlaying.id);
      });
      this.props.setNowPlaying(nowPlayingIds);
    });
  }

  componentWillMount() {
    this.getNowPlaying();
    this.getPopular();
    this.getFavourites();
    this.getWatchLater();
  }

  render() {
    if (
      !this.props.isFetchingNowPlaying &&
      !this.props.isFetchingPopular &&
      !this.props.isFetchingFavourites &&
      !this.props.isFetchingWatchLater
    ) {
      return <Dashboard />;
    } else {
      return <Spinner />;
    }
  }
}

const mapDispatchToProps = {
  setNowPlaying,
  setPopular,
  setFavourites,
  setWatchLater
};

const mapStateToProps = state => ({
  isFetchingPopular: state.isFetchingPopular,
  isFetchingNowPlaying: state.isFetchingNowPlaying,
  isFetchingFavourites: state.isFetchingFavourites,
  isFetchingWatchLater: state.isFetchingWatchLater
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
