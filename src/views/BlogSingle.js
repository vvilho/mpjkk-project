/* eslint-disable max-len */
import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  CardMedia, List, ListItem, ListItemAvatar,
  makeStyles,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';
import BackButton from '../components/BackButton';
import {useTag, useFavorite, useComments} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import CommentTable from '../components/CommentTable';
import DeleteIcon from '@material-ui/icons/Delete';
import {useMedia} from '../hooks/ApiHooks';
import dateFormat from 'dateformat';
// import useMediaQuery from '@material-ui/core/useMediaQuery';


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
    marginBottom: '-1em',
  },
});

const BlogSingle = ({location, ownFiles, history}) => {
  const [avatar, setAvatar] = useState();
  const classes = useStyles();
  const {getTag} = useTag();
  const {postFavorite} = useFavorite();
  const {deleteFavorite} = useFavorite();
  const [fav, setFav] = React.useState(false);
  const {getFavoriteById} = useFavorite();
  // const {getFavorite} = useFavorite();
  const {user, setModalOpen, setModalOpenText} = useContext(MediaContext);
  const [likes, setLikes] = useState();
  const file = location.state;
  const {showAllComments, setShowAllComments, getCommentById, postComment, loading, deleteComment} = useComments(true, file.file_id);
  const [comments, setComments] = useState(0);
  const {deleteMedia} =
    useMedia(true, true, 'EnvironmetalIdealist_blogproduction');

  let desc = {};
  try {
    desc = JSON.parse(file.description);
  } catch (e) {
    desc = {description: file.description};
  }

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

      /**
   * Loads liked posts, gets the length of the likes
   * ,sets likes amount and changes the color to green
   * if user has liked the post or gray if hasn't
   *
   * @async
   */
      try {
        const result2 = await getFavoriteById(file.file_id);
        console.log('setFav to', result2);
        result2.forEach((element) => {
          if (user) {
            if (element.user_id === user.user_id) {
              setFav(!fav);
            }
          }
          setLikes(result2.length);
        });
      } catch (e) {
        console.log(e.message);
      }

      /**
   * Loads all comments of a post and gets the amount
   * of comments of a post
   *
   * @async
   */
      try {
        const result3 = await getCommentById(file.file_id);
        console.log('amount of comments', result3.length);
        setComments(result3.length);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  /**
   * Loads liked posts, gets the length of the likes
   * and sets likes amount
   *
   * @async
   */
  const likingsAmount = async () => {
    try {
      const result2 = await getFavoriteById(file.file_id);
      console.log(result2.length);
      setLikes(result2.length);
    } catch (e) {
      console.log(e.message);
    }
  };

  /**
   * Add or delete likes functionality, when user is logged in,
   * and sets likings icon to green or gray. If user is not logged in
   * user is quided to log in to like a post.
   *
   * @async
   */
  const handleFav = async () => {
    if (user) {
      setFav(!fav);
      try {
        if (fav == false) {
          console.log('add fav');
          await postFavorite(localStorage.getItem('token'), file.file_id);
          likingsAmount();
        } else {
          // or delete it from firestore
          console.log('delete fav');
          await deleteFavorite(localStorage.getItem('token'), file.file_id);
          likingsAmount();
        }
      } catch (e) {
        console.log(e.message);
      }
    } else {
      setModalOpen(true);
      setModalOpenText('Login or register to like a post');
    };
  };


  if (file.media_type === 'image') file.media_type = 'img';

  if (user) {
    if (file.user_id === user.user_id) {
      ownFiles = true;
    }
  }

  const delPost = async () => {
    try {
      await deleteMedia(file.file_id, localStorage.getItem('token'));
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <BackButton />
      <Box
        display="flex"
        justifyContent="center"
      >
        <Typography
          component="h1"
          variant="h2"
          gutterBottom
        >
          {file.title}
        </Typography>
      </Box>
      <Paper elevation={0}>
        <Card className={classes.root}>
          <Box>
            {ownFiles &&
        <Box display="flex" justifyContent="flex-end" className={classes.top}>
          <IconButton
            aria-label={`delete file`}
            className={classes.icon}
            onClick={() => {
              try {
                const conf = confirm('Do you really want to delete?');
                if (conf) {
                  delPost();
                  history.push('/');
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
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar variant={'circle'} src={avatar} />
              </ListItemAvatar>
              <Typography>{desc.owner}</Typography>
              <Typography>
              &nbsp;&middot;&nbsp;
              </Typography>
              <Typography>
                {dateFormat(file.time_added, 'dd.mm.yyyy')}
              </Typography>
            </ListItem>
          </List>
          <Box
            display="flex"
            justifyContent="flex-end"
            style={{
              marginRight: '0.7em',
            }}>
            <Button color="secondary" size="small" disabled>
          #{desc.hashtag.slice(0, -9)}
            </Button>
          </Box>
          <CardMedia
            component={file.media_type}
            controls
            className={classes.media}
            image={uploadsUrl + file.filename}
            title={file.title}
          />
          <CardActions>
            <div className={classes.cardBottomNav}>
              <Box display="flex" justifyContent="center">
                {fav &&
              <IconButton
                aria-label="remove from favorites"
                onClick={() => handleFav()}
              >
                <ThumbUpIcon color="primary" />
                <Typography className={classes.paddingNumber}>
                  {likes}
                </Typography>
              </IconButton>
                }
                {!fav &&
              <IconButton
                aria-label="add to favorites"
                onClick={() => handleFav()}
              >
                <ThumbUpIcon />
                <Typography className={classes.paddingNumber}>
                  {likes}
                </Typography>
              </IconButton>
                }
              </Box>
              <Box display="flex" justifyContent="center">
                <IconButton
                  aria-label={`comments of ${file.title}`}
                  component={RouterLink}
                  to={{
                    pathname: '/blogsingle',
                    state: file,
                  }}
                  className={classes.icon}
                >
                  <ChatBubbleOutlineIcon />
                  <Typography className={classes.paddingNumber}>
                    {comments}
                  </Typography>
                </IconButton>
              </Box>
            </div>
          </CardActions>
          <CardContent>
            <Typography gutterBottom>{desc.description}</Typography>
          </CardContent>
        </Card>
      </Paper>
      <CommentTable
        file={file}
        setShowAllComments={setShowAllComments}
        getCommentById={getCommentById}
        postComment={postComment}
        loading={loading}
        user={user}
        showAllComments={showAllComments}
        setComments={setComments}
        deleteComment={deleteComment}
      />
    </>
  );
};

BlogSingle.propTypes = {
  location: PropTypes.object,
  ownFiles: PropTypes.bool,
  history: PropTypes.object,
};

export default BlogSingle;
