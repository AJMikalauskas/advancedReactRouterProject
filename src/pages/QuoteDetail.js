import { Fragment } from "react";
import { useParams, Route } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import { DUMMY_QUOTES } from "./AllQuotes";
const QuoteDetail = () => {
  // this gets the specified :quoteDetail in this "/quotes/:quoteDetail" in the URL, so if "/quotes/drink"
  // drink willl show in the params below in JSX by useParams();
  // Add nested route for commentx on specific quote detail page in this js file.
  const params = useParams();
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
          <Route path={`/quotes/${params.quoteDetail}/comments`}>
            <Comments />
          </Route>
        </Fragment>
      ) : (
        <NoQuotesFound />
      )};
    </div>
  );
};

export default QuoteDetail;
