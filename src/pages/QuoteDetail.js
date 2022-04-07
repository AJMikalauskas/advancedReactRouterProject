import { useParams, Route } from "react-router-dom";
import Comments from "../components/comments/Comments"

const QuoteDetail = () => {
    // this gets the specified :quoteDetail in this "/quotes/:quoteDetail" in the URL, so if "/quotes/drink"
        // drink willl show in the params below in JSX by useParams();
            // Add nested route for commentx on specific quote detail page in this js file.
  const params = useParams();
  return (
    <div>
      <h1>Quote Detail!</h1>
      <h2>{params.quoteDetail}</h2>
      <Route path={`/quotes/${params.quoteDetail}/comments`}> 
        <Comments />
      </Route>
    </div>
  );
};

export default QuoteDetail;
