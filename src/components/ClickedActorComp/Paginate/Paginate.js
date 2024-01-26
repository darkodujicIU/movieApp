import React from "react";
import classes from "./Paginate.css";

//Creation of reusable Pagination component which will be used pages where there is a need for large fetched data
const pagination = (props) => {
  const pageLinks = [];

  //Looping through passed number of pages, starting from 1 and incrementing by 1 after each loop
  for (let i = 1; i <= props.pages + 1; i++) {
    let active = props.currentPage === i ? `${classes.selected}` : "";

    //Creation of li tag with passed data to create numbers of pagination
    pageLinks.push(
      <li key={i} className={`${classes.paginationitem} ${active}`}>
        <a onClick={() => props.nextPage(i)} className={classes.paginationlink}>
          {i}
        </a>
      </li>
    );
  }

  return (
    <div className={classes.paginationcontainer} data-wow-duration="0.5s">
      <ul className={classes.pagination}>
        {props.currentPage > 1 ? (
          <li
            className={classes.paginationitem}
            onClick={() => props.nextPage(props.currentPage - 1)}
          >
            <a className={classes.paginationlink}>prev</a>
          </li>
        ) : (
          ""
        )}
        {pageLinks}
        {props.currentPage < props.pages + 1 ? (
          <li
            className={classes.paginationitem}
            onClick={() => props.nextPage(props.currentPage + 1)}
          >
            <a className={classes.paginationlink}>Next</a>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default pagination;
