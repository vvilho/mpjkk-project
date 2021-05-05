import {useMedia, useTag} from '../hooks/ApiHooks';
import {Grid, Typography, Button} from '@material-ui/core';
// import {useState} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import useForm from '../hooks/FormHooks';

const AvatarForm = ({user, setUpdate, setToggleAvatarForm}) => {
  const {postMedia} = useMedia();
  const {postTag} = useTag();


  /**
   * Sends avatar image to ApiHooks and eventually updates profile picture
   * @return {Promise<void>}
   */
  const doRegister = async () => {
    try {
      console.log('user muokkaus avatar lomake lähtee');
      if (inputs.file) {
        const fd = new FormData();
        fd.append('file', inputs.file);
        const fileResult = await postMedia(fd, localStorage.getItem('token'));
        const tagResult = await postTag(
            localStorage.getItem('token'),
            fileResult.file_id,
            'avatar_' + user.user_id,
        );
        console.log(fileResult, tagResult);
        if (fileResult) {
          setUpdate(true);
          setToggleAvatarForm(false);
          alert('Avatar uploaded');
        }
      }
      delete inputs.file;
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleSubmit, handleFileChange} =
    useForm(doRegister, user);
  console.log(user);


  /**
   * Custom validation rule: check if users passwords match
   */
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
          gutterBottom>Upload avatar</Typography>
      </Grid>
      <Grid item xs={12}>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container>
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
                Upload
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};

AvatarForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setUpdate: PropTypes.func,
  setToggleAvatarForm: PropTypes.func,
};

export default AvatarForm;
