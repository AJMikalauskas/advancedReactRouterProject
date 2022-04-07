import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import QuoteList from "./components/quotes/QuoteList";
//import MainHeader from "./components/UI/MainHeader";
import AddQuote from "./pages/AddQuote";
import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";

function App() {
  return (
    // Need props.children in Layout.js file so that all these paths that this wraps around will show with the MainNavigation.js
      // header included.
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
         
       <Route path="/quotes" exact>
         <AllQuotes/>
       </Route> 

        <Route path="/quotes/:quoteDetail">
          <QuoteDetail/>
        </Route>

        <Route path="/addQuote">
          <AddQuote/>
        </Route>

      </Switch>
    </Layout>
  );
}

export default App;

