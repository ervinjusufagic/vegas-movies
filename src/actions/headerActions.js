export function setActivePage(page) {
  return {
    type: "SET_ACTIVE_PAGE",
    payload: {
      page: page
    }
  };
}

export function setSearchMovie(selectedSearchMovie) {
  return {
    type: "SET_SEARCH_MOVIE",
    payload: {
      selectedSearchMovie: selectedSearchMovie
    }
  };
}
