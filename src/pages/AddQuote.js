import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
const AddQuote = () =>
{
    const history = useHistory();
    const addQuoteHandler = (quoteDataEntered) =>
    {
        console.log(quoteDataEntered);
        history.push('/quotes');
    }
    return <QuoteForm onAddQuote={addQuoteHandler}/>
};

export default AddQuote;