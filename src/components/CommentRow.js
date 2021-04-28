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
import {useTag} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';
import React from 'react';
// import {useContext} from 'react';
// import {MediaContext} from '../contexts/MediaContext';
// {JSON.parse(file.comment).owner}
// {JSON.parse(file.comment).comment}

const CommentRow = ({file}) => {
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
      console.log('JSON PARSE OWNER ', JSON.parse(file.comment).comment.comment);
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
};

export default CommentRow;
