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
  Drawer, List, ListItem, ListItemIcon, ListItemText, Link, Grid, Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {AccountBalance, CloudUpload, Group, Polymer} from '@material-ui/icons';


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
  typography: {
    fontFamily: 'Roboto Mono',
  },

  hover: {
    'height': '64px',

    '&:hover': {
      background: '#efefef',
    },
  },

}));


const Nav = ({history}) => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const [open, setOpen] = useState(false);
  const {getUser} = useUsers();

  const toggleDrawer = (opener) => () => {
    setOpen(opener);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = await getUser(token);
        setUser(userData);
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

          <Typography variant="h6" className={classes.title}>
            <Link
              component={RouterLink}
              to="/" color="inherit">Environmental Idealists</Link>
          </Typography>
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
              alignContent={'center'}
              className={classes.hover}

            >
              <Polymer
                style={{
                  marginRight: '0.5vw',
                }}
              />
              <Typography
                className={classes.typography}
              >Blog</Typography>
            </Grid>
            <Grid
              item
              container
              sm={3}
              direction={'row'}
              justify={'center'}
              alignContent={'center'}
              className={classes.hover}

            >
              <Group
                style={{
                  marginRight: '0.5vw',
                }}
              />
              <Typography
                className={classes.typography}
              >Meetings</Typography>
            </Grid>
            <Grid
              item
              container
              sm={3}
              direction={'row'}
              justify={'center'}
              alignContent={'center'}

              className={classes.hover}

            >
              <AccountBalance
                style={{
                  marginRight: '0.5vw',
                }}
              />
              <Typography
                className={classes.typography}
              >Fundings</Typography>
            </Grid>
          </Grid>

          {user &&
          <Typography
            component="h4"
            variant="h8"
            className={classes.userName}

          >{'Hi, ' + user.full_name}</Typography>
          }

          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
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
              to="/upload"
            >
              <ListItemIcon>
                <CloudUpload/>
              </ListItemIcon>
              <ListItemText
                primary="Upload"
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
              onClick={toggleDrawer(false)}
              to="/login"
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
    </>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};


export default withRouter(Nav);
