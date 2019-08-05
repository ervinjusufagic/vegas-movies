import React, { Component } from "react";

class SearchResult extends Component {
  render() {
    return (
      <div
        onClick={() => {
          this.props.setSearchMovie(this.props.movie.id);
        }}
        className="searchResult"
      >
        <img
          className="searchResultImg"
          alt=""
          src={`https://image.tmdb.org/t/p/original/${
            this.props.movie.poster_path
          }`}
        />
        <div className="searchResultTitle">
          <h5>{this.props.movie.title}</h5>

          <span className="searchResultOV">{this.props.movie.overview}</span>
        </div>
      </div>
    );
  }
}

export default SearchResult;
