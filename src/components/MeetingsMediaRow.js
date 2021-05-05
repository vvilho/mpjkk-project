/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Moment from 'react-moment';
import {Paper, Avatar, CardContent, CardHeader, Card, Grid, Button, IconButton, CardActions} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {useTag} from '../hooks/ApiHooks';
// import {Grid, GridListTileBar, IconButton, makeStyles} from '@material-ui/core';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import RoomIcon from '@material-ui/icons/Room';
import dateFormat from 'dateformat';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    Width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    marginLeft: '-1em',
    marginRight: '-1em',
    marginTop: '-1em',
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

  card: {
    width: '100%',
  },
  top: {
    marginBottom: '-1.5em',
  },
}));

const MeetingsMediaRow = ({file, ownFiles, history, deleteMedia}) => {
  const classes = useStyles();
  const [avatar, setAvatar] = useState();
  const screenNarrow = useMediaQuery('(max-width:600px)');

  const {getTag} = useTag();

  useEffect(() => {
    // download profile picture for post makers
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
    })();
  }, []);

  // if meeting has already happened then show infotext.
  // Also if the meeting happening right now then show infotext.
  // And also if the meeting is going to happen in the future then show when
  const meetingHappened = () => {
    if (desc.time_end < (moment().format()).slice(0, -9)) {
      return (
        <Typography
          variant="subtitle2"
          style={{fontSize: '0.8em'}}>
          Happened
        </Typography>
      );
    } else if (desc.time_start < (moment().format()).slice(0, -9) && desc.time_end > (moment().format()).slice(0, -9)) {
      return (
        <Typography
          variant="subtitle2"
          style={{fontSize: '0.8em'}}>
          Happening right now
        </Typography>
      );
    } else {
      return <>
        <Typography
          variant="subtitle2"
          style={{fontSize: '0.8em'}}>
            Happening in&nbsp;
          <Moment fromNow ago>{desc.time_start}</Moment>
        </Typography>
      </>;
    }
  };

  let desc = {};
  try {
    desc = JSON.parse(file.description);
  } catch (e) {
    desc = {description: file.description};
  }

  if (file.media_type === 'image') file.media_type = 'img';

  return (
    <>

      <Grid
        container
        justify={'center'}
      >
        <Grid item xs={screenNarrow? 12 : 8}>
          <Card
            variant="outlined"
            classes={classes.card}
          >
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
            <Box
              display="flex"
            >
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
                <Typography
                  className={classes.lines}
                  style={{fontSize: '0.8em'}}
                >
                  {desc.owner}
                </Typography>
              </Box>
            </Box>
            <Paper
              style={{
                padding: '15px',
                margin: '0 8%',
                marginTop: '0.5em',
                height: 'auto',
              }}
              elevation={5}
            >
              <Grid

              >
                <CardMedia
                  className={classes.media}
                  image={uploadsUrl + file.filename}
                  alt={file.title}
                  component={RouterLink}
                  to={{
                    pathname: '/meetupssingle',
                    state: file,
                  }}
                />
              </Grid>
              <Typography
                variant="subtitle2"
                style={{fontSize: '1em', paddingTop: '0.5em'}}>
                <Moment
                  format={'dddd, MMMM D, yyyy'}
                  date={desc.time_start}
                />
              </Typography>
              <Typography
                variant="subtitle2"
                style={{fontSize: '1em'}}
              >
                From {dateFormat(desc.time_start, 'HH:MM')}
              </Typography>
              {meetingHappened()}
              <Grid
                container
                direction={'column'}
                alignItems={'center'}
                style={{
                  height: '60%',
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  style={{padding: '1em'}}>
                  <Grid
                    item
                  >
                    <RoomIcon />
                  </Grid>
                  <Grid
                    item
                  >
                    <Typography
                      gutterBottom
                      variant="h6"

                      component="h6"
                    >{desc.city}</Typography>
                  </Grid>
                </Box>
                <Grid
                  item
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{wordWrap: 'break-word', fontSize: '1.1em', marginBottom: '1em'}}
                  >
                    {desc.description.length > 100 ?
                desc.description.slice(0, 100) + '...' :
                desc.description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justify={'center'}
              >
                <CardActions>
                  <Button
                    aria-label={`info about ${file.title}`}
                    component={RouterLink}
                    to={{
                      pathname: '/meetupssingle',
                      state: file,

                    }}
                    className={classes.icon}
                    color="secondary"
                  >
            Read more
                  </Button>
                </CardActions>
              </Grid>
            </Paper>

            <CardContent>

            </CardContent>

          </Card>
        </Grid>
      </Grid>
    </>
  );
};

MeetingsMediaRow.propTypes = {
  file: PropTypes.object,
  ownFiles: PropTypes.bool,
  history: PropTypes.object,
  deleteMedia: PropTypes.func,
};

export default withRouter(MeetingsMediaRow);

