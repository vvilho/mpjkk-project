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
  appBar: {
    boxShadow: 'none',
    borderBottom: 'solid #47D378',
  },
  userName: {
    marginRight: '2vw',
    fontFamily: 'Roboto Mono',

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
  const wdth1000 = useMediaQuery('(min-width:1000px)');
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


  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const userdata = await getUser(token);
        // ver1 that works
        // setUser(userdata);

        // ver2 that doesn't work

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
                  <Typography variant="h6" className={classes.title}>
                    <Link
                      component={RouterLink}
                      to="/" color="inherit">Environmental Idealists</Link>
                  </Typography>
                </Grid>
                <Grid
                  item
                >

                  {user &&
                  <Typography
                    component="h4"
                    variant="h8"
                    className={classes.userName}

                  >{'Hi ' + user.first_name+'!'}</Typography>
                  }

                </Grid>

              </Grid>


              <Grid
                container
                direction={'row'}
                justify={'space-between'}

              >
                <Grid
                  item
                  xs={8}
                >
                  <Grid
                    container
                    justify={'space-around'}
                  >

                    <Grid
                      item
                    >
                      <Button
                        component={RouterLink}
                        to={'/'}
                        onClick={() => {
                          setGreen('1');
                        }}
                        classes={{
                          root: classes.siteButtonMobile,
                          label: classes.buttonLabel}}

                      >
                        <EmojiNature
                          color={green === '1' ? 'primary' : 'black'}

                        />Blog
                      </Button>
                    </Grid>

                    <Grid
                      item
                    >
                      <Button
                        classes={{
                          root: classes.siteButtonMobile,
                          label: classes.buttonLabel}}
                        component={RouterLink}
                        to={'/meetings'}
                        onClick={() => {
                          setGreen('2');
                        }}
                      >
                        <EmojiPeople
                          color={green === '2' ? 'primary' : 'black'}
                          style={{
                            marginRight: '0.5vw',
                          }}
                        />Meetings
                      </Button>
                    </Grid>

                    <Grid
                      item
                    >
                      <Button
                        classes={{
                          root: classes.siteButtonMobile,
                          label: classes.buttonLabel}}
                        component={RouterLink}
                        to={'/fundings'}
                        onClick={() => {
                          setGreen('3');
                        }}
                      >
                        <Euro
                          color={green === '3' ? 'primary' : 'black'}
                          style={{
                            marginRight: '0.5vw',
                          }}
                        />Fundings
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
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
              justify={wdth1000 ? 'center' : 'space-between'}
            >

              <Grid
                item
                container
                sm={3}
                direction={'row'}
                justify={'center'}

              >
                <Button
                  className={classes.siteButton}
                  component={RouterLink}
                  to={'/'}
                  onClick={() => {
                    setGreen('1');
                  }}

                >
                  <EmojiNature
                    color={green === '1' ? 'primary' : 'black'}
                    style={{
                      marginRight: '0.5vw',
                    }}
                  />Blog
                </Button>
              </Grid>

              <Grid
                item
                container
                sm={3}
                direction={'row'}
                justify={'center'}
              >
                <Button
                  className={classes.siteButton}
                  component={RouterLink}
                  to={'/meetings'}
                  onClick={() => {
                    setGreen('2');
                  }}
                >
                  <EmojiPeople
                    color={green === '2' ? 'primary' : 'black'}
                    style={{
                      marginRight: '0.5vw',
                    }}
                  />Meetings
                </Button>
              </Grid>
              <Grid
                item
                container
                sm={3}
                direction={'row'}
                justify={'center'}
              >
                <Button
                  className={classes.siteButton}
                  component={RouterLink}
                  to={'/fundings'}
                  onClick={() => {
                    setGreen('3');
                  }}
                >
                  <Euro
                    color={green === '3' ? 'primary' : 'black'}
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
              component={RouterLink}
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
          }}
        >
          <Grid
            xs={matches ? 4 : 12}
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
