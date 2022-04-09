import {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
const AddQuote = () =>
{
    // sendRequest is the function returned from the useHttp function in the use-http custom hook file
        // status is also from the use-http file this is from the ...httpState
            // addQuote isn't actuall called in this function but is called in the sendRequest function
                // quoteDataEntered param is actually passed in to the addQuote from here
    const {sendRequest, status} = useHttp(addQuote)
    const history = useHistory();

    //useEffect() for status updates
    useEffect(() => {
        // This completed comes from the use-http file, only happens if success or error
        if(status === 'completed')
        {
            history.push('/quotes');
        }
        // history makes IDE want it in the useEffect dependency array, but it never changes , add anyway just so IDE error 
            // doesn't show -> won't matter anyways
    },[status, history])

    const addQuoteHandler = (quoteDataEntered) =>
    {
        console.log(quoteDataEntered);
        sendRequest(quoteDataEntered);
        // This useHistory hook allows you to go to a new page or URL in the 'stack'
            // push allows you to go back for instance if you submitted a form
            // replace doesn't allow you to go back  to the previous page which can be seen if you submit a google form
            // and it won't let you go back to what you submitted and if you go back, redirection will take place.
        
            //history.push('/quotes');
    }
    // isLoading is a props but what is sent in is a boolean based on whether the staut is pending or completed or not fulfilled yet.
        //isLoading is a spinner to show the loading state of when you add a quote
    return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
};

export default AddQuote;