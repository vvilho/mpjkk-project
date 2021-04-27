/* eslint-disable max-len */
import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import {useTag, useUsers, useComments} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';
import React from 'react';
// import {useContext} from 'react';
// import {MediaContext} from '../contexts/MediaContext';

const CommentRow = ({file}) => {
  // const [owner, setOwner] = useState(null);
  // const [avatar, setAvatar] = useState();
  const {getUserById} = useUsers();
  const {getTag} = useTag();
  // const {getFavorite} = useFavorite();
  // const [user] = useContext(MediaContext);
  const {getCommentById} = useComments();
  const [showComment, setShowComment] = useState();

  let desc = {}; // jos kuva tallennettu ennen week4C, description ei ole JSONia
  try {
    desc = JSON.parse(file.description);
    console.log(desc);
  } catch (e) {
    desc = {description: file.description};
  }

  useEffect(() => {
    (async () => {
      try {
        setOwner(
            await getUserById(localStorage.getItem('token'), file.user_id),
        );
      } catch (e) {
        console.log(e.message);
      }

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
        const result3 = await getCommentById(file.file_id);
        console.log('show me comments', result3);
        result3.forEach((element) => {
          setShowComment(element.comment);
        });
        console.log('SHOW COMMENTS', showComment);
        if (result3 == 0) {
          console.log('NO COMMENTS FOR THIS POST');
          setShowComment('No comments');
        }
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);


  return (
    <Card>
      <CardContent>
        <Typography gutterBottom>{showComment}</Typography>
      </CardContent>
    </Card>
  );
};

CommentRow.propTypes = {
  file: PropTypes.object,
};

export default CommentRow;
