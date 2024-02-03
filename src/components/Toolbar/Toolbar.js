import Aux from "../../hoc/axxx";
import classes from "./Toolbar.css";
import React, { Component } from "react";
import Title from "../Layout/Title/Title";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SearchBar from "./searchBar";
import { animateScroll as scroll } from "react-scroll";
import Axios from "axios";
import { withRouter } from "react-router";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
class Toolbar extends Component {
  //Creation of state which includes at first two empty arrays which will later come to data be pushed into each of them
  state = {
    searches: [],
    dare: [],
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.dare !== nextState.dare) {
      return true;
    } else {
      return false;
    }
  }
  //Scrolling animation
  scrollTo = () => {
    scroll.scrollTo(1000, { smooth: true, duration: 500 });
  };

  refreshPage = () => {
    window.location.reload();
  };

  //Creation and toggling of navbar which precisely comes in smaller screen sizes
  navBar = () => {
    let wholeNav = document.getElementById("nav");
    const buttonClose = document.getElementById("icon");
    const burger = document.getElementById("bars");
    const genre = document.getElementById("zanr");
    const type = document.getElementById("type");

    wholeNav.classList.toggle(classes.active);
    burger.classList.toggle(classes.toggle);

    buttonClose.addEventListener("click", () => {
      wholeNav.classList.add(classes.close);
      burger.classList.remove(classes.toggle);
    });

    genre.addEventListener("click", () => {
      type.classList.toggle(classes.typeClosed);
    });

    burger.addEventListener("click", () => {
      wholeNav.classList.toggle(classes.active);
      wholeNav.classList.toggle(classes.close);
    });
  };
  //During type of letters in search bar fetching of data starts based on search term
  searchTerm = (searchTerm) => {
    let key = "a1e70815ed514d294dc936b2f74a2ef3";

    Axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${searchTerm}`
    )
      .then((res) => {
        let search = [];
        const results = res.data.results;

        results.forEach((el) => {
          search.push(el);
          el.poster_path =
            "https://image.tmdb.org/t/p/original" + el.poster_path;
        });
        //Once data has been fetched completely based on written search terms, we are putting search array into search state array
        this.setState({ searches: search });
      })
      .catch((error) => {
        console.log(error);
      });
    //Regular expression which helps in filtering received title of fetched data by search term that is written in search bar
    let matches = this.state.searches.filter((el) => {
      const regex = new RegExp(`^${searchTerm}`, "gi");
      return el.original_title.match(regex);
    });
    //If nothing is written, matches array in state is empty
    if (searchTerm.length <= 1) {
      matches = [];
    }

    this.outputHtml(matches);
  };

  //Creating function which places matches array into states dare array
  outputHtml = (matches) => {
    this.setState({ dare: matches });
  };
  //Changing URL location using movie ID when clicking on any movie that is shown as a result of searching
  pushingHistory = (movieId) => {
    this.props.history.push("/movie/" + movieId);
  };

  loagout = () => {
    this.props.onAuthLoag();
  };

  //Social media icons and location which we will be redirected when clicking on them
  iconClick = (icon) => {
    if (icon === "facebook") {
      window.location.href = "https://www.facebook.com";
    } else if (icon === "instagram") {
      window.location.href = "https://www.instagram.com";
    } else if (icon === "twitter") {
      window.location.href = "https://www.twitter.com";
    } else if (icon === "email") {
      window.location.href = "https://www.gmail.com";
    }
  };

  render() {
    return (
      <Aux>
        <div className={classes.searchBox}>
          <input
            onInput={() => this.searchTerm(this.refs.mySearch.value)}
            ref="mySearch"
            type="text"
            placeholder="Search"
            className={classes.searchInput}
          ></input>
          <button className={classes.searchButton} href="#">
            <FaSearch className={classes.material} />
          </button>
        </div>
        <div className={classes.maki} id="dare">
          {this.state.dare.map((el) => {
            return (
              <SearchBar
                clicked={() => this.pushingHistory(el.id)}
                title={el.original_title}
                year={el.release_date}
                image={el.poster_path}
                id={el.id}
              />
            );
          })}
        </div>
        <Title />
        <nav className={classes.Nav} id="nav">
          <IoIosCloseCircleOutline
            onClick={this.clicking}
            className={classes.icon}
            id="icon"
          />

          <div className={classes.sideicons}>
            <a
              href=" #"
              className={classes.social}
              onClick={() => this.iconClick("facebook")}
            >
              <FaFacebookF className={classes.iconn} />
            </a>
            <a
              href=" #"
              className={classes.social}
              onClick={() => this.iconClick("instagram")}
            >
              <FaInstagram className={classes.iconn} />
            </a>
            <a
              href=" #"
              className={classes.social}
              onClick={() => this.iconClick("twitter")}
            >
              <FaTwitter className={classes.iconn} />
            </a>
            <a
              href=" #"
              className={classes.social}
              onClick={() => this.iconClick("email")}
            >
              <FaEnvelope className={classes.iconn} />
            </a>
          </div>
          <ul className={classes.Uli}>
            <NavLink
              onClick={() => this.refreshPage()}
              to="/"
              exact
              className={classes.Li}
              key="li"
            >
              / Home
            </NavLink>
            <NavLink to="/most-watched" className={classes.Li} key="li1">
              / Most watched
            </NavLink>
            <NavLink to="/upcoming-movies" className={classes.Li} key="li2">
              / Upcoming
            </NavLink>
          </ul>

          {this.props.token ? (
            <NavLink
              onClick={this.loagout}
              to="/login"
              className={classes.dare}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              onClick={this.loagout}
              to="/login"
              className={classes.dare}
            >
              Login
            </NavLink>
          )}
          <div className={classes.Zanrr} id="zanr">
            <a href=" #" className={classes.Zanr}>
              {" "}
              / Genre
            </a>
          </div>
          <div className={classes.Type} id="type">
            <ul className={classes.darinjo}>
              <NavLink to="/action" className={classes.Typeof} value="28">
                Action
              </NavLink>
              <NavLink to="/adventure" className={classes.Typeof} value="12">
                Adventure
              </NavLink>
              <NavLink to="/comedy" className={classes.Typeof} value="35">
                Comedy
              </NavLink>
              <NavLink to="/crime" className={classes.Typeof} value="80">
                Crime
              </NavLink>
              <NavLink to="/drama" className={classes.Typeof} value="18">
                Drama
              </NavLink>
              <NavLink to="/fantasy" className={classes.Typeof} value="10751">
                Fantasy
              </NavLink>
              <NavLink to="/horror" className={classes.Typeof} value="27">
                Horror
              </NavLink>
              <NavLink to="/romance" className={classes.Typeof} value="10749">
                Romance
              </NavLink>
            </ul>
          </div>
        </nav>
        <div className={classes.bars} id="bars" onClick={() => this.navBar()}>
          <span className={classes.ham}></span>
        </div>
      </Aux>
    );
  }
}

//Passing state using props property of React. State includes token, loading phase and error
const stateWithProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};
//Passing authentification dispatch functions and its needed parameters
const stateDispatchToProps = (dispatch) => {
  return {
    onAuthFetch: (username, password) =>
      dispatch(actions.AUTH_FETCH(username, password)),
    onAuthLoag: () => dispatch(actions.AUTH_LOAGOUT_FETCH()),
  };
};

export default connect(
  stateWithProps,
  stateDispatchToProps
)(withRouter(React.memo(Toolbar, [])));
