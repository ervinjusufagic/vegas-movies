import React, { Component } from "react";
import { Row, Col } from "antd";

//https://image.tmdb.org/t/p/original/posterpath
class CarouselContent extends Component {
  state = {
    movies: []
  };

  componentWillMount() {
    let movies = [];
    this.props.movies.forEach(movie => {
      if (movie !== null) {
        movies.push(movie);
      }
    });

    this.setState({
      movies: movies
    });
  }

  renderMovies() {
    return this.state.movies.map(movie => {
      return (
        <Col key={movie.id} span={4}>
          <div
            onMouseEnter={() =>
              this.props.toggleDetails(true, movie, this.props.type, "home")
            }
            className="movieItem"
          >
            <img
              alt=""
              className="movieItemImg baseHeight"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
          </div>
        </Col>
      );
    });
  }

  render() {
    return <Row>{this.renderMovies()}</Row>;
  }
}
export default CarouselContent;
