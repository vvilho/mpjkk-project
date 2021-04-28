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
} from '@material-ui/core';
import {useTag, useUsers} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';
import React from 'react';
// import {useContext} from 'react';
// import {MediaContext} from '../contexts/MediaContext';

const CommentRow = ({file}) => {
  const {getUserById} = useUsers();
  const {getTag} = useTag();
  // const {getFavorite} = useFavorite();
  // const [user] = useContext(MediaContext);
  const [avatar, setAvatar] = useState();
  // const [commentOwner, setCommentOwner] = useState();
  // const [commentTime, setCommentTime] = useState();

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

      try {
        const result1 = await getUserById(localStorage.getItem('token'), file.user_id);
        console.log('result1 getUSerByID', result1);
        setOwner(result1.full_name);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);


  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>
          {file.time_added}
        </Typography>
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
          Posted by: {file.owner}
          </Typography>
        </Box>
        <Typography gutterBottom>{file.comment}</Typography>
      </CardContent>
    </Card>
  );
};

CommentRow.propTypes = {
  file: PropTypes.object,
};

export default CommentRow;
