import React, { Component } from "react";
import classes from "./Youtube.css";
import YoutubeComp from "../../components/YoutubeComp/YoutubeComp";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Youtube extends Component {
  //Initial state that includes all of the fetched videos array and boolean value whether youtube video exists or not
  state = {
    fetchedVideos: [],
    youtubeExist: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.youtubeExist !== nextState.youtubeExist) {
      return true;
    } else {
      return false;
    }
  }
  //Care function will be invoked component has been mounted
  componentDidMount() {
    this.care(this.props.match.params.imdId);
  }
  //After invoking this function, URL will go one page back
  clicking = () => {
    this.props.history.goBack();
  };
  //Function that fetches movies based on passed ID, and provides us with exact details of each movie
  care = (id) => {
    let key = "a1e70815ed514d294dc936b2f74a2ef3";
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=pt-BR&append_to_response=credits,release_dates,videos`
      )
      .then((res) => {
        let fetchMovies = [];
        let results = res;
        //Looping through fetched results and returning youtube video of a movie as a separate value
        results.data.videos.results.map((el) => {
          return (results.youtube = el);
        });

        results.youtubeFull =
          "https://www.youtube.com/embed/" + results.youtube.key;

        fetchMovies.push(results);
        //Storing our results in array and placing that array into our initial state, while also creating boolean operator to see if there is youtube video or not which will help in making Error handler later

        this.setState({
          fetchedVideos: fetchMovies,
          youtubeExist: fetchMovies[0].data.video ? false : true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Using ternary operator returning Youtube component with exact youtube trailer if variable youtubeExist is true, if its false returning 404 error
  render() {
    return this.state.youtubeExist ? (
      <div onClick={() => this.clicking()} className={classes.Youtube}>
        {this.state.fetchedVideos.map((el) => {
          return <YoutubeComp key={el} url={el.youtubeFull} />;
        })}
        <IoIosCloseCircleOutline
          onClick={() => this.clicking.bind(this)}
          className={classes.icon}
        />
      </div>
    ) : (
      <div onClick={() => this.clicking()} className={classes.Youtube}>
        <p className={classes.youtubeNotExisting}>
          404
          <span className={classes.youtspan}>
            Your youtube link does not exist. Please visit our site.
          </span>
        </p>
        <IoIosCloseCircleOutline
          onClick={() => this.clicking.bind(this)}
          className={classes.icon}
        />
      </div>
    );
  }
}

export default withRouter(Youtube);
