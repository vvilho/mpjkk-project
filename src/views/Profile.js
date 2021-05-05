import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  List,
  ListItem, ListItemAvatar,
  ListItemIcon, ListItemText, Modal,
  Typography,
  Paper,
  Box, IconButton,
  Link,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import BackButton from '../components/BackButton';
import {Link as RouterLink} from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import AvatarForm from '../components/AvatarForm';
import {useFavorite, useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import CreateIcon from '@material-ui/icons/Create';
import {useMedia} from '../hooks/ApiHooks';
import {makeStyles} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  paperMargin: {
    margin: '2em',
    padding: '2em',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  avatarStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

// eslint-disable-next-line react/prop-types
const Profile = () => {
  const classes = useStyles();
  const screenNarrow = useMediaQuery('(max-width:550px)');
  const screenMobile = useMediaQuery('(max-width:350px)');
  const matches = useMediaQuery('(min-width:697px)');


  const {user, setUser} = useContext(MediaContext);
  const [avatar, setAvatar] = useState('logo512.png');

  const [update, setUpdate] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleAvatarForm, setToggleAvatarForm] = useState(false);
  const {getTag} = useTag();
  const {getFavorite} = useFavorite();
  const [myLikes, setMyLikes] = useState(0);
  const [hashtagCategory] = useState('EnvironmetalIdealist_blogproducion');
  const {getMedia} = useMedia(true, hashtagCategory);
  const [myPosts, setMyPosts] = useState(0);

  useEffect(() => {
    (async ()=>{
      try {
        const result = await getTag('avatar_'+user.user_id);
        if (result.length > 0) {
          const image = result.pop().filename;
          setAvatar(uploadsUrl + image);
        }
      } catch (e) {
        console.log(e.message);
      }

      try {
        const result2 = await getFavorite(localStorage.getItem('token'));
        console.log('amount of likes result2', result2.length);
        setMyLikes(result2.length);
      } catch (e) {
        console.log(e.message);
      }

      try {
        const media = await getMedia(hashtagCategory);
        console.log('My media length', media.length);
        setMyPosts(media.length);
      } catch (e) {
        alert(e.message);
      }
    })();
  }, [user, update, hashtagCategory]);


  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        color="primary"
        gutterBottom>Profile</Typography>
      {user &&
        <Card variant="outlined" className={classes.root}>
          <CardContent>

            <Paper
              elevation={screenMobile ? 0 : 3}
              className={classes.paperMargin}
              // eslint-disable-next-line max-len
              style={{minWidth: screenNarrow ? '65vw' : '25em'}}
            >
              <Box>
                <List>
                  <ListItem className={classes.avatarStyle}>
                    <Typography
                      component="h4"
                      variant="h8"
                    >
                      {user.first_name + ' ' + user.last_name}
                    </Typography>
                  </ListItem>
                </List>
              </Box>
              <List>
                <ListItem
                  button onClick={()=> {
                    setToggleAvatarForm(!toggleAvatarForm);
                  }}>
                  <ListItemAvatar>
                    <Avatar variant={'circle'} src={avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary=
                      {'Upload avatar'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <Link
                    component={RouterLink}
                    variant="body1"
                    color="black"
                    to='/MyBlogPosts'
                  >
                My blog posts
                  </Link>
                </ListItem>
                <List style={{marginLeft: '4.5em'}}>
                  <ListItem>
                    <Typography>
                    &#8226;&nbsp;Blog posts made: {myPosts}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                    &#8226;&nbsp;Likes given: {myLikes}
                    </Typography>
                  </ListItem>
                </List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <Link
                    component={RouterLink}
                    variant="body1"
                    color="black"
                    to='/MyMeetups'
                  >
                  My meetup posts
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <Link
                    variant="body1"
                    color="black"
                    component={RouterLink}
                    to='/MyFundings'
                  >
                  My fundings posts
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.email} />
                </ListItem>
                <ListItem button onClick={()=> {
                  setToggleForm(!toggleForm);
                }}>
                  <ListItemIcon>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary=
                      {'Change password' }
                  />
                </ListItem>
              </List>
            </Paper>

          </CardContent>
        </Card>
      }
      {toggleForm &&
            <Modal
              open={toggleForm}
              onClose={() => {
                setToggleForm(!toggleForm);
              }}>
              <Grid
                container
                justify={'center'}
                alignItems={'center'}
                alignContent={'center'}
                style={{
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
                    style={{
                      padding: '50px',
                    }}>
                    <Grid
                      container
                      item
                      justify={'flex-end'}
                    >
                      <IconButton
                        onClick={() => {
                          setToggleForm(false);
                        }}
                      >
                        <CloseIcon/>
                      </IconButton>
                    </Grid>
                    <ProfileForm
                      user={user}
                      setUser={setUser}
                      setUpdate={setUpdate}
                      setToggleForm={setToggleForm}/>
                  </Paper>
                </Grid>
              </Grid>

            </Modal>


      }

      {toggleAvatarForm &&
            <Modal
              open={toggleAvatarForm}
              onClose={() => {
                setToggleAvatarForm(!toggleAvatarForm);
              }}>
              <Grid
                container
                justify={'center'}
                alignItems={'center'}
                alignContent={'center'}
                style={{
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
                    style={{
                      padding: '50px',
                    }}>
                    <Grid
                      container
                      item
                      justify={'flex-end'}
                    >
                      <IconButton
                        onClick={() => {
                          setToggleAvatarForm(false);
                        }}
                      >
                        <CloseIcon/>
                      </IconButton>
                    </Grid>
                    <AvatarForm
                      user={user}
                      setUser={setUser}
                      setUpdate={setUpdate}
                      setToggleAvatarForm={setToggleAvatarForm}/>
                  </Paper>
                </Grid>
              </Grid>

            </Modal>


      }
    </>
  );
};

export default Profile;
