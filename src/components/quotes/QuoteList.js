import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

//sorts array of quotes by id, helper function
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  // This console shows an object with a hash, key, pathname, and search, status
    // the pathname is "/quotes" and search is "?sort=asc" -> can extract query params by location.search?


  //Default JS built-in browser constructor function
    // returns object to extract query params by key?
  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams);

  //Helper constant -> .get pulls from key which in our case is sortBy, returns asc
    // This is a bool beacuse of operand check
  const isSortingAscending = queryParams.get('sortBy') === "asc";

  const sortedQuotes = sortQuotes(props.quotes,isSortingAscending);

  const changeSortingHandler = () =>
  {
    // Change how we sort our quotes, use query params to do so, done by useHistory?
      // ascending sort for now, make dynamic later so it changes between asc and desc
        // dynamic sortSy query param based off operand bool above is isSortingAscending
          // follows same as below showing opposite of what is actually happening allows change option
    history.push('/quotes?sortBy=' + (isSortingAscending ? 'desc' : 'asc'));
  }
  return (
    <Fragment>
      <div className={classes.sorting}>
        {/* This will later be dynamic so if ascending sort, show option to be descending order -> and vise versa 
        Shows descending if sorted currently as ascending and vise versa - based on conditional of isSortingAscending*/}
        <button onClick={changeSortingHandler}>Sort {isSortingAscending ? "Descending": "Ascending"}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
