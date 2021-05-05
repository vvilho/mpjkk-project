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
import DeleteIcon from '@material-ui/icons/Delete';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Link as RouterLink} from 'react-router-dom';
// import {Grid, GridListTileBar, IconButton, makeStyles} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {useTag, useFavorite, useComments} from '../hooks/ApiHooks';
import {useEffect, useState, useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import dateFormat from 'dateformat';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
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
  top: {
    marginBottom: '-1.5em',
  },
}));

const BlogMediaRow = ({file, ownFiles, history, deleteMedia}) => {
  const screenNarrow = useMediaQuery('(max-width:600px)');
  const classes = useStyles();
  const [avatar, setAvatar] = useState();
  const {getTag} = useTag();
  const {postFavorite} = useFavorite();
  const {deleteFavorite} = useFavorite();
  const [fav, setFav] = React.useState(false);
  const {getFavoriteById} = useFavorite();
  // const {getFavorite} = useFavorite();
  const {user, setModalOpen, setModalOpenText} = useContext(MediaContext);
  const [likes, setLikes] = useState();
  const {getCommentById} = useComments();
  const [comments, setComments] = useState(0);


  useEffect(() => {
    // download profile images of the user who made the post

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
      // if user is logged in check if user likes the post and change color of the like button
      try {
        const result2 = await getFavoriteById(file.file_id);
        // console.log('setFav to', result2);

        result2.forEach((element) => {
          if (user) {
            if (element.user_id === user.user_id) {
              setFav(true);
            }
          }
          setLikes(result2.length);
          // console.log('amount of likes result2', result2.length);
        });
      } catch {
      }
      // count how many comments post has
      try {
        const result3 = await getCommentById(file.file_id);

        setComments(result3.length);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [user]);

  // set how many liking post has
  const likingsAmount = async () => {
    try {
      const result2 = await getFavoriteById(file.file_id);
      // console.log('result2 length', result2.length);
      setLikes(result2.length);
    } catch (e) {
      console.log(e.message);
    }
  };
  // if user likes a post then do this
  const handleFav = async () => {
    if (user) {
      setFav(!fav);
      try {
        if (fav == false) {
          // console.log('add fav');
          await postFavorite(localStorage.getItem('token'), file.file_id);
          likingsAmount();
        } else {
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

  let desc = {};
  try {
    desc = JSON.parse(file.description);
  } catch (e) {
    desc = {description: file.description};
  }

  if (file.media_type === 'image') file.media_type = 'img';

  return (
    <Grid
      container
      justify={'center'}
    >
      <Grid item xs={screenNarrow? 12 : 8}>
        <Card className={classes.root} variant="outlined">
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
                  deleteMedia(file.file_id, localStorage.getItem('token'));
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
              <Typography gutterBottom variant="h5" component="h2" className={classes.lines}>
                {file.title}
              </Typography>
              <Typography className={classes.lines}
                style={{fontSize: '0.8em'}}>
                {desc.owner}&nbsp;&middot;&nbsp;{dateFormat(file.time_added, 'dd.mm.yyyy')}
              </Typography>
            </Box>
          </Box>
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
            className={classes.media}
            image={uploadsUrl + file.thumbnails?.w320}
            alt={file.title}
            component={RouterLink}
            to={{
              pathname: '/blogsingle',
              state: file,
            }}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{wordWrap: 'break-word', fontSize: '1.1em'}}
            >
              {ownFiles || desc.description.length > 200 ?
                desc.description.slice(0, 200) + '...' :
                desc.description}
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
                  ownFiles={ownFiles}
                >
              Read more
                </Button>
              </Box>
              <Box display="flex" justifyContent="center">
                <IconButton
                  aria-label={`comments of ${file.title}`}
                  component={RouterLink}
                  ownFiles={ownFiles}
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
      </Grid>
    </Grid>
  );
};

BlogMediaRow.propTypes = {
  file: PropTypes.object,
  ownFiles: PropTypes.bool,
  history: PropTypes.object,
  deleteMedia: PropTypes.func,
};

export default withRouter(BlogMediaRow);

