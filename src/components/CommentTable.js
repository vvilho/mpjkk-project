/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React from 'react';
import CommentRow from './CommentRow';
import CommentForm from '../components/CommentForm';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  Typography,
  Grid,
  Card,
  CardContent,
} from '@material-ui/core';

const CommentTable = ({file, user, setComments, showAllComments, setShowAllComments, getCommentById, postComment, loading, deleteComment}) => {
  const screenMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      {user &&
      <CommentForm
        file={file}
        setShowAllComments={setShowAllComments}
        getCommentById={getCommentById}
        postComment={postComment}
        loading={loading}
        user={user}
        setComments={setComments}
      />
      }
      <Typography
        component="h2"
        variant="h4"
        align={'center'}
        gutterBottom
        style={{
          paddingTop: '2em',
        }}
      >
            Comments
      </Typography>
      {showAllComments.length > 0 ?
        showAllComments.map((item) =>
          <CommentRow
            key={item.file_id}
            file={item}
            user={user}
            deleteComment={deleteComment}
            setShowAllComments={setShowAllComments}
            getCommentById={getCommentById}
            setComments={setComments}
          />,
        ) :
        <>
          <Grid container justify={'center'}>
            <Grid item xs={screenMobile? 12 : 8}
              style={{
                marginTop: '1.5em',
              }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography>
                    No comments
                    {!user &&
                    ' (log in to post a comment)'
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      }
    </>
  );
};

CommentTable.propTypes = {
  file: PropTypes.object,
  setShowAllComments: PropTypes.func,
  getCommentById: PropTypes.func,
  postComment: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.object,
  showAllComments: PropTypes.func,
  setComments: PropTypes.func,
  deleteComment: PropTypes.func,
};

export default CommentTable;
