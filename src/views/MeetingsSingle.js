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
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import BackButton from '../components/BackButton';
import {useTag, useUsers} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';

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
});

const MeetingsSingle = ({location}) => {
  const [owner, setOwner] = useState(null);
  const [avatar, setAvatar] = useState();
  const classes = useStyles();
  const {getUserById} = useUsers();
  const {getTag} = useTag();


  const file = location.state;
  let desc = {};
  try {
    desc = JSON.parse(file.description);
    console.log(desc);
  } catch (e) {
    desc = {description: file.description};
  }
  console.log(file.user_id);
  console.log('toimiiko');
  useEffect(() => {
    (async () => {
      try {
        const name =
          await getUserById(localStorage.getItem('token'), file.user_id);
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
              <Typography
                variant="subtitle6">
                {owner?.first_name +
              ' posted this meetup'}</Typography>
            </ListItem>
            <ListItem>
              <Grid
                direction={'column'}
              >
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
};

export default MeetingsSingle;
