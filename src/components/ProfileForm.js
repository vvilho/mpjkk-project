import {useMedia, useTag, useUsers} from '../hooks/ApiHooks';
import {Grid, Typography, Button} from '@material-ui/core';
// import {useState} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import useForm from '../hooks/FormHooks';

const ProfileForm = ({user, setUpdate}) => {
  const {putUser} = useUsers();
  const {postMedia} = useMedia();
  const {postTag} = useTag();

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

  const doRegister = async () => {
    try {
      console.log('user muokkaus lomake lähtee');
      if (inputs.file) {
        const fd = new FormData();
        fd.append('title', inputs.email);
        fd.append('file', inputs.file);
        const fileResult = await postMedia(fd, localStorage.getItem('token'));
        const tagResult = await postTag(
            localStorage.getItem('token'),
            fileResult.file_id,
            'avatar_' + user.user_id,
        );
        console.log(fileResult, tagResult);
        if (fileResult) {
          alert(tagResult.message);
          setUpdate(true);
        }
      }
      delete inputs.confirm;
      delete inputs.file;
      console.log(inputs);
      const data = {
        password: inputs.password,
      };
      console.log(data, inputs);
      const result = await putUser(data, localStorage.getItem('token'));
      console.log('doUpload', result);
      if (result) {
        alert(result.message);
        // const userdata = await getUser(localStorage.getItem('token'));
        // setUser({
        //   email: userdata.user.email,
        //   full_name: userdata.user.full_name,
        //   first_name: JSON.parse(userdata.user.full_name).first_name,
        //   last_name: JSON.parse(userdata.user.full_name).last_name,
        //   user_id: userdata.user.user_id,
        //   username: userdata.user.username,
        // });
        // reset form (password and confirm)
        setInputs((inputs) => ({
          ...inputs,
          password: '',
          confirm: '',
        }));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, setInputs, handleInputChange, handleSubmit, handleFileChange} =
    useForm(doRegister, user);
  console.log(user);

  useEffect(() => {
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


            <Grid
              item
              xs={12}
              style={{
                paddingBottom: '15px',
              }}
            >
              <TextValidator
                fullWidth
                label='Select profile picture'
                InputLabelProps={{shrink: true}}
                type="file"
                name="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth
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
};

export default ProfileForm;
