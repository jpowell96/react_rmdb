import React from "react";
import "./MovieThumb.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const MovieThumb = ({ movieName, movieId, image, clickable }) => {
  return (
    <div className="rmdb-moviethumb">
      {clickable ? (
        <Link
          to={{
            pathname: `/${movieId}`,
            movieName: `${movieName}`
          }}
        >
          <img src={image} alt={`Movie Thumbnail for ${movieName}`} />
        </Link>
      ) : (
        <img src={image} alt={`Movie Thumbnail for ${movieName}`} />
      )}
    </div>
  );
};

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  movieName: PropTypes.string,
  clickable: PropTypes.bool
};

export default MovieThumb;
