import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  //params to send into the props of quoteId
  const params = useParams();

// Get all comments using api and use-http files as done previously, show new list of comments once page is loaded
  // or new comment is added/loaded, change in data/loadedComments
  const { sendRequest, status, data: loadedComments, error} = useHttp(getAllComments);

  // Need to run useEffect to ge this functionality as seen in above
    // getAllComments is the send Request function, expects the quoteId param
      // object destructure so that params isn't sent into the useEffect as a dependency
      const {quoteDetail} = params;
  useEffect(() => {
    sendRequest(quoteDetail);
  }, [quoteDetail,sendRequest])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  
  //function to handle info once status completed and no error in NewCommentForm.js
    // set to useCallback function so an infinite loop isn't created

    // what actually happens in this is that before adding the sendRequest and quoteDetail param,
      // you had to reload to see backend change on the frontend ->
        // This change to show backend changes directly in the frontend, no reload btn required.
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteDetail)
  },[sendRequest, quoteDetail]); 

  // if checks for the request based on status, error, and finally send loadedComments to JSX

  // Don't want to change the entire JSX to a loading spinner, just want to change
    // whether a list is shown, empty list is shown, or if a loading spinner is shown
      // dont by replacing comments... text with a let comments variable

  let comments;
  // LoadingSpinner import showing, pending status
  if(status === 'pending')
  {
    comments= (<div className='centered'>
      <LoadingSpinner/>
    </div>);
  };

  // If status is completed or fulfilled and loadedComments isn't null and length is greater than 0
    // expect comments back formatted to a list.
  if(status === 'completed' && loadedComments && loadedComments.length > 0)
  {
    // make sure to import CommentsList
    comments = <CommentsList comments={loadedComments} />;
  }

  //if status is completed or fulfilled and loadedComments is null or length is not greater than 0
    // expect error or no comments text back
  if(status === 'completed' && (!loadedComments || loadedComments.length === 0 ))
  {
    comments = <p className='centered'>No comments were added yet!</p>
  }


  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {/* set the props from NewCommentForm.js which includes the more flexibl quoteId to be sent into sendRequest
      and the onAddedComment function -> just transfer params to this file, not in NewCommentForm.js */}
      {isAddingComment && <NewCommentForm quoteId={params.quoteDetail} onAddedComment={addedCommentHandler} />}
      {/* <p>Comments...</p> */}
      {comments}
    </section>
  );
};

export default Comments;
