/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Moment from 'react-moment';

import {Paper, Avatar, CardContent, CardHeader, Card, Grid, Button, IconButton} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';


import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {useTag} from '../hooks/ApiHooks';

// import {Grid, GridListTileBar, IconButton, makeStyles} from '@material-ui/core';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import RoomIcon from '@material-ui/icons/Room';
import dateFormat from 'dateformat';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    Width: '100%',
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

  const {getTag} = useTag();

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
    })();
  }, []);


  const meetingHappened = () => {
    if (desc.time_end < (moment().format()).slice(0, -9)) {
      return 'Happened';
    } else if (desc.time_start < (moment().format()).slice(0, -9) && desc.time_end > (moment().format()).slice(0, -9)) {
      return 'Happening right now';
    } else {
      return <>
        <Typography>Happening in</Typography>
        <Moment fromNow ago>{desc.time_start}</Moment></>;
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
    <>


      <Card
        variant="outlined"
        classes={classes.card}
        style={{
          height: '500px',
        }}

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
            <Typography gutterBottom variant="h6" component="h2" className={classes.lines}>
              {file.title}
            </Typography>
            <Typography>{desc.owner}</Typography>
          </Box>
        </Box>
        <Paper
          style={{
            padding: '15px',
            margin: '15px',
            height: '335px'
            ,
          }}
          elevation={5}
        >
          <Moment
            format={'DD/MM/YY'}
            date={desc.time_start}
          />
          <Typography
            variant="h6"

          >{dateFormat(desc.time_start, 'HH:MM')}</Typography>
          <Typography>{meetingHappened()}</Typography>


          <Grid
            container
            direction={'column'}
            alignItems={'center'}
            style={{
              height: '60%',
            }}
          >
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
              >{desc.zipcode}</Typography>
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
            <Grid
              item
            >
              <Typography
                variant="body2"
                color="textSecondary"
                style={{wordWrap: 'break-word'}}
              >
                {desc.description.length > 300 ?
                desc.description.slice(0, 300) + '...' :
                desc.description}
              </Typography>

            </Grid>
          </Grid>
          <Grid
            container
            justify={'center'}
          >
            <Button
              aria-label={`info about ${file.title}`}
              component={RouterLink}
              to={{
                pathname: '/meetingssingle',
                state: file,

              }}
              className={classes.icon}
              color="secondary"
            >
            Read more
            </Button>
          </Grid>
        </Paper>

        <CardContent>

        </CardContent>

      </Card>
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

