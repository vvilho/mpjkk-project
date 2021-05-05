import {Link as RouterLink} from 'react-router-dom';
import {useEffect, useContext, useState} from 'react';
import {useUsers} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {
  AppBar,
  IconButton,
  makeStyles,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link, Grid, Toolbar,
  Button,
  Modal, Paper, useMediaQuery,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import InfoIcon from '@material-ui/icons/Info';
import {
  EmojiNature,
  EmojiPeople,
  Euro,

} from '@material-ui/icons';
import Login from '../views/Login';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  menuButton: {
    color: 'black',
  },
  title: {
    flexGrow: 1,
    color: '#47D378',
    fontFamily: 'Roboto Mono',
  },
  titleMobile: {
    color: '#47D378',
    fontFamily: 'Roboto Mono',
    fontSize: '15px',
  },
  appBar: {
    boxShadow: 'none',
    borderBottom: 'solid #47D378',
  },
  userName: {
    marginRight: '2vw',
    fontFamily: 'Roboto Mono',

  },
  userNameMobile: {
    marginRight: '2vw',
    fontFamily: 'Roboto Mono',
    fontSize: '13px',

  },
  siteButton: {
    'fontFamily': 'Roboto Mono',
    'fontSize': '15px',
    'height': '64px',
    'width': '100%',
  },
  siteButtonMobile: {
    'fontFamily': 'Roboto Mono',
    'fontSize': '10px',
    'height': '64px',
    'width': '100%',
  },

  buttonLabel: {
    flexDirection: 'column',
  },


}));


