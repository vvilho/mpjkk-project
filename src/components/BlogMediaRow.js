/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Link as RouterLink} from 'react-router-dom';
// import {Grid, GridListTileBar, IconButton, makeStyles} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {useTag, useUsers, useFavorite, useComments} from '../hooks/ApiHooks';
import {useEffect, useState, useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
  paddingNumber: {
    paddingLeft: 10,
  },
  cardBottomNav: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  lines: {
    lineHeight: '1em',
  },
  paddingBox: {
    padding: '1em',
    marginLeft: '-1.9em',
  },
}));

const BlogMediaRow = ({file, ownFiles, history, deleteMedia}) => {
  const classes = useStyles();
  const [owner, setOwner] = useState(null);
  const [avatar, setAvatar] = useState();
  const {getUserById} = useUsers();
  const {getTag} = useTag();
  const {postFavorite} = useFavorite();
  const {deleteFavorite} = useFavorite();
  const [fav, setFav] = React.useState(false);
  const {getFavoriteById} = useFavorite();
  // const {getFavorite} = useFavorite();
  const [user] = useContext(MediaContext);
  const [likes, setLikes] = useState();
  const {getCommentById} = useComments();
  const [comments, setComments] = useState(0);

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
          console.log('amount of likes result2', result2.length);
        });
      } catch (e) {
        console.log(e.message);
      }

      try {
        const result3 = await getCommentById(file.file_id);
        console.log('amount of comments result3', result3.length);
        setComments(result3.length);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  const likingsAmount = async () => {
    try {
      const result2 = await getFavoriteById(file.file_id);
      console.log('result2 length', result2.length);
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
    }
  };

  let desc = {}; // jos kuva tallennettu ennen week4C, description ei ole JSONia
  try {
    desc = JSON.parse(file.description);
  } catch (e) {
    desc = {description: file.description};
  }

  if (file.media_type === 'image') file.media_type = 'img';

  return (
    <Card className={classes.root} variant="outlined">
      <Box display="flex">
        <Box>
          <CardHeader
            avatar={
              <Avatar
                variant={'circle'}
                src={avatar}
                aria-label="avatar"
                className={classes.avatar}
              >

              </Avatar>
            }
          />
        </Box>
        <Box className={classes.paddingBox}>
          <Typography gutterBottom variant="h6" component="h2" className={classes.lines}>
            {file.title}
          </Typography>
          <Typography className={classes.lines}>
            {owner?.full_name}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button color="secondary" size="small">
          #{desc.hashtag}
        </Button>
      </Box>
      <CardMedia
        className={classes.media}
        image={uploadsUrl + file.thumbnails?.w320}
        alt={file.title}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        >
          <div style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '11rem'}}>
            {ownFiles || desc.description}
          </div>
        </Typography>
      </CardContent>
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
            <Button
              aria-label={`info about ${file.title}`}
              component={RouterLink}
              to={{
                pathname: '/blogsingle',
                state: file,
              }}
              className={classes.icon}
              color="secondary"
            >
              Read more
            </Button>
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
              <Typography
                className={classes.paddingNumber}>
                {comments}
              </Typography>
            </IconButton>
          </Box>
        </div>
      </CardActions>
    </Card>
  );
};

BlogMediaRow.propTypes = {
  file: PropTypes.object,
  ownFiles: PropTypes.bool,
  history: PropTypes.object,
  deleteMedia: PropTypes.func,
};

export default withRouter(BlogMediaRow);

