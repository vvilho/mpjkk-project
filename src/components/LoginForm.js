import {useContext} from 'react';
import useForm from '../hooks/FormHooks';
import {useLogin} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {Button, Grid, TextField, Typography} from '@material-ui/core';

const LoginForm = ({setModalOpen}) => {
  const {setUser} = useContext(MediaContext);
  const {postLogin} = useLogin();

  const doLogin = async () => {
    try {
      const userdata = await postLogin(inputs);
      localStorage.setItem('token', userdata.token);
      setUser({
        email: userdata.user.email,
        full_name: userdata.user.full_name,
        first_name: JSON.parse(userdata.user.full_name).first_name,
        last_name: JSON.parse(userdata.user.full_name).last_name,
        user_id: userdata.user.user_id,
        username: userdata.user.username,
      });
      setModalOpen(false);
    } catch (e) {
      console.log('doLogin', e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, {
    username: '',
    password: '',
  });


  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom>Login</Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid container item>
              <TextField
                fullWidth
                type="text"
                name="username"
                label="Email"
                onChange={handleInputChange}
                value={inputs.username}
              />
            </Grid>
            <Grid container item>
              <TextField
                fullWidth
                type="password"
                name="password"
                label="Password"
                onChange={handleInputChange}
                value={inputs.password}
              />
            </Grid>

            <Grid container item>
              <Button
                style={{
                  marginTop: '15px',
                }}
                fullWidth
                color="primary"
                type="submit"
                variant="contained">
              Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

LoginForm.propTypes = {
  setModalOpen: PropTypes.func,
};


export default withRouter(LoginForm);
