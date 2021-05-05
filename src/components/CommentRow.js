/* eslint-disable max-len */
import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  ListItem,
  List,
  ListItemAvatar,
  IconButton,
  Grid,
  makeStyles,
} from '@material-ui/core';
import {useTag} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import dateFormat from 'dateformat';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: '100%',
    width: '100%',
  },
  cardBottomNav: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  paddingNumber: {
    paddingLeft: 10,
  },
  top: {
    marginTop: '-1em',
  },
});

const CommentRow = ({file, user, deleteComment, getCommentById, setComments, setShowAllComments}) => {
  const {getTag} = useTag();
  const [avatar, setAvatar] = useState();
  const [showMyComments, setShowMyComments] = useState(false);
  const classes = useStyles();
  const screenMobile = useMediaQuery('(max-width:600px)');

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
      // if user is logged in show deletion option for own comments
      if (user) {
        if (user.user_id === file.user_id) {
          setShowMyComments(true);
        }
      }
    })();
  }, []);

  const delComments = async () => {
    try {
      const result = await deleteComment(localStorage.getItem('token'), file.comment_id);
      if (result) {
        updateCommentList();
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const updateCommentList = async () => {
    try {
      const result2 = await getCommentById(file.file_id);
      setShowAllComments(result2);
      setComments(result2.length);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Grid
      container
      justify={'center'}
    >
      <Grid
        item
        xs={screenMobile? 12 : 8}
        style={{
          marginTop: '1.5em',
        }}
      >
        <Card variant="outlined" className={classes.root}>
          {showMyComments &&
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            aria-label={`delete file`}
            onClick={() => {
              try {
                const conf = confirm('Do you really want to delete?');
                if (conf) {
                  delComments();
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
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar variant={'circle'} src={avatar} small/>
              </ListItemAvatar>
              <Typography
                style={{
                  fontSize: '0.8em',
                }}>{JSON.parse(file.comment).owner}</Typography>
              <Typography>
                  &nbsp;&middot;&nbsp;
              </Typography>
              <Typography
                style={{
                  fontSize: '0.8em',
                }}
              >
                {dateFormat(file.time_added, 'dd.mm.yyyy, HH:MM')}
              </Typography>
            </ListItem>
          </List>
          <CardContent>
            <Typography gutterBottom>{JSON.parse(file.comment).comment.comment}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

CommentRow.propTypes = {
  file: PropTypes.object,
  user: PropTypes.object,
  deleteComment: PropTypes.func,
  setComments: PropTypes.func,
  getCommentById: PropTypes.func,
  setShowAllComments: PropTypes.func,
};

export default CommentRow;
