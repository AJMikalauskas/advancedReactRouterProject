import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
// quoteDetail Id  is also sent into the addComment() api.js, get by using params useParams() from react-router-dom
  const params = useParams();
  console.log(params);

  const { sendRequest, status, error } = useHttp(addComment);

// Object destructuring from props, this is a function, but it's not in JSX, confused??? 
const { onAddedComment } = props;


  // This is supposed to show something in master component which is Comments.js
    // Once status is completed and no error, run this function??? 
  useEffect(() => {
    if(status === 'completed' && !error)
    {
      // This is a props in Comments.js, need to use useCallback in Comments.js for this so that infinite loop
        // isn't created. 
      onAddedComment();
    }
  }, [error, onAddedComment, status]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    // Remember that this is how you extract the value out of a ref
    const enteredText = commentTextRef.current.value;

    //  This is incorrect because he sends up commentData as first param and quoteId as second param
      // in the addComment method I see, only 1 param is sent up which is request Data whih just some properties such as commentData
        // change text to commentData

    //params.quoteDetail is the autogenerated cryptic key from google firebase.
      // could be more flexible by being sent via props instead of params
        // params solution: params.quoteDetail, props is the solution He uses
        // How is it different if i set commentData equal to enteredText  than to set it equal to 
          // an object which has a property of text set equal to the enteredText?????
    sendRequest({commentData: {text: enteredText}, quoteId: props.quoteId})
    // optional: Could validate here

    // send comment to server
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {/* Show Loading Spinner if the status is still loading or at pending state. */}
      {status === 'pending' && <div className='centered'><LoadingSpinner/></div>}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
