import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {
  Avatar, Button,
  Card,
  CardContent,
  Grid, IconButton, List, ListItem, ListItemAvatar,
  makeStyles, Modal,
  Paper, Slider,
  Typography,
  Box,
} from '@material-ui/core';
import BackButton from '../components/BackButton';
import {useComments, useTag, useUsers} from '../hooks/ApiHooks';
import {useContext, useEffect, useState} from 'react';

import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {MediaContext} from '../contexts/MediaContext';
import DeleteIcon from '@material-ui/icons/Delete';


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
  top: {
    marginBottom: '-1.5em',
  },
});

const FundingsSingle = ({location, ownFiles, history}) => {
  const file = location.state;
  const {user, setModalOpen, setModalOpenText} = useContext(MediaContext);
  const [owner, setOwner] = useState(null);
  const [avatar, setAvatar] = useState();
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donatedTotal, setDonatedTotal] = useState(0);
  const [donationDone, setDonationDone] = useState(false);
  const classes = useStyles();
  const {getUserById} = useUsers();
  const {getTag} = useTag();
  const {postComment, getCommentById} = useComments(true, file.file_id);

  let desc = {};
  try {
    desc = JSON.parse(file.description);
  } catch (e) {
    desc = {description: file.description};
  }

  const updateTotalFundings = async () => {
    const result = await getCommentById(file.file_id);
    let total = 0;
    if (result) {
      console.log(result);

      result.map((item) => {
        total += parseInt(JSON.parse(item.comment).comment, 10);
      });
      console.log(total);

      setDonatedTotal(total);
      console.log(typeof(donatedTotal), typeof(parseInt(desc.money)));
      console.log(donatedTotal, parseInt(desc.money));
    }

    if (total >= parseInt(desc.money)) {
      setDonationDone(true);
    }
  };

  useEffect(() => {
    try {
      updateTotalFundings();
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  const doDonateComment = async (ammount) => {
    try {
      console.log('donate lähtee');
      const result =
        await postComment(
            localStorage.getItem('token'),
            file.file_id,
            ammount,
            user.first_name);
      console.log('doComments', result);
      updateTotalFundings();
    } catch (e) {
      alert(e.message);
    }
  };


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

  if (user) {
    if (file.user_id === user.user_id) {
      ownFiles = true;
    }
  }

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
                  value={donatedTotal}
                />
                <Grid>
                  <Typography
                    variant="h7"
                    component="h7"
                    style={{
                      fontWeight: 'bold',

                    }}
                  >{donatedTotal+'€ raised of'}</Typography>
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
                      disabled={donationDone}
                      onClick={() => {
                        if (user) {
                          setDonateModalOpen(true);
                        } else {
                          setModalOpen(true);
                          setModalOpenText(
                              'Login or register to donate to project');
                        }
                      }}
                    >
                      {donationDone ? 'Donation done' : 'Donate'}
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
        open={donateModalOpen}
        onClose={() => {
          setDonateModalOpen(false);
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

            >
              <Grid>
                <IconButton
                  onClick={() => {
                    setDonateModalOpen(false);
                  }}
                >
                  <CloseIcon/>
                </IconButton>
              </Grid>
              <Grid
                style={{
                  padding: '10vh 10vh',
                }}>


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
                    onClick={() => {
                      alert('in real version this ' +
                        'would forward you to nets etc.');
                      doDonateComment(10);
                      setDonateModalOpen(false);
                    }}
                  >
                  10€
                  </Button>
                  <Button
                    variant={'contained'}
                    color={'secondary'}
                    onClick={() => {
                      alert('in real version this ' +
                        'would forward you to nets etc.');
                      doDonateComment(20);
                      setDonateModalOpen(false);
                    }}
                  >
                  20€
                  </Button>
                  <Button
                    variant={'contained'}
                    color={'secondary'}
                    onClick={() => {
                      alert('in real version this ' +
                        'would forward you to nets etc.');
                      doDonateComment(50);
                      setDonateModalOpen(false);
                    }}
                  >
                  50€
                  </Button>
                </Grid>
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
  ownFiles: PropTypes.bool,
  history: PropTypes.object,
};

export default FundingsSingle;
