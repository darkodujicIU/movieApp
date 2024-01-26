import React, { useEffect } from "react";
import classes from "./ClickedActorComp.css";
import * as action from "../../store/actions/index";
import { connect } from "react-redux";
import ScrollAnimation from "react-animate-on-scroll";
import { withRouter } from "react-router";
import Bare from "../../assets/photo-1524712245354-2c4e5e7121c0.jpg";
const ClickedActorComp = React.memo((props) => {
  //After component is rendered, invoke onInitActors function with passed parameter only once
  useEffect(() => {
    props.onInitActors(props.match.params.actorId);
  }, []);

  //Limiting title name length
  const limitTitle = (title, limit = 370) => {
    const titles = [];
    //If title length is bigger than limit which has been set, first we are splitting that title into letters than reducing size and finally updating title.
    if (title.length > limit) {
      title.split(" ").reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
          titles.push(cur);
        }
        return acc + cur.length;
      }, 0);
      //After splitting title to reduce size of it according to desired limit, we have to join it now to be able to return it in complete shape
      return `${titles.join(" ")}...`;
    }
    return title;
  };

  return (
    <div className={classes.clickedActorComp}>
      <div className={classes.clickedActorDetail}>
        <img
          alt={Bare}
          className={classes.clickedActorImage}
          src={props.image}
        ></img>
        <ScrollAnimation animateIn="fadeIn" duration={1} offset={50}>
          <div className={classes.clickedActorheader}>
            <h3 className={classes.clickedHeader}>{props.name}</h3>
            <p className={classes.clickedPara}>
              {props.bio.length === 470 ? (
                limitTitle(props.bio)
              ) : (
                <span>
                  {limitTitle(props.bio)}
                  <span onClick={props.see} className={classes.seeMore}>
                    {" "}
                    Visit link
                  </span>
                </span>
              )}
            </p>
          </div>
          <div className={classes.det}>
            <div className={classes.Detail}>
              Known for:<span className={classes.DetailAns}>{props.know}</span>
            </div>
            <div className={classes.Detail}>
              Birth Place:
              <span className={classes.DetailAns}>{props.place}</span>{" "}
            </div>
            <div className={classes.Detail}>
              Born:<span className={classes.DetailAns}>{props.birth}</span>{" "}
            </div>
          </div>
        </ScrollAnimation>
        <div className={classes.work}>
          <a href=" #" className={classes.worka}>
            <span className={classes.prevWork}>Previous work</span>
          </a>
        </div>
      </div>
      <footer className={classes.footer}>
        <span className={classes.footering}>
          Copyright © 2024. Darko Dujic IU University
        </span>
        <span className={classes.footering}>
          All data that you see is provided via{" "}
          <a href=" #" className={classes.tmdb}>
            tMDB .
          </a>
        </span>
      </footer>
    </div>
  );
});
//Passing state which includes fetched movies data along with loading phase and error handler
const stateToProps = (state) => {
  return {
    movies: state.movie.movies,
    loading: state.movie.loading,
    error: state.movie.error,
  };
};

//Dispatching function in state which invokes function based on passed ID of an actor
const mapStateToDispatch = (dispatch) => {
  return {
    onInitActors: (actorId) => dispatch(action.MOVIE_ACTOR(actorId)),
  };
};
export default connect(
  stateToProps,
  mapStateToDispatch
)(withRouter(ClickedActorComp));
