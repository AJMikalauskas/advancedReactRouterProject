import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
const AddQuote = () =>
{
    const history = useHistory();
    const addQuoteHandler = (quoteDataEntered) =>
    {
        console.log(quoteDataEntered);
        // This useHistory hook allows you to go to a new page or URL in the 'stack'
            // push allows you to go back for instance if you submitted a form
            // replace doesn't allow you to go back  to the previous page which can be seen if you submit a google form
            // and it won't let you go back to what you submitted and if you go back, redirection will take place.
        history.push('/quotes');
    }
    return <QuoteForm onAddQuote={addQuoteHandler}/>
};

export default AddQuote;