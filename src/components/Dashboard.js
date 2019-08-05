import React, { Component } from "react";

import { Modal } from "antd";

import Header from "./Header";
import Content from "./Content";
import Spinner from "./Spinner";
import MovieDetails from "./MovieDetails";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";
import {
  setPopular,
  setNowPlaying,
  toggleDetails,
  setFavourites,
  setWatchLater,
  toggleModal
} from "../actions/movieActions";
import { setActivePage, setSearchMovie } from "../actions/headerActions";
import Lists from "./Lists";

const apolloFetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.filterMovies = this.filterMovies.bind(this);
  }
  state = {
    nowPlaying: [{ type: "nowPlaying" }],
    popular: [{ type: "popular" }],
    isLoadingPopular: true,
    isLoadingNowPlaying: true,
    isLoadingWatchLater: true,
    isLoadingFavourites: true
  };

  componentWillMount() {
    this.fetchMovieDetails("popular", this.props.popular);
    this.fetchMovieDetails("nowPlaying", this.props.nowPlaying);
    this.fetchMovieDetails("watchLater", this.props.watchLater);
    this.fetchMovieDetails("favourites", this.props.favourites);
  }

  componentWillReceiveProps() {
    if (this.props.selectedSearchMovie !== null) {
      this.props.toggleDetails(false, null, "", "");
      this.fetchMovieDetails("searchResult", [this.props.selectedSearchMovie]);
    }
  }

  addToFavourites(movieId) {
    apolloFetch({
      query: `mutation addToFavourites($movieId: Int!) {
        addToFavourites( movieId: $movieId)
      }
      `,
      variables: { movieId }
    }).then(res => {
      console.log(res);
    });
  }

  addToWatchLater(movieId) {
    apolloFetch({
      query: `mutation addToWatchLater($movieId: Int!) {
        addToWatchLater( movieId: $movieId)
      }
      `,
      variables: { movieId }
    }).then(res => {
      console.log(res);
    });
  }

  fetchMovieDetails(arrayId, ids) {

    apolloFetch({
      query: `query movies($ids: [Int]!){
          movies(ids: $ids){
            id
            title
            overview
            poster_path
            release_date
            vote_average
            vote_count
            runtime
            genres {
              id
              name
            }
            videos {
              results {
                id
                key
                type
              }
            }
            credits {
              cast {
                id
                name
                character
                profile_path
              }
            }
          }
        }
        `,
      variables: { ids }
    }).then(res => {
   
      this.filterMovies(res.data.movies, arrayId);
    });
  }

  filterMovies = (movies, arrayId) => {
    let filteredMovies = [];
    movies.forEach(movie => {
      if (movie !== null) {
        filteredMovies.push(movie);
      }
    });

    if (arrayId === "popular") {
      this.setState({
        popular: [...this.state.popular, filteredMovies],
        isLoadingPopular: false
      });
    }

    if (arrayId === "nowPlaying") {
      this.setState({
        nowPlaying: [...this.state.nowPlaying, filteredMovies],
        isLoadingNowPlaying: false
      });
    }
    if (arrayId === "favourites") {
      this.setState({
        favourites: filteredMovies,
        isLoadingFavourites: false
      });
    }

    if (arrayId === "watchLater") {
      this.setState({
        watchLater: filteredMovies,
        isLoadingWatchLater: false
      });
    }
    if (arrayId === "searchResult") {

      this.props.setSearchMovie(null);
      this.props.toggleModal(true, filteredMovies[0], "search");
    }
  };

  render() {
    if (
      !this.state.isLoadingNowPlaying &&
      !this.state.isLoadingPopular &&
      !this.state.isLoadingFavourites &&
      !this.state.isLoadingWatchLater
    ) {
      return (
        <div>
          <Header
            currentPage={this.props.currentPage}
            setActivePage={this.props.setActivePage}
            toggleModal={this.props.toggleModal}
            setSearchMovie={this.props.setSearchMovie}
          />
          {this.props.currentPage === "home" ? (
            <Content
              addToFavourites={this.addToFavourites}
              addToWatchLater={this.addToWatchLater}
              nowPlaying={this.state.nowPlaying}
              popular={this.state.popular}
              toggleDetails={this.props.toggleDetails}
              showDetails={this.props.showDetails}
              selectedMovie={this.props.selectedMovie}
              descType={this.props.descType}
              toggleModal={this.props.toggleModal}
              isModalOpen={this.props.isModalOpen}
              origin={this.props.origin}
            />
          ) : (
            <Lists
              watchLater={this.state.watchLater}
              favourites={this.state.favourites}
              toggleModal={this.props.toggleModal}
              isModalOpen={this.props.isModalOpen}
            />
          )}

          <Modal
            footer={null}
            centered
            closable
            bodyStyle={{ backgroundColor: "#222831" }}
            width="100%"
            onCancel={() => this.props.toggleModal(false, null, "")}
            visible={this.props.isModalOpen}
          >
            {this.props.selectedMovie !== null &&
            this.props.selectedMovie !== undefined ? (
              <MovieDetails
                selectedMovie={this.props.selectedMovie}
                origin={this.props.origin}
                addToFavourites={this.props.addToFavourites}
                addToWatchLater={this.props.addToWatchLater}
                toggleDetails={this.props.toggleDetails}
                //selectedMovie={this.props.selectedMovie}
              />
            ) : (
              ""
            )}
          </Modal>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

const mapDispatchToProps = {
  setNowPlaying,
  setPopular,
  setWatchLater,
  setFavourites,
  toggleDetails,
  setActivePage,
  toggleModal,
  setSearchMovie
};

const mapStateToProps = state => ({
  nowPlaying: state.nowPlaying,
  popular: state.popular,
  showDetails: state.showDetails,
  selectedMovie: state.selectedMovie,
  descType: state.descType,
  currentPage: state.currentPage,
  favourites: state.favourites,
  watchLater: state.watchLater,
  isModalOpen: state.isModalOpen,
  origin: state.origin,
  selectedSearchMovie: state.selectedSearchMovie
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
