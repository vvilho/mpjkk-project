import {useUsers} from '../hooks/ApiHooks';
import {Grid, Typography, Button} from '@material-ui/core';
// import {useState} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import useForm from '../hooks/FormHooks';

const ProfileForm = ({user, setUpdate, setToggleForm}) => {
  const {putUser} = useUsers();

  const validators = {
    confirm: ['isPasswordMatch'],
    email: ['required', 'isEmail'],
    // eslint-disable-next-line max-len
    first_name: ['minStringLength: 3'],
    last_name: ['minStringLength: 3'],
  };

  const errorMessages = {
    confirm: ['salasanat eivät täsmää'],
    email: ['vaadittu kenttä', 'sähköposti väärää muotoa'],
    first_name: ['vähintään 3 merkkiä'],
    last_name: ['vähintään 3 merkkiä'],
  };


  // if user changes the password this sends the data
  const doRegister = async () => {
    try {
      const data = {
        password: inputs.password,
      };
      const result = await putUser(data, localStorage.getItem('token'));
      setToggleForm(false);
      alert('Password changed');
      if (result) {
        setInputs(() => ({
          password: '',
          confirm: '',
        }));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, setInputs, handleInputChange, handleSubmit} =
    useForm(doRegister, user);
  console.log(user);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch',
        (value) => (value === inputs.password),
    );
  }, [inputs]);


  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h4"
          gutterBottom>Update profile</Typography>
      </Grid>
      <Grid item xs={12}>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container>

            <Grid item xs={12}>
              <TextValidator
                fullWidth
                type="password"
                name="password"
                label="New password"
                value={inputs?.password}
                onChange={handleInputChange}
                validators={validators.password}
                errorMessages={errorMessages.password}
              />
            </Grid>

            <Grid item xs={12}>
              <TextValidator
                fullWidth
                type="password"
                name="confirm"
                label="Confirm new password"
                value={inputs?.confirm}
                onChange={handleInputChange}
                validators={validators.confirm}
                errorMessages={errorMessages.confirm}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{
                  marginTop: '15px',
                }}
                fullWidth
                color="primary"
                type="submit"
                variant="contained">
                Update
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setUpdate: PropTypes.func,
  setToggleForm: PropTypes.func,
};

export default ProfileForm;
