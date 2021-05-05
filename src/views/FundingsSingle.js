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
  Box, CardMedia,
} from '@material-ui/core';
import BackButton from '../components/BackButton';
import {useComments, useTag} from '../hooks/ApiHooks';
import {useContext, useEffect, useState} from 'react';
import {useMedia} from '../hooks/ApiHooks';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {MediaContext} from '../contexts/MediaContext';
import DeleteIcon from '@material-ui/icons/Delete';
import dateFormat from 'dateformat';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
    marginBottom: '-1em',
  },
  donate: {
    margin: '1em',
    marginTop: '-1em',
  },
});

const FundingsSingle = ({location, ownFiles, history}) => {
  const file = location.state;
  const {user, setModalOpen, setModalOpenText} = useContext(MediaContext);
  const [avatar, setAvatar] = useState();
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donatedTotal, setDonatedTotal] = useState(0);
  const [donationDone, setDonationDone] = useState(false);
  const classes = useStyles();
  const {getTag} = useTag();
  const {postComment, getCommentById} = useComments(true, file.file_id);
  const {deleteMedia} =
    useMedia(true, true, 'EnvironmetalIdealist_fundingsproduction');
  const screenNarrow = useMediaQuery('(max-width:600px)');


  let desc = {};
  try {
    desc = JSON.parse(file.description);
  } catch (e) {
    desc = {description: file.description};
  }

  /**
   * Gets all donations made for the funding post
   * and calculates them together
   *
   * @async
   */
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

  /**
  * Sends donation form data to back-end
  *
  * @param {*} ammount takes in selected donation amount
  * @async
  *
  */
  const doDonateComment = async (ammount) => {
    try {
      console.log('donate lähtee');
      const result =
        await postComment(
            localStorage.getItem('token'),
            file.file_id,
            ammount,
            user.first_name,
            'donations');
      console.log('doComments', result);
      updateTotalFundings();
    } catch (e) {
      alert(e.message);
    }
  };


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


  if (user) {
    if (file.user_id === user.user_id) {
      ownFiles = true;
    }
  }

  if (file.media_type === 'image') file.media_type = 'img';

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
                  history.push('/fundings');
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
                <Typography>
              &nbsp;&middot;&nbsp;
                </Typography>
                <Typography>
                  {dateFormat(file.time_added, 'dd.mm.yyyy')}
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
            <CardContent>
              <Typography
                style={{padding: '1em  0'}}
              >
                {desc.description}
              </Typography>
            </CardContent>
            <ListItem>
              <Grid
                container
                direction={'column'}
                // eslint-disable-next-line max-len
                style={{marginBottom: '1em', padding: screenNarrow? '1em 0' : '1em 8%'}}
              >
                <Grid className={classes.donate}>
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
                  <Grid
                    style={{
                      paddingBottom: '10px',
                    }}
                  >
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
            <ListItem>
              <Typography variant="h5" style={{fontSize: '1.1em'}}>
                Organizer: {desc.organizer}
              </Typography>
            </ListItem>
          </List>
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
            xs={12}
            sm={8}
            md={5}
            lg={4}
            style={{
              paddingTop: '20%',
            }}

          >
            <Paper

            >
              <Grid
                container
                justify={'flex-end'}
              >
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
