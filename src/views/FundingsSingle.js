import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {
  Avatar, Button,
  Card,
  CardContent,
  Grid, List, ListItem, ListItemAvatar,
  makeStyles, Modal,
  Paper, Slider,
  Typography,
} from '@material-ui/core';
import BackButton from '../components/BackButton';
import {useTag, useUsers} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';

import React from 'react';


const useStyles = makeStyles({
  root: {
    width: '100%',
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

const FundingsSingle = ({location}) => {
  const [owner, setOwner] = useState(null);
  const [avatar, setAvatar] = useState();
  const [modalOpen, setModalOpen] = useState(false);
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
                ' posted this funding project'}</Typography>
            </ListItem>
            <Grid
            >
              <img
                style={{
                  height: '100%',
                  width: '100%',
                }}
                src={uploadsUrl + file.filename}
                alt={file.title}
              />
            </Grid>
            <ListItem>

            </ListItem>
            <ListItem>
              <Grid
                container
                direction={'column'}
              >
                <Typography
                  variant="h6"

                  component="h6"
                >Donations</Typography>
                <Slider
                  valueLabelDisplay={'auto'}
                  min={0}
                  max={desc.money}
                  value={50}
                />
                <Grid>
                  <Typography
                    variant="h7"
                    component="h7"
                    style={{
                      fontWeight: 'bold',

                    }}
                  >150€ raised of</Typography>
                  <Typography
                    variant="h7"

                    component="h7"
                  > {' '+desc.money+'€'}</Typography>
                </Grid>
                <Grid
                  container
                  direction={'column'}
                  alignItems={'center'}
                >
                  <Grid
                    item>
                    <Button
                      variant={'contained'}
                      color={'secondary'}
                      onClick={() => {
                        setModalOpen(true);
                      }}
                    >
                      Donate
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
          </List>


          <CardContent>
            <Typography gutterBottom>{desc.description}</Typography>
          </CardContent>
        </Card>
      </Paper>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Grid
          container
          alignItems={'center'}
          justify={'center'}
        >

          <Grid
            item
            xs={4}

          >
            <Paper
              style={{
                margin: '10vh',
                padding: '10vh 10vh',
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                align={'center'}
                gutterBottom
              >Donate ammount</Typography>
              <Grid
                container
                justify={'space-evenly'}
              >
                <Button
                  variant={'contained'}
                  color={'secondary'}
                >
                  10€
                </Button>
                <Button
                  variant={'contained'}
                  color={'secondary'}
                >
                  20€
                </Button>
                <Button
                  variant={'contained'}
                  color={'secondary'}
                >
                  50€
                </Button>
              </Grid>

            </Paper>

          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

FundingsSingle.propTypes = {
  location: PropTypes.object,
};

export default FundingsSingle;
