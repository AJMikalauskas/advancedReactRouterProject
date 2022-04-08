import { Fragment } from "react";
import { useParams, Route, Link, useRouteMatch} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import { DUMMY_QUOTES } from "./AllQuotes";
const QuoteDetail = () => {
  // this gets the specified :quoteDetail in this "/quotes/:quoteDetail" in the URL, so if "/quotes/drink"
  // drink willl show in the params below in JSX by useParams();
  // Add nested route for commentx on specific quote detail page in this js file.
  const params = useParams();

  // This will get the current page in the stack and can be used in the <Route> tag path below
    // The console.log returned an object with 4 properties:
        //isExact: can be true or false based on exact keyword in Route
        //path: ' quotes/:quoteDetail'
        //url: 'quotes/quote2'
        //params { quoteDetail: 'quote2'}
  const match = useRouteMatch();
  console.log(match);
  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteDetail);

  //  if(!quote)
  //  {

  //  }

  return (
    <div>
      {/* These are dummy data quote detail! - quote1,quote2 
      <h1>Quote Detail!</h1>
      <h2>{params.quoteDetail}</h2> */}
      {/* <h1>{quote.text}</h1>
      <p>{quote.author}</p> */}
      {quote ? (
        <Fragment>
          <HighlightedQuote text={quote.text} author={quote.author} />
          {/* This wrapper Route allows for the Link to the comment to be hidden on the comment page, very nice
          and creative way to use nested routes. Remember to put exact keyword!*/}
          {/* replace `/quotes/${params.quoteDetail}` with match.path for dynamic ability, match.url won't work not dynamic? */}
          <Route path={match.path} exact>
          <div className="centered">
              {/* You can use match.url here because the dynamic path is set in the wrapping route by match.path,
              match.url means that it's non dynamic and just pulls the url speicifically.
              replaced /quotes/${params.quoteDetail} with ${match.url}
               */}
            <Link className="btn--flat" to={`${match.url}/comments`}>
              Link to this quote's comments!
            </Link>
          </div>
          </Route>
          {/*  match returns show above, way more useful than just params.quoteDetail and more dynamic 
          This `/quotes/${params.quoteDetail} is replaced by match */}
          <Route path={`${match.path}/comments`}>
            <Comments />
          </Route>
        </Fragment>
      ) : (
        <NoQuotesFound />
      )}
      ;
    </div>
  );
};

export default QuoteDetail;
