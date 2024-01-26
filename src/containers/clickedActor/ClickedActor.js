import React, { Component } from "react";
import ClickedActorComp from "../../components/ClickedActorComp/ClickedActorComp";
import classes from "./ClickedActor.css";
import { connect } from "react-redux";
import * as action from "../../store/actions/index";
import Movie from "../../components/ClickedActorComp/movies/Movies";
import { withRouter } from "react-router";
import axios from "axios";
import { animateScroll as scroll } from "react-scroll";

class ClickedActor extends Component {
  //Creation of state which initially includes empty array of fetched actors and movies
  state = {
    fetchedActor: [],
    fetchedMovies: [],
  };
  componentDidMount() {
    this.fetchingResults(this.props.match.params.actorId);
    this.fetchingRecomend(this.props.match.params.actorId);
    setTimeout(() => {
      this.props.onInitActors(this.props.match.params.actorId, 1);
    }, 1200);
  }
  //Function which invokes when movie is clicked, leading into new URL based on ID of a movie, and scroll animation
  clickedMovies = (movieId) => {
    scroll.scrollTo(-2000, { smooth: true, duration: 700 });
    setTimeout(() => {
      this.props.history.push("/movie/" + movieId);
    }, 600);
  };
  //Function which do fetching of data based on ID of an actor
  fetchingResults = (actorId) => {
    let key = "a1e70815ed514d294dc936b2f74a2ef3";
    axios
      .get(
        `https://api.themoviedb.org/3/person/${actorId}?api_key=${key}&language=en-US`
      )
      .then((res) => {
        let fetchedResults = [];
        let results = res.data;
        //Creation of imdb variable that includes imdb id of an actor and pushing all of the results into fetchedResults Array
        results.imdb = "https://www.imdb.com/name/" + results.imdb_id;
        fetchedResults.push(results);
        //Creation of new profile_path variable that includes image link of a actor
        results.profile_path =
          "https://image.tmdb.org/t/p/original" + results.profile_path;
        //Manipulating state and storing updated array into state array
        this.setState({ fetchedActor: fetchedResults });
      });
  };

  //Fetching function which has as a parameter id of an actor and it fetched movies by release date based on cast that includes clicked actor
  fetchingRecomend = (actorId) => {
    let key = "a1e70815ed514d294dc936b2f74a2ef3";
    axios
      .get(
        `http://api.themoviedb.org/3/discover/movie?with_cast=${actorId}&sort_by=release_date.asc&api_key=${key}&page=1`
      )
      .then((res) => {
        let fetchedResults = [];
        let results = res.data.results;
        results.map((el) => {
          return (el.poster_path =
            "https://image.tmdb.org/t/p/original" + el.poster_path);
        });
        fetchedResults.push(results);
        results.profile_path =
          "https://image.tmdb.org/t/p/original" + results.profile_path;

        this.setState({ fetchedMovies: fetchedResults });
      });
  };
  //This function loops through whole array of fetched actors and returns ID of an actor in new URL location
  seeClick = () => {
    this.state.fetchedActor.map((el) => {
      return (window.location.href = el.imdb);
    });
  };

  render() {
    return (
      <div className={classes.clickedActor}>
        {this.state.fetchedActor.map((el, i) => {
          return (
            <ClickedActorComp
              key={i}
              see={() => this.seeClick()}
              image={el.profile_path}
              name={el.name}
              bio={el.biography}
              know={el.known_for_department}
              place={el.place_of_birth}
              birth={el.birthday}
            />
          );
        })}

        <div className={classes.mov}>
          {this.props.movies.map((el) => {
            return (
              <div key={el.id}>
                <Movie
                  clicked={() => this.clickedMovies(el.id)}
                  id={el.id}
                  path={el.poster_path}
                  title={el.title}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

//Passing state which includes fetched movies data along with loading phase and error handler
const stateToProps = (state) => {
  return {
    movies: state.movie.movies,
    loading: state.movie.loading,
    error: state.movie.error,
  };
};
//Dispatching function in state which invokes function based on passed ID of an actor and starting number of page
const mapStateToDispatch = (dispatch) => {
  return {
    onInitActors: (actorId, pageNumber) =>
      dispatch(action.MOVIE_ACTOR(actorId, pageNumber)),
  };
};

export default connect(
  stateToProps,
  mapStateToDispatch
)(withRouter(ClickedActor));
