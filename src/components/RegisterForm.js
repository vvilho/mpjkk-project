import useForm from '../hooks/FormHooks';
import {useUsers} from '../hooks/ApiHooks';
import {Grid, Typography, Button, FormControl} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import PropTypes from 'prop-types';

const RegisterForm = ({setToggle}) => {
  const {register, getUserAvailable} = useUsers();
  const validators = {
    first_name: ['required', 'minStringLength: 3'],
    last_name: ['required', 'minStringLength: 3'],
    email: ['required', 'isAvailable', 'isEmail'],
    password: ['required', 'minStringLength:5'],
    confirm: ['required', 'isPasswordMatch'],

  };

  const errorMessages = {
    first_name: ['vaadittu kenttä', 'vähintään 3 merkkiä'],
    last_name: ['vaadittu kenttä', 'vähintään 3 merkkiä'],
    email: ['vaadittu kenttä', 'tunnus ei ole vapaa',
      'sähköposti väärää muotoa'],
    password: ['vaadittu kenttä', 'vähintään 5 merkkiä'],
    confirm: ['vaadittu kenttä', 'salasanat eivät täsmää'],

  };

  const doRegister = async () => {
    try {
      // check if that username is available
      const available = await getUserAvailable(inputs.email);
      if (available) {
        delete inputs.confirm;
        const data = {
          username: inputs.email,
          password: inputs.password,
          confirm: inputs.confirm,
          email: inputs.email,
          full_name: JSON.stringify({
            first_name: inputs.first_name,
            last_name: inputs.last_name,
          }),
        };
        console.log(data, JSON.stringify(data));
        const result = await register(data);
        if (result.message.length > 0) {
          alert(result.message);
          setToggle(true);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doRegister, {
    first_name: '',
    last_name: '',
    password: '',
    confirm: '',
    email: '',
  });

  useEffect(()=>{
    ValidatorForm.addValidationRule('isAvailable', async (value) => {
      if (value.length > 2) {
        try {
          const available = await getUserAvailable(value);
          console.log('onk vapaana', available);
          return available;
        } catch (e) {
          console.log(e.message);
          return true;
        }
      }
    });

    ValidatorForm.addValidationRule('isPasswordMatch',
        (value) => (value === inputs.password),
    );
  }, [inputs]);


  // console.log('RegisterForm', inputs);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom>Register</Typography>
      </Grid>
      <Grid item xs={12}>
        <ValidatorForm
          onSubmit={handleSubmit}
        >
          <Grid container>

            <Grid container item>
              <FormControl
                fullWidth
              >
                <TextValidator
                  fullWidth
                  type="text"
                  name="first_name"
                  label="First name"
                  onChange={handleInputChange}
                  value={inputs.first_name}
                  validators={validators.first_name}
                  errorMessages={errorMessages.first_name}
                />
              </FormControl>
            </Grid>

            <Grid container item>
              <FormControl
                fullWidth
              >
                <TextValidator
                  fullWidth
                  type="text"
                  name="last_name"
                  label="Last name"
                  onChange={handleInputChange}
                  value={inputs.last_name}
                  validators={validators.last_name}
                  errorMessages={errorMessages.last_name}
                />
              </FormControl>
            </Grid>

            <Grid container item>
              <FormControl
                fullWidth
              >
                <TextValidator
                  fullWidth
                  type="email"
                  name="email"
                  label="Email / Username"
                  onChange={handleInputChange}
                  value={inputs.email}
                  validators={validators.email}
                  errorMessages={errorMessages.email}
                />
              </FormControl>
            </Grid>

            <Grid container item>
              <FormControl
                fullWidth
              >
                <TextValidator
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  onChange={handleInputChange}
                  value={inputs.password}
                  validators={validators.password}
                  errorMessages={errorMessages.password}
                />
              </FormControl>
            </Grid>

            <Grid container item>
              <FormControl
                fullWidth
              >
                <TextValidator
                  fullWidth
                  type="password"
                  name="confirm"
                  label="Confirm password"
                  onChange={handleInputChange}
                  value={inputs.confirm}
                  validators={validators.confirm}
                  errorMessages={errorMessages.confirm}
                />
              </FormControl>
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
                Register
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};

RegisterForm.propTypes = {
  setToggle: PropTypes.func,
};

export default RegisterForm;
