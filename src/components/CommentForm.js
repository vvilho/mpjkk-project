/* eslint-disable max-len */
import useForm from '../hooks/FormHooks';
import {useComments} from '../hooks/ApiHooks';
import {Button, Grid, CircularProgress, Typography} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import React from 'react';
import PropTypes from 'prop-types';

const CommentsForm = ({file}) => {
  const {postComment, loading} = useComments();

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
      const result = await postComment(localStorage.getItem('token'), file.file_id, inputs);
      console.log('doComments', result);
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
            component="h1"
            variant="h2"
            color={'primary'}
            align={'center'}
            gutterBottom
          >
            Post a comment
          </Typography>
        </Grid>

        <Grid
          item
          xs={10}
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
};

export default CommentsForm;
