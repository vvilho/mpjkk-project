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

  CloudUpload,
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
    marginRight: theme.spacing(2),
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
    'height': '64px',
    'width': '100%',

  },


}));


const Nav = ({history}) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');
  const [user, setUser] = useContext(MediaContext);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const {getUser} = useUsers();
  console.log(user);

  const toggleDrawer = (opener) => () => {
    setOpen(opener);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const userdata = await getUser(token);
        // ver1 that works
        setUser(userdata);
        // ver2 that doesn't work
        // const data = {
        //   email: userdata.user.email,
        //   full_name: userdata.user.full_name,
        //   first_name: JSON.parse( userdata.user.full_name).first_name,
        //   last_name: JSON.parse( userdata.user.full_name).last_name,
        //   user_id: userdata.user.user_id,
        //   username: userdata.user.username,
        // };
        // setUser(data);

        alert(JSON.stringify(userdata));
        console.log(userdata);
        alert(data);
      } catch (e) {
        // send to login
        history.push('/');
      }
    };

    checkUser();
  }, []);

  return (
    <>
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
            sm={7}
            container
            direction={'row'}
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

              >
                <EmojiNature
                  color="primary"
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
              >
                <EmojiPeople
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
            sm={2}
            container
            direction={'row'}
          >


            {user &&
            <Grid
              item
              sm={10}
            >
              <Typography
                component="h4"
                variant="h8"
                className={classes.userName}

              >{'Hi, ' + user.first_name}</Typography>
            </Grid>

            }
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
            <ListItem
              button
              component={RouterLink}
              onClick={toggleDrawer(false)}
              to="/blogupload"
            >
              <ListItemIcon>
                <CloudUpload/>
              </ListItemIcon>
              <ListItemText
                primary="BlogUpload"
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
                toggleDrawer(false);
                setModalOpen(!modalOpen);
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
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(!modalOpen);
            setOpen(!open);
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
                      setModalOpen(!modalOpen);
                      setOpen(!open);
                    }}
                  >
                    <CloseIcon/>
                  </IconButton>
                </Grid>

                <Login setModalOpen={setModalOpen} setOpen={setOpen}/>
              </Paper>
            </Grid>

          </Grid>


        </Modal>
      </Drawer>
    </>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};


export default withRouter(Nav);
