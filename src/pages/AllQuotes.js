import QuoteList from "../components/quotes/QuoteList";

export const DUMMY_QUOTES = [
  { id: "quote1", author: "Virgil", text: "Fortune Favors The Bold!" },
  {
    id: "quote2",
    author: "Nelson Mandela",
    text: "It always seems impossible until it's done!",
  },
];
const AllQuotes = () => {
  return (
    <div>
      {/* <h1>All Quotes!</h1> */}
      {/* Later this dummy data will be called from a backend and sent up via props */}
      <QuoteList quotes={DUMMY_QUOTES}/>
    </div>
  );
};

export default AllQuotes;
