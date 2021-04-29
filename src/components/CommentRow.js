/* eslint-disable max-len */
import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CardHeader,
  IconButton,
} from '@material-ui/core';
import {useTag, useComments} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

const CommentRow = ({file, user}) => {
  const {getTag} = useTag();
  const [avatar, setAvatar] = useState();
  const [showMyComments, setShowMyComments] = useState(false);
  const {deleteComment} = useComments();

  useEffect(() => {
    (async () => {
      try {
        const result = await getTag('avatar_' + file.user_id);
        if (result.length > 0) {
          const image = result.pop().filename;
          setAvatar(uploadsUrl + image);
        }
      } catch (e) {
        console.log(e.message);
      }

      if (user) {
        if (user.user_id === file.user_id) {
          console.log('testing show my comments user');
          console.log('user id', user.user_id + 'comment id', file.user_id);
          setShowMyComments(true);
          console.log(showMyComments);
        }
      }
    })();
  }, []);

  return (
    <Card variant="outlined"
      style={{
        marginTop: '2em',
      }}>
      <CardContent>
        <Typography>
          {file.time_added}
        </Typography>
        <Box>
          {showMyComments &&
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            aria-label={`delete file`}
            onClick={() => {
              try {
                const conf = confirm('Do you really want to delete?');
                if (conf) {
                  deleteComment(localStorage.getItem('token'), file.comment_id);
                }
              } catch (e) {
                console.log(e.message);
              }
            }}
          >
            <DeleteIcon/>
          </IconButton>
        </Box>
          }
        </Box>
        <Box>
          <CardHeader
            avatar={
              <Avatar
                variant={'circle'}
                src={avatar}
                aria-label="avatar"
              >

              </Avatar>
            }
          />
          <Typography>
          Posted by: {JSON.parse(file.comment).owner}
          </Typography>
        </Box>
        <Typography gutterBottom>{JSON.parse(file.comment).comment.comment}</Typography>
      </CardContent>
    </Card>
  );
};

CommentRow.propTypes = {
  file: PropTypes.object,
  user: PropTypes.object,
};

export default CommentRow;
