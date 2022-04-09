import {useEffect} from 'react';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
// export const DUMMY_QUOTES = [
//   { id: "quote1", author: "Virgil", text: "Fortune Favors The Bold!" },
//   {
//     id: "quote2",
//     author: "Nelson Mandela",
//     text: "It always seems impossible until it's done!",
//   },
// ];
const AllQuotes = () => {
    //Neatly the saem functionality and code as POST or adding a quote to the DB
        // status is pending right from the start, get when page loads which is the second param in useHttp
            //sendRequest, status, data, and error all come fromm the useHttp function reutnr statement
                // Remember to use useEffect()
    const { sendRequest, status, data: loadedQuotes, error } = useHttp(getAllQuotes, true);

    // Sends Request whenever the component renders 
    useEffect(() => {
        sendRequest();
    }, [sendRequest])

    // Show loadingState CSS JSX via the loadingspinner based on status
    if(status === 'pending')
    {
        return <div className='centered'>
            <LoadingSpinner/>
        </div>
    }

    // check if error and if there is an error, show it dynamically and with minor global css from index.css
    if(error)
    {
        return <p className='centered focused'>{error}</p>;
    }

    // If none of the other if statements hit and status is completed, but no quotes(!loadedQuotes or 
        // loadedQuotes length is 0), display NoQuotesFound.js
    if(status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0))
    {
        return <NoQuotesFound/>
    }

    // If none of these if statements hit, with no error and no empty/no length data, show the below JSX
        // of the loadedQuotes -> replaces dummy quotes and dummy quotes array
  return (
    <div>
      {/* <h1>All Quotes!</h1> */}
      {/* Later this dummy data will be called from a backend and sent up via props */}
      <QuoteList quotes={loadedQuotes}/>
    </div>
  );
};

export default AllQuotes;
