export function setNowPlaying(movies, isSettingNowPlaying) {
  return {
    type: "SET_NOW_PLAYING",
    payload: {
      movies: movies,
      isSettingNowPlaying: isSettingNowPlaying
    }
  };
}

export function setPopular(movies, isSettingPopular) {
  return {
    type: "SET_POPULAR",
    payload: {
      movies: movies,
      isSettingPopular: isSettingPopular
    }
  };
}

export function setFavourites(movies, isSettingFavourites) {
  return {
    type: "SET_FAVOURITES",
    payload: {
      movies: movies,
      isSettingFavourites: isSettingFavourites
    }
  };
}

export function setWatchLater(movies, isSettingWatchLater) {
  return {
    type: "SET_WATCH_LATER",
    payload: {
      movies: movies,
      isSettingWatchLater: isSettingWatchLater
    }
  };
}

export function toggleDetails(showDetails, movie, type, origin) {
  return {
    type: "TOGGLE_DETAILS",
    payload: {
      showDetails: showDetails,
      selectedMovie: movie,
      descType: type,
      origin: origin
    }
  };
}

export function toggleModal(isModalOpen, selectedMovie, origin) {
  return {
    type: "TOGGLE_MODAL",
    payload: {
      isModalOpen: isModalOpen,
      selectedMovie: selectedMovie,
      origin: origin
    }
  };
}
