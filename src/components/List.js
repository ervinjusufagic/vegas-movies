import React from "react";

function List(props) {
  function renderList() {
    let movies = [];
    if (props.type === "watchLater") {
      movies = props.watchLater;
    } else if (props.type === "favourites") {
      movies = props.favourites;
    }

    if (movies !== null && movies !== undefined && movies.length !== 0) {
      return movies.map(movie => {
        return (
          <div
            key={movie.id}
            className="listItem"
            onClick={() => props.toggleModal(true, movie, "list")}
          >
            <img
              alt=""
              className="baseHeight"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
          </div>
        );
      });
    } else {
      return <div>Could not get movies.</div>;
    }
  }

  return <div className="list">{renderList()}</div>;
}

export default List;
