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
import {red} from '@material-ui/core/colors';
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
  avatar: {
    backgroundColor: red[500],
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
}));

const BlogMediaRow = ({file, ownFiles, history, deleteMedia}) => {
  const classes = useStyles();

  let desc = {}; // jos kuva tallennettu ennen week4C, description ei ole JSONia
  try {
    desc = JSON.parse(file.description);
    console.log(desc);
  } catch (e) {
    desc = {description: file.description};
  }

  return (
    <Card
      className={classes.root}
      variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="avatar" className={classes.avatar}>
              R
          </Avatar>
        }
        className={classes.title}
        title={file.title}
        subheader="Minna Puujuuri"
      />
      <Box display="flex" justifyContent="flex-end">
        <Button color="secondary" size="small">
            #Handcrafts
        </Button>
      </Box>
      <CardMedia
        className={classes.media}
        image={uploadsUrl + file.thumbnails?.w320}
        alt={file.title}
      />
      <CardContent
        title={file.title}
        subheader={ownFiles || desc.description}
      >
        <Typography variant="body2" color="textSecondary" component="p">
          {ownFiles || desc.description}
        </Typography>
      </CardContent>
      <CardActions>
        <div className={classes.cardBottomNav}
        >
          <Box display="flex" justifyContent="center">
            <IconButton aria-label="add to favorites">
              <ThumbUpIcon />
              <Typography className={classes.paddingNumber}>3</Typography>
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              aria-label={`info about ${file.title}`}
              component={RouterLink}
              to={{
                pathname: '/single',
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
                pathname: '/single',
                state: file,
              }}
              className={classes.icon}
            >
              <ChatBubbleOutlineIcon />
              <Typography className={classes.paddingNumber}>3</Typography>
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
