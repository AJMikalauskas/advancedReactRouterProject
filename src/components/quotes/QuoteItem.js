import { Link } from "react-router-dom";
import classes from "./QuoteItem.module.css";

const QuoteItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{`"${props.text}"`}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      {/* We know we get an id prop from the QuoteList.js and we know this id prop can be sent inot thie link here */}
        <Link className="btn" to={`/quotes/${props.id}`}>View Fullscreen</Link>
    </li>
  );
};

export default QuoteItem;
