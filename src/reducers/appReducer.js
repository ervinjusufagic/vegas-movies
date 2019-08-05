const initalState = {
  searchQuery: "",
  searchResults: [],
  nowPlaying: [],
  popular: [],
  favourites: [],
  watchLater: [],

  isSettingFavourites: true,
  isSettingWatchLater: true,
  isFetchingFavourites: true,
  isFetchingWatchLater: true,
  isFetchingPopular: true,
  isFetchingNowPlaying: true,
  isSettingPopular: true,
  isSettingNowPlaying: true,

  showDetails: false,
  selectedMovie: "",
  descType: "",
  currentPage: "home",
  isModalOpen: false,
  selectedSearchMovie: null
};

export default function appReducer(state = initalState, action) {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        searchQuery: action.payload.query
      };

    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload.searchResults
      };

    case "SET_POPULAR":
      return {
        ...state,
        popular: action.payload.movies,
        isFetchingPopular: false,
        isSettingNowPlaying: action.payload.isSettingNowPlaying
      };

    case "SET_NOW_PLAYING":
      return {
        ...state,
        nowPlaying: action.payload.movies,
        isFetchingNowPlaying: false,
        isSettingPopular: action.payload.isSettingPopular
      };

    case "SET_FAVOURITES":
      return {
        ...state,
        favourites: action.payload.movies,
        isFetchingFavourites: false,
        isSettingFavourites: action.payload.isSettingFavourites
      };

    case "SET_WATCH_LATER":
      return {
        ...state,
        watchLater: action.payload.movies,
        isFetchingWatchLater: false,
        isSettingWatchLater: action.payload.isSettingWatchLater
      };

    case "TOGGLE_DETAILS":
      return {
        ...state,
        showDetails: action.payload.showDetails,
        selectedMovie: action.payload.selectedMovie,
        descType: action.payload.descType,
        origin: action.payload.origin
      };

    case "TOGGLE_MODAL":
      return {
        ...state,
        isModalOpen: action.payload.isModalOpen,
        selectedMovie: action.payload.selectedMovie,
        origin: action.payload.origin
      };

    case "SET_ACTIVE_PAGE":
      return {
        ...state,
        currentPage: action.payload.page
      };

    case "SET_SEARCH_MOVIE":
      return {
        ...state,
        selectedSearchMovie: action.payload.selectedSearchMovie
      };

    default:
      return state;
  }
}
