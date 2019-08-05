import React from "react";
import YouTube from "react-youtube";

import { Row, Col, Tag, Button } from "antd";

const opts = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
};

function _onReady(event) {
  // access to player in all event handlers via event.target
  event.target.playVideo();
}

function MovieDetails(props) {
  return (
    <Row type="flex">
      <Col offset={1} span={22}>
        <div
          onMouseLeave={
            props.origin === "home"
              ? () => props.toggleDetails(false, "", "", "")
              : ""
          }
        >
          <Row type="flex">
            <Col span={12} className="trailerContainer baseHeight">
              <YouTube
                className="player baseHeight"
                videoId={
                  props.selectedMovie.videos.results[0] !== null &&
                  props.selectedMovie.videos.results[0] !== undefined
                    ? props.selectedMovie.videos.results[0].key
                    : ""
                }
                opts={opts}
                onReady={_onReady}
              />
            </Col>
            <Col span={12} className="movieInfoContainer baseHeight">
              <div className="movieInfoHeader">
                <div className="movieInfoTitle">
                  <h2>{props.selectedMovie.title}</h2>
                  <h2>{props.selectedMovie.release_date}</h2>
                </div>
                <div className="movieInfoTagContainer">
                  {props.selectedMovie.genres.map(genre => {
                    return (
                      <Tag key={genre.id} color="#993e25">
                        {genre.name}
                      </Tag>
                    );
                  })}
                </div>
              </div>

              <div className="movieInfoOW">{props.selectedMovie.overview}</div>
              <div className="movieInfoBtns">
                {props.selectedMovie.vote_average}/10
                {props.origin === "home" ? (
                  <Button.Group>
                    <Button
                      type="primary"
                      onClick={() =>
                        props.addToFavourites(props.selectedMovie.id)
                      }
                    >
                      Add to favourites
                    </Button>
                    <Button
                      type="primary"
                      onClick={() =>
                        props.addToWatchLater(props.selectedMovie.id)
                      }
                    >
                      Watch Later
                    </Button>
                  </Button.Group>
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}

export default MovieDetails;
