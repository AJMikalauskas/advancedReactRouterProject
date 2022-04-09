import { useRef,useState, Fragment } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  // state to determine whther a prompt should be shown begfore the user goes backto a different URL in the stack
  const [isEnteringInfo,setIsEnteringInfo] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const formFocusHandler = () => {
    // If the state of isEntered is true, run prompt to make sure user wants to exit page
      // Prompt self closing tag is below in JSX
      setIsEnteringInfo(true);
    console.log('FOCUSED!');
  }

  const finishEnteringHandler = () => 
  {
    // This fixes so that if you click add quote button, prompt doesn't show up because the state is set to false
      setIsEnteringInfo(false); 
  }

  return (
    <Fragment>
      {/* 2 props for Prompt tag. The 1st is the state in which the prompt is dependent on, shows is state is true
       The 2nd is the message that is shown on the prompt and a location param, he says it may be important
       even if i don't use it here -> search it up.*/}
      <Prompt when={isEnteringInfo} message={(location) => "Are you sure you want to leave? All entered data will be lost!"}/>
    <Card>
      <form onFocus={formFocusHandler} className={classes.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor='author'>Author</label>
          <input type='text' id='author' ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='text'>Text</label>
          <textarea id='text' rows='5' ref={textInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button onClick={finishEnteringHandler} className='btn'>Add Quote</button>
        </div>
      </form>
    </Card>
    </Fragment>
  );
};

export default QuoteForm;
