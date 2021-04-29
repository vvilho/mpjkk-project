/* eslint-disable max-len */
import useForm from '../hooks/FormHooks';
import {Button, Grid, CircularProgress, Typography} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import React from 'react';
import PropTypes from 'prop-types';

const CommentsForm = ({file, setComments, setShowAllComments, getCommentById, postComment, loading, user}) => {
  console.log('THIS PAGES ID IS: ' + file.file_id);

  const validators = {
    comment: ['minStringLength: 1'],
  };

  const errorMessages = {
    comment: ['vähintään 1 merkkiä'],
  };

  const doComments = async () => {
    try {
      console.log('check', inputs.comment);
      console.log('comments lomake lähtee');
      const result = await postComment(localStorage.getItem('token'), file.file_id, inputs, user.first_name);
      console.log('doComments', result);
      if (result) {
        const result2 = await getCommentById(file.file_id);
        setShowAllComments(result2);
        setComments(result2.length);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} =
    useForm(doComments, {
      comment: '',
    });


  return (
    <>
      <Grid
        container
        justify={'center'}
      >
        <Grid item xs={12}>
          <Typography
            component="h2"
            variant="h4"
            align={'center'}
            gutterBottom
            style={{
              marginTop: '2em',
            }}
          >
            Post a comment
          </Typography>
        </Grid>

        <Grid
          item
          xs={10}
          style={{
            marginTop: '1.5em',
          }}
        >
          {!loading ?
            <ValidatorForm
              onSubmit={handleSubmit}
            >
              <Grid
                container
                justify={'center'}
              >

                <Grid
                  item
                  xs={12}
                  style={{
                    marginBottom: '3vh',
                  }}
                >
                  <TextValidator
                    variant={'filled'}
                    multiline
                    fullWidth
                    type="text"
                    name="comment"
                    label="Comment"
                    value={inputs.comment}
                    onChange={handleInputChange}
                    validators={validators.comment}
                    errorMessages={errorMessages.comment}
                  />
                </Grid>

                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"

                >
                Comment
                </Button>
              </Grid>
            </ValidatorForm> :
              <CircularProgress/>
          }
        </Grid>
      </Grid>
    </>
  );
};

CommentsForm.propTypes = {
  file: PropTypes.object,
  setShowAllComments: PropTypes.func,
  getCommentById: PropTypes.func,
  postComment: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.object,
  setComments: PropTypes.func,
};

export default CommentsForm;
