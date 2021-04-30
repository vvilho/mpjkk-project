/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Avatar, CardHeader, Card, Grid, Button, Slider, IconButton} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DoneIcon from '@material-ui/icons/Done';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {useComments, useTag} from '../hooks/ApiHooks';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    Width: '100%',
  },
  media: {
    height: '50%',
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

const FundingsMediaRow = ({file, ownFiles, history, deleteMedia}) => {
  const classes = useStyles();
  const [avatar, setAvatar] = useState();
  const [donatedTotal, setDonatedTotal] = useState(0);
  const [donationDone, setDonationDone] = useState(false);
  const {getCommentById} = useComments(true, file.file_id);


  const {getTag} = useTag();

  const updateTotalFundings = async () => {
    const result = await getCommentById(file.file_id);
    let total = 0;
    if (result) {
      result.map((item) => {
        total += parseInt(JSON.parse(item.comment).comment, 10);
      });
      setDonatedTotal(total);
    }

    if (total >= parseInt(desc.money, 10)) {
      setDonationDone(true);
      console.log(donationDone);
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
        updateTotalFundings();
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);


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
        <Grid

        >
          <CardMedia
            className={classes.media}
            image={uploadsUrl + file.filename}
            alt={file.title}

          />
        </Grid>
        <Grid
          style={{
            padding: '15px',
          }}
        >
          <Grid>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{wordWrap: 'break-word'}}
              gutterBottom
            >
              {desc.description.length > 300 ?
                desc.description.slice(0, 300) + '...' :
                desc.description}
            </Typography>
          </Grid>
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
            >{donatedTotal+'€ raised of '}</Typography>
            <Typography
              variant="h7"

              component="h7"
            > {desc.money+'€'}</Typography>
          </Grid>

        </Grid>
        <Grid
          container
          direction={'column'}
          alignItems={'center'}
        >
          {donationDone &&
          <Grid
            item
            direction={'row'}
          >
            <Button
              disabled
              endIcon={<DoneIcon/>}
            >This donation is done</Button>

          </Grid>
          }
          <Grid item >
            <Button
              aria-label={`info about ${file.title}`}
              component={RouterLink}
              to={{
                pathname: '/fundingssingle',
                state: file,
              }}
              className={classes.icon}
              color="secondary"
            >
              Read more
            </Button>
          </Grid>

        </Grid>

      </Card>
    </>
  );
};

FundingsMediaRow.propTypes = {
  file: PropTypes.object,
  ownFiles: PropTypes.bool,
  history: PropTypes.object,
  deleteMedia: PropTypes.func,
};

export default withRouter(FundingsMediaRow);

