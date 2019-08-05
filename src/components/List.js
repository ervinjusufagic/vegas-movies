import React from "react";

function List(props) {
  console.log(props);
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
            className="listItem"
            onClick={() => props.toggleModal(true, movie, "list")}
          >
            <img
              className="baseHeight"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
          </div>
        );
      });
    } else {
      return <div>problem</div>;
    }
  }

  return <div className="list">{renderList()}</div>;
}

export default List;
