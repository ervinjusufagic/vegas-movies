import React, { Component } from "react";
import { Row, Col, Carousel } from "antd";

import MovieDetails from "./MovieDetails";
import CarouselContent from "./CarouselContent";
import CustomDivider from "./CustomDivider";

class Content extends Component {
  renderCarouselContent(movies, type) {
    let firstSet = [];
    let secondSet = [];
    let thirdSet = [];
    let fourthSet = [];

    for (let index = 0; index < movies.length; index++) {
      if (index < 6) {
        firstSet.push(movies[index]);
      }
      if (index >= 6 && index < 12) {
        secondSet.push(movies[index]);
      }
      if (index >= 12 && index < 18) {
        thirdSet.push(movies[index]);
      }
      if (index >= 18 && index < 20) {
        fourthSet.push(movies[index]);
      }
    }

    return (
      <Col offset={1} span={22}>
        {type === "nowPlaying" ? "Now in Theaters " : "Popular"}

        <Carousel autoplay>
          {firstSet ? (
            <CarouselContent
              toggleDetails={this.props.toggleDetails}
              type={type}
              movies={firstSet}
              descType={this.props.descType}
              showDetails={this.props.showDetails}
            />
          ) : (
            ""
          )}

          {secondSet ? (
            <CarouselContent
              toggleDetails={this.props.toggleDetails}
              type={type}
              movies={secondSet}
              descType={this.props.descType}
            />
          ) : (
            ""
          )}
          {thirdSet.length !== 0 ? (
            <CarouselContent
              toggleDetails={this.props.toggleDetails}
              type={type}
              movies={thirdSet}
              descType={this.props.descType}
            />
          ) : (
            ""
          )}
          {fourthSet.length !== 0 ? (
            <CarouselContent
              toggleDetails={this.props.toggleDetails}
              type={type}
              movies={fourthSet}
              descType={this.props.descType}
            />
          ) : (
            ""
          )}
        </Carousel>
        {this.props.showDetails &&
        this.props.descType === type &&
        this.props.selectedMovie !== undefined &&
        this.props.selectedMovie !== null ? (
          <MovieDetails
            origin={this.props.origin}
            addToFavourites={this.props.addToFavourites}
            addToWatchLater={this.props.addToWatchLater}
            toggleDetails={this.props.toggleDetails}
            selectedMovie={this.props.selectedMovie}
          />
        ) : (
          <div />
        )}
        <CustomDivider />
      </Col>
    );
  }

  render() {
    return (
      <Row type="flex">
        {this.renderCarouselContent(
          this.props.popular[1],
          this.props.popular[0].type
        )}
        {this.renderCarouselContent(
          this.props.nowPlaying[1],
          this.props.nowPlaying[0].type
        )}
      </Row>
    );
  }
}

export default Content;

//Map 5 movies to each carousel, in carousel set a selectedmoviestate on click/hover so we can display details
