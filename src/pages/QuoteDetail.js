import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
//import { DUMMY_QUOTES } from "./AllQuotes";
const QuoteDetail = () => {
  //Similar to get all quotes from AllQuotes.js 
    // Only difference is getSingleQuote and true second param is simlar too
      // send request when component loads by useEffect
  const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote,true);
  // this gets the specified :quoteDetail in this "/quotes/:quoteDetail" in the URL, so if "/quotes/drink"
  // drink willl show in the params below in JSX by useParams();
  // Add nested route for commentx on specific quote detail page in this js file.
  const params = useParams();
  console.log(params)

  // This will get the current page in the stack and can be used in the <Route> tag path below
    // The console.log returned an object with 4 properties:
        //isExact: can be true or false based on exact keyword in Route
        //path: ' quotes/:quoteDetail'
        //url: 'quotes/quote2'
        //params { quoteDetail: 'quote2'}
  const match = useRouteMatch();
  console.log(match);


  // send request of getting the same quote by useEffect()
    // remember that getSingleQuote takes in the quoteDetail as a param 
      // take in from the useParams() constant -> object destructuring
        // My difference is my keyword I used which is quoteDetail versus quoteId
      const {quoteDetail} = params;
  useEffect(() => {
    sendRequest(quoteDetail);
  }, [quoteDetail, sendRequest])
  //const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteDetail);

  if(status === 'pending')
  {
    return <div className="centered"><LoadingSpinner/></div>
  }

  if(error)
  {
    return <p className="centered focused">{error}</p>
  }

  // loadedQuote is always returned, so the !loadedQuote.text is a better if statement 
  if(!loadedQuote.text)
  {
    return <p>No Quote Found!</p>
  }
  //const quote = {text:"empty",author:'empty'};

  return (
    <div>
      {/* These are dummy data quote detail! - quote1,quote2 
      <h1>Quote Detail!</h1>
      <h2>{params.quoteDetail}</h2> */}
      {/* <h1>{quote.text}</h1>
      <p>{quote.author}</p> */}
      {/*  replace quote with loadedQuote, quote was hardcoded but loadedQuote is the data from the useHttp function */}
      {loadedQuote ? (
        <Fragment>
          <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
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
