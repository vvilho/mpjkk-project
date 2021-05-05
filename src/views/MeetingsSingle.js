import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import {
  Avatar,
  Card,
  CardContent,
  Grid, List, ListItem, ListItemAvatar,
  makeStyles,
  Paper,
  Typography,
  Box,
  IconButton, CardMedia,
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import BackButton from '../components/BackButton';
import {useTag, useUsers} from '../hooks/ApiHooks';
import {useEffect, useState, useContext} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {MediaContext} from '../contexts/MediaContext';
import {useMedia} from '../hooks/ApiHooks';

import React from 'react';


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
  top: {
    marginBottom: '-1em',
  },
});

const MeetingsSingle = ({location, ownFiles, history}) => {
  const [avatar, setAvatar] = useState();
  const classes = useStyles();
  const {getUserById} = useUsers();
  const {getTag} = useTag();
  const {user} = useContext(MediaContext);
  const {deleteMedia} =
    useMedia(true, true, 'EnvironmetalIdealist_meetingsproduction');

  const file = location.state;
  let desc = {};
  try {
    desc = JSON.parse(file.description);
  } catch (e) {
    desc = {description: file.description};
  }

  useEffect(() => {
    (async () => {
      try {
        // eslint-disable-next-line max-len
        const name = await getUserById(localStorage.getItem('token'), file.user_id);
        setOwner(JSON.parse(name.full_name));
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
    })();
  }, []);

  if (user) {
    if (file.user_id === user.user_id) {
      ownFiles = true;
    }
  }

  if (file.media_type === 'image') file.media_type = 'img';


  /**
   * Formates the date and time
   *
   * @return {Object} formated and styled date and time
   */
  const timeFunction = () => {
    if (dateFormat(desc.time_start, 'dd.mm.yy') ===
      dateFormat(desc.time_end, 'dd.mm.yy')) {
      return (
        <>
          <Typography
            variant="h5"
          >When?</Typography>
          <Typography>
            {dateFormat(desc.time_start, 'dddd, dS') +
            ' of ' +
            dateFormat(desc.time_start, 'mmmm yyyy')
            }
          </Typography>
          <Typography
            variant={'h5'}
          >
            {dateFormat(desc.time_start, 'HH:MM')+

            ' --> '+dateFormat(desc.time_end, 'HH:MM')}
          </Typography>

        </>);
    } else {
      return (
        <>
          <Typography
            variant="h5"
          >When?</Typography>
          <Typography>
            {dateFormat(desc.time_start, 'dddd, dS') +
            ' of ' +
            dateFormat(desc.time_start, 'mmmm yyyy HH:MM')}
          </Typography>
          <Typography
            variant="h6"
          >To</Typography>
          <Typography>
            {dateFormat(desc.time_end, 'dddd, dS') +
            ' of ' +
            dateFormat(desc.time_end, 'mmmm yyyy HH:MM')}
          </Typography>
        </>
      );
    }
  };

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
                  history.push('/meetups');
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
            <Box style={{marginBottom: '0.5em'}}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant={'circle'} src={avatar} />
                </ListItemAvatar>
                <Typography
                  variant="subtitle6">
                  {desc.owner}
                </Typography>
              </ListItem>
            </Box>
            <Grid
            >
              <CardMedia
                component={file.media_type}
                controls
                className={classes.media}
                image={uploadsUrl + file.filename}
                title={file.title}
              />
            </Grid>
            <ListItem>
              <Grid
                direction={'column'}
              >
                {timeFunction()}

              </Grid>

            </ListItem>
            <ListItem>
              <Grid
                container
                alignItems={'center'}
                direction={'column'}
              >
                <Grid
                  item
                >
                  <RoomIcon
                    style={{
                      fontSize: '50px',
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography>{desc.address}</Typography>
                </Grid>

                <Grid item>
                  <Typography>{desc.zipcode}</Typography>
                </Grid>

                <Grid item>
                  <Typography>{desc.city}</Typography>

                </Grid>
              </Grid>
            </ListItem>
          </List>


          <CardContent>
            <Typography gutterBottom>{desc.description}</Typography>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

MeetingsSingle.propTypes = {
  location: PropTypes.object,
  ownFiles: PropTypes.bool,
  history: PropTypes.object,
};

export default MeetingsSingle;
