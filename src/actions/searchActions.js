export function search(query) {
  return {
    type: "SEARCH",
    payload: {
      query: query
    }
  };
}

export function setSearchResults(movies) {
  return {
    type: "SET_SEARCH_RESULTS",
    payload: {
      searchResults: movies
    }
  };
}
