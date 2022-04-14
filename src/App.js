import React, {Suspense} from 'react';
// react router dom runs in the browser
import { Route, Routes, Navigate, Link } from 'react-router-dom';

// use command "npm run build" to run an optimized production build instead of "npm start"
  // give instructions on installing server to preview production app on local machine
    // created files and put in build folder
      // read notes. But once you have everything, run "firebase deploy" to deploy it 
        // Stop deployment by "firebase hosting:disable" and delete in deployment history
          // on the google firebase hosting page

// Replaced by laszy loading import from react
//import NewQuote from './pages/NewQuote';
// import AllQuotes from './pages/AllQuotes';
// import QuoteDetail from './pages/QuoteDetail';
// import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import Comments from './components/comments/Comments';
import LoadingSpinner from './components/UI/LoadingSpinner';

function App() {
  // interesting code here with a lazy method in React import,
    // passes in anonymous function with import as a function/method which takes
      // in a URL of the NewQuote.

  //Lazy load all the components when there is lots of component pages.
    // If it's a main page such as the AllQuotes page, lazy loading isn't necessary
      // but use it anyway since the user can start on the add quote page 
        //or <NewQuote/> component.
  const NewQuote = React.lazy(() => import('./pages/NewQuote'));
  const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
  const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
  const NotFound = React.lazy(() => import("./pages/NotFound"));

  return (
    <Layout>
      {/* fallback is the JSX that is shown while the lazy loading components is taking its
      time to load the component of NewQuote */}
      <Suspense fallback={
        <div className='centered'>
          <LoadingSpinner/>
        </div>
      }>
      <Routes>
        <Route path='/' element={<Navigate replace to='/quotes' />} />
        <Route path='/quotes' element={<AllQuotes />} />
        <Route path='/quotes/:quoteId' element={<QuoteDetail />}>
          <Route
            path=''
            element={
              <div className='centered'>
                <Link className='btn--flat' to={`comments`}>
                  Load Comments
                </Link>
              </div>
            }
          />
          <Route path={`comments`} element={<Comments />} />
        </Route>
        <Route path='/new-quote' element={<NewQuote />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
