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
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import BackButton from '../components/BackButton';
import {Link as RouterLink} from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import CreateIcon from '@material-ui/icons/Create';

const Profile = () => {
  const [user, setUser] = useContext(MediaContext);
  const [avatar, setAvatar] = useState('logo512.png');
  const [update, setUpdate] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const {getTag} = useTag();

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
    })();
  }, [user, update]);

  console.log(avatar);

  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>Profile</Typography>
      {user &&
        <Card>
          <CardContent>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant={'square'} src={avatar} />
                </ListItemAvatar>
                <ListItemText primary={user.username} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary=
                  {user.first_name + ' ' + user.last_name} />
              </ListItem>
              <ListItem component={RouterLink} to="/myfiles">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="My files"/>
              </ListItem>
              <ListItem button onClick={()=> {
                setToggleForm(!toggleForm);
              }}>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText
                  primary=
                    {'Update profile' }
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      }
      {toggleForm &&
            <Modal open={toggleForm} onClose={() => {
              setToggleForm(!toggleForm);
            }}>
              <Grid
                container
                justify={'center'}
                alignItems={'center'}
              >
                <Grid
                  xs={4}
                >
                  <Paper
                    style={{
                      padding: '50px',
                    }}>
                    <ProfileForm
                      user={user}
                      setUser={setUser}
                      setUpdate={setUpdate}/>
                  </Paper>
                </Grid>
              </Grid>

            </Modal>


      }
    </>
  );
};

export default Profile;
