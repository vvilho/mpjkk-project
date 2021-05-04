/* eslint-disable max-len */
import {
  Card,
  List, ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import BackButton from '../components/BackButton';
import React from 'react';
// import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    paddingBottom: '2em',
  },
  media: {
    height: '100%',
    width: '100%',
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
  paperZero: {
    marginLeft: '-1.5em',
    marginRight: '-1.5em',
  },
});

const AboutUs = () => {
  const classes = useStyles();
  // const screenMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <BackButton />
      <Card
        variant="outlined"
        className={classes.root}>
        <List>
          <ListItem>
            <Typography
              component="h1"
              variant="h2"
              color="primary"
            >
          About us
            </Typography>
          </ListItem>
          <ListItem>
            <Typography gutterBottom>
                Lorem ipsum dolor sit amet, consectetur tempor
                adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur tempor temp
                adipiscing elit, sed do eiusmod tempor
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              component="h2"
              variant="h4"
            >
          Contact
            </Typography>
          </ListItem>
          <ListItem>
              Phone number 55 445 343
          </ListItem>
          <ListItem>
              Address eiusmod tempor
          </ListItem>
          <ListItem>
              email environemtal@idealist.com
          </ListItem>
        </List>
      </Card>
    </>
  );
};

export default AboutUs;
