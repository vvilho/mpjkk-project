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
} from '@material-ui/core';
import BackButton from '../components/BackButton';
import {useTag, useUsers, useFavorite, useComments} from '../hooks/ApiHooks';
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

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: '50vh',
  },
  cardBottomNav: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  paddingNumber: {
    paddingLeft: 10,
  },
});

const BlogSingle = ({location}) => {
  const [avatar, setAvatar] = useState();
  const classes = useStyles();
  const {getUserById} = useUsers();
  const {getTag} = useTag();
  const {postFavorite} = useFavorite();
  const {deleteFavorite} = useFavorite();
  const [fav, setFav] = React.useState(false);
  const {getFavoriteById} = useFavorite();
  // const {getFavorite} = useFavorite();
  const {user, setModalOpen, setModalOpenText} = useContext(MediaContext);
  const [likes, setLikes] = useState();
  const file = location.state;
  const {showAllComments, setShowAllComments, getCommentById, postComment, loading} = useComments(true, file.file_id);
  const [comments, setComments] = useState(0);

  let desc = {}; // jos kuva tallennettu ennen week4C, description ei ole JSONia
  try {
    desc = JSON.parse(file.description);
    // console.log(desc);
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

      try {
        const result3 = await getCommentById(file.file_id);
        console.log('amount of comments', result3.length);
        setComments(result3.length);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  const likingsAmount = async () => {
    try {
      const result2 = await getFavoriteById(file.file_id);
      console.log(result2.length);
      setLikes(result2.length);
    } catch (e) {
      console.log(e.message);
    }
  };

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

  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        gutterBottom
      >
        {file.title}
      </Typography>
      <Paper elevation={0}>
        <Card className={classes.root}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar variant={'circle'} src={avatar} />
              </ListItemAvatar>
              <Typography variant="subtitle2">{desc.owner}</Typography>
            </ListItem>
          </List>
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
      />
    </>
  );
};

BlogSingle.propTypes = {
  location: PropTypes.object,
};

export default BlogSingle;
