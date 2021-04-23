import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  List,
  ListItem, ListItemAvatar,
  ListItemIcon, ListItemText,
  Typography,
  Paper,
  Box,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import BackButton from '../components/BackButton';
import {Link as RouterLink} from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import {useFavorite, useComments, useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import CreateIcon from '@material-ui/icons/Create';
import {useMedia} from '../hooks/ApiHooks';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  paperMargin: {
    margin: '2em',
    padding: '2em',
  },
  avatarStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

// eslint-disable-next-line react/prop-types
const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const [avatar, setAvatar] = useState();
  const [update, setUpdate] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const {getTag} = useTag();
  const {getComment} = useComments();
  const [myComments, setMyComments] = useState(0);
  const {getFavorite} = useFavorite();
  const [myLikes, setMyLikes] = useState(0);
  const [hashtagCategory] = useState('EnvironmetalIdealist_blog');
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
        const result3 = await getComment(localStorage.getItem('token'));
        console.log('amount of comments result3', result3.length);
        setMyComments(result3.length);
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
              elevation={3}
              className={classes.paperMargin}>
              <Box className={classes.avatarStyle}>
                <List>
                  <ListItem>
                    <ListItemAvatar className={classes.avatarStyle}>
                      <Avatar variant={'circle'} src={avatar} />
                    </ListItemAvatar>
                  </ListItem>
                  <ListItem>
                    <Typography
                      component="h4"
                      variant="h8"
                    >
                      {user.full_name}
                    </Typography>
                  </ListItem>
                </List>
              </Box>
              <List>
                <ListItem>
                  <Typography>
                  Posts made: {myPosts}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                  Comments written: {myComments}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                  Likes given: {myLikes}
                  </Typography>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.email} />
                </ListItem>
                <ListItem component={RouterLink} to="/MyBlogPosts">
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="My posts"/>
                </ListItem>
                <ListItem button onClick={()=> {
                  setToggleForm(!toggleForm);
                }}>
                  <ListItemIcon>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary=
                      {toggleForm ? 'Close update profile' : 'Update profile' }
                  />
                </ListItem>
              </List>
            </Paper>

          </CardContent>
        </Card>
      }
      {toggleForm &&
      <Grid>
        <ProfileForm user={user} setUser={setUser} setUpdate={setUpdate}/>
      </Grid>
      }
    </>
  );
};

export default Profile;
