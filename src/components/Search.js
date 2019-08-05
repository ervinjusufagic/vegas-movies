import React, { Component } from "react";

import { Input } from "antd";
import SearchResult from "./SearchResult";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";
import { search, setSearchResults } from "../actions/searchActions";

const apolloFetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class Search extends Component {
  constructor(props) {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }

  search(query) {
    apolloFetch({
      query: `query search($query: String!){
            search(query: $query){
              id
              title
              overview
              poster_path
              release_date
            }
          }
          `,
      variables: { query }
    }).then(res => {
      this.props.setSearchResults(res.data.search);
    });
  }

  handleSearch(e) {
    this.props.search(e.target.value);
    this.search(e.target.value);
  }

  renderSearchResults() {
    if (this.props.searchResults !== null) {
      return this.props.searchResults.map(movie => {
        return (
          <SearchResult
            setSearchMovie={this.props.setSearchMovie}
            key={movie.id}
            movie={movie}
          />
        );
      });
    }
  }

  render() {
    return (
      <div>
        <Input
          placeholder="Search for a movie.."
          value={this.props.searchQuery}
          onChange={e => this.handleSearch(e)}
        />
        <div className="searchResultContainer">
          {this.renderSearchResults()}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  search,
  setSearchResults
};

const mapStateToProps = state => ({
  searchQuery: state.searchQuery,
  searchResults: state.searchResults
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
