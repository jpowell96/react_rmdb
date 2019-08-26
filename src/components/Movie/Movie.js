import React, { Component } from "react";
import { API_KEY, API_URL } from "../../config";
import Navigation from "../elements/Navigation/Navigation";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
import Actor from "../elements/Actor/Actor";
import Spinner from "../elements/Spinner/Spinner";
import "./Movie.css";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
class Movie extends Component {
  state = {
    movie: null,
    actors: [],
    directors: [],
    loading: false
  };

  componentDidMount() {
    this.setState({
      loading: true
    });

    if (localStorage.getItem(`${this.props.match.params.movieId}`)) {
      const apiData = JSON.parse(
        localStorage.getItem(`${this.props.match.params.movieId}`)
      );
      this.setState({ ...apiData });
    } else {
      //1. Fetch the movie:
      const endpoint = `${API_URL}movie/${
        this.props.match.params.movieId
      }?api_key=${API_KEY}&language=en-US`;
      this.fetchItems(endpoint);
    }
  }

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        //1. Check for a 404 error
        if (result.status_code) {
          this.setState({ loading: false });
        } else {
          //Grab movie, then grab actors for the movie
          this.setState(
            { movie: result },
            () => {
              const actorsEndpoint = `${API_URL}movie/${
                this.props.match.params.movieId
              }/credits?api_key=${API_KEY}`;
              fetch(actorsEndpoint)
                .then(result => result.json())
                .then(result => {
                  const directors = result.crew.filter(
                    member => member.job === "Director"
                  );
                  this.setState({
                    actors: result.cast,
                    directors: directors,
                    loading: false
                  });
                });
            },
            () => {
              localStorage.setItem(
                `${this.props.match.params.movieId}`,
                JSON.stringify(this.state)
              );
            }
          );
        }
      })
      .catch(error => console.error("Error: ", error));
  };

  render() {
    return (
      <div className="rmdb-movie">
        {this.state.movie ? (
          <div>
            <Navigation
              movie={
                this.props.location.movieName || this.state.movie.original_title
              }
            />
            <MovieInfo
              movie={this.state.movie}
              directors={this.state.directors}
            />
            <MovieInfoBar
              time={this.state.movie.runtime}
              budget={this.state.movie.budget}
              revenue={this.state.movie.revenue}
            />
            {this.state.actors ? (
              <div className="rmdb-movie-grid">
                <FourColGrid
                  header={"Actors"}
                  children={this.state.actors.map((elt, i) => {
                    return <Actor actor={elt} key={i} />;
                  })}
                />
              </div>
            ) : null}

            {this.state.loading ? <Spinner /> : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Movie;