const Nav = ({history}) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');
  const wdth850 = useMediaQuery('(min-width:850px)');

  const {
    user,
    setUser,
    modalOpen,
    setModalOpen,
    modalOpenText,
    setModalOpenText,

  } = useContext(MediaContext);
  const [open, setOpen] = useState(false);
  const [green, setGreen] = useState('');
  const {getUser} = useUsers();

  const toggleDrawer = (opener) => () => {
    setOpen(opener);
  };

  // check if user is logged in
  // (token matches the database) and set userdata object with user info
  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const userdata = await getUser(token);


        const data = {
          email: userdata.email,
          full_name: userdata.full_name,
          first_name: JSON.parse( userdata.full_name).first_name,
          last_name: JSON.parse( userdata.full_name).last_name,
          user_id: userdata.user_id,
          username: userdata.username,
        };
        setUser(data);
      } catch (e) {
        // send to login
        history.push('/');
      }
    };
    checkUser();
  }, []);


  // Check in which page user is and show the menu green
  useEffect(()=>{
    console.log(window.location.pathname);
    if (window.location.pathname === process.env.PUBLIC_URL+'/') {
      setGreen('1');
    } else if (window.location.pathname ===
      process.env.PUBLIC_URL+'/blogupload') {
      setGreen('1');
    } else if (window.location.pathname ===
      process.env.PUBLIC_URL+'/blogsingle') {
      setGreen('1');
    } else if (window.location.pathname ===
      process.env.PUBLIC_URL+'/meetups') {
      setGreen('2');
    } else if (window.location.pathname ===
      process.env.PUBLIC_URL+'/meetupssupload') {
      setGreen('2');
    } else if (window.location.pathname ===
      process.env.PUBLIC_URL+'/meetupssingle') {
      setGreen('2');
    } else if (window.location.pathname ===
      process.env.PUBLIC_URL+'/fundings') {
      setGreen('3');
    } else if (window.location.pathname ===
      process.env.PUBLIC_URL+'/fundingsupload') {
      setGreen('3');
    } else if (window.location.pathname ===
      process.env.PUBLIC_URL+'/fundingssingle') {
      setGreen('3');
    } else {
      setGreen('');
    }
  }, [window.location.pathname]);

  return (
    <>
      {!wdth850 ?
        <AppBar
          color={'white'}
          className={classes.appBar}
        >
          <Toolbar>
            <Grid
              container
              direction={'column'}
            >
              <Grid
                container
                direction={'row'}
                justify={'space-between'}
              >
                <Grid
                  item
                >
                  <Typography variant="h6" className={classes.titleMobile}>
                    <Link
                      component={RouterLink}
                      to="/" color="inherit">Environmental Idealists</Link>
                  </Typography>
                </Grid>
                <Grid
                  item
                  alignContent={'flex-end'}
                >

                  {user &&
                  <Typography
                    style={{
                      marginTop: '2px',
                    }}
                    component="h4"
                    variant="h8"
                    className={classes.userNameMobile}

                  >{'Hi ' + user.first_name+'!'}</Typography>
                  }

                </Grid>

              </Grid>


              <Grid
                container

              >
                <Grid
                  container
                  xs={10}
                  alignItems={'stretch'}
                >
                  <Grid
                    item
                    xs={4}
                    style={green === '1' ? {
                      backgroundColor: '#47D37859',
                    } :
                        {
                          backgroundColor: '',
                        }
                    }

                  >
                    <Button
                      component={RouterLink}
                      to={'/'}
                      color={green === '1' ? 'secondary' : 'black'}
                      classes={{
                        root: classes.siteButtonMobile,
                        label: classes.buttonLabel}}

                    >
                      <EmojiNature

                      />Blog
                    </Button>
                  </Grid>

                  <Grid
                    item
                    xs={4}
                    style={green === '2' ? {
                      backgroundColor: '#47D37859',
                    } :
                        {
                          backgroundColor: '',
                        }
                    }
                  >
                    <Button
                      classes={{
                        root: classes.siteButtonMobile,
                        label: classes.buttonLabel}}
                      color={green === '2' ? 'secondary' : 'black'}

                      component={RouterLink}
                      to={'/meetups'}


                    >
                      <EmojiPeople
                        style={{
                          marginRight: '0.5vw',
                        }}
                      />Meetups
                    </Button>
                  </Grid>

                  <Grid
                    item
                    xs={4}
                    style={green === '3' ? {
                      backgroundColor: '#47D37859',
                    } :
                        {
                          backgroundColor: '',
                        }
                    }
                  >
                    <Button
                      classes={{
                        root: classes.siteButtonMobile,
                        label: classes.buttonLabel}}
                      color={green === '3' ? 'secondary' : 'black'}
                      component={RouterLink}
                      to={'/fundings'}


                    >
                      <Euro
                        style={{
                          marginRight: '0.5vw',
                        }}
                      />Fundings
                    </Button>
                  </Grid>

                </Grid>

                <Grid
                  item
                  xs={2}
                  container
                  justify={'flex-end'}
                >

                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                  >
                    <MenuIcon />
                  </IconButton>

                </Grid>
              </Grid>


            </Grid>
          </Toolbar>
        </AppBar> :
        <AppBar
          color={'white'}
          className={classes.appBar}
        >
          <Toolbar>
            <Grid
              sm={3}
              container
              direction={'row'}
            >
              <Typography variant="h6" className={classes.title}>
                <Link
                  component={RouterLink}
                  to="/" color="inherit">Environmental Idealists</Link>
              </Typography>
            </Grid>

            <Grid
              sm={6}
              container
              direction={'row'}
              alignItems={'stretch'}
            >

              <Grid
                item
                container
                sm={4}
                direction={'row'}
                justify={'center'}
                style={green === '1' ? {
                  backgroundColor: '#47D37859',
                } :
                  {
                    backgroundColor: '',
                  }
                }

              >
                <Button
                  className={classes.siteButton}
                  component={RouterLink}
                  to={'/'}
                  color={green === '1' ? 'secondary' : 'black'}


                >
                  <EmojiNature
                    style={{
                      marginRight: '0.5vw',
                    }}
                  />Blog
                </Button>
              </Grid>

              <Grid
                item
                container
                sm={4}
                direction={'row'}
                justify={'center'}
                style={green === '2' ? {
                  backgroundColor: '#47D37859',
                } :
                  {
                    backgroundColor: '',
                  }
                }
              >
                <Button
                  className={classes.siteButton}
                  component={RouterLink}
                  to={'/meetups'}
                  color={green === '2' ? 'secondary' : 'black'}


                >
                  <EmojiPeople
                    style={{
                      marginRight: '0.5vw',
                    }}
                  />Meetups
                </Button>
              </Grid>
              <Grid
                item
                container
                sm={4}
                direction={'row'}
                justify={'center'}
                style={green === '3' ? {
                  backgroundColor: '#47D37859',
                } :
                  {
                    backgroundColor: '',
                  }
                }

              >
                <Button
                  className={classes.siteButton}
                  component={RouterLink}
                  to={'/fundings'}
                  color={green === '3' ? 'secondary' : 'black'}

                >
                  <Euro
                    style={{
                      marginRight: '0.5vw',
                    }}
                  />Fundings
                </Button>
              </Grid>
            </Grid>
            <Grid
              sm={3}
              container
              direction={'row'}
            >


              <Grid
                container
                sm={10}
                alignContent={'center'}
                justify={'flex-end'}
              >

                {user &&
                <Typography
                  component="h4"
                  variant="h8"
                  className={classes.userName}

                >{'Hi ' + user.first_name+'!'}</Typography>
                }

              </Grid>


              <Grid
                item
                sm={2}
              >
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>

            </Grid>
          </Toolbar>
        </AppBar>
      }
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor={'right'}

      >
        <List
          className={classes.typography}
        >
          <ListItem
            button
            component={RouterLink}
            onClick={toggleDrawer(false)}
            to="/"
          >
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText
              primary="Home"
              disableTypography
              className={classes.typography}
            />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            onClick={toggleDrawer(false)}
            to="/aboutus"
          >
            <ListItemIcon>
              <InfoIcon/>
            </ListItemIcon>
            <ListItemText
              primary="About us"
              disableTypography
              className={classes.typography}
            />
          </ListItem>

          {user &&
          <>
            <ListItem
              button
              component={RouterLink}
              onClick={toggleDrawer(false)}
              to="/profile"
            >
              <ListItemIcon>
                <AccountBoxIcon/>
              </ListItemIcon>
              <ListItemText
                primary="Profile"
                disableTypography
                className={classes.typography}
              />
            </ListItem>

          </>
          }


          {user ?
            <ListItem
              button
              component={RouterLink}
              onClick={toggleDrawer(false)}
              to="/logout"
            >
              <ListItemIcon>
                <ExitToAppIcon/>
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                disableTypography
                className={classes.typography}
              />
            </ListItem> :
            <ListItem
              button
              onClick={() => {
                setOpen(false);
                setModalOpen(true);
              }}

            >
              <ListItemIcon>
                <ExitToAppIcon/>
              </ListItemIcon>
              <ListItemText
                primary="Login"
                disableTypography
                className={classes.typography}
              />
            </ListItem>
          }

        </List>
      </Drawer>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalOpenText('');
        }}
        aria-labelledby="Login/register modal"
        aria-describedby="Log in or register "
      >
        <Grid
          justify={'center'}
          container
          alignContent={'center'}
          style={{
            outline: 'none',
            paddingTop: '5vw',
          }}
        >
          <Grid
            xs={matches ? 4 : 12}
            sm={7}
            md={5}
            lg={4}
          >
            <Paper
              elevation={3}
              style={{
                padding: '50px',
              }}
            >
              <Grid
                container
                item
                justify={'flex-end'}
              >
                <IconButton
                  onClick={() => {
                    setModalOpen(false);
                    setModalOpenText('');
                  }}
                >
                  <CloseIcon/>
                </IconButton>
              </Grid>

              <Typography
                align={'center'}
              >{modalOpenText}</Typography>
              <Login setModalOpen={setModalOpen} />
            </Paper>
          </Grid>

        </Grid>


      </Modal>
    </>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};


export default withRouter(Nav);
