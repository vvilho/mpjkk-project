/* eslint-disable max-len */
import useForm from '../hooks/FormHooks';
import {appIdentifier} from '../utils/variables';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import {
  CircularProgress,
  Button,
  Grid,
  Typography,
  makeStyles,
  // Select,


} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useContext, useEffect} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';
import {EmojiNature} from '@material-ui/icons';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  hashtag: {
    'padding': '5px',
    'border': 'solid 1px',
    'borderRadius': 7,
    '&:hover': {
      background: '#efefef',
      cursor: 'pointer',
    },
  },
  sendButton: {
    margin: '3vh',
  },

  margin: {
    margin: '3vh',
  },
  dropdown: {
    marginBottom: '3vh',
  },


}));


const MeetingsUpload = ({history}) => {
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();
  const {user} = useContext(MediaContext);
  const classes = useStyles();

  const validators = {
    title: ['required', 'minStringLength: 3', 'maxStringLength: 30'],
    description: ['required', 'minStringLength: 5'],
    address: ['required', 'minStringLength: 5', 'maxStringLength: 30'],
    zipcode: ['required', 'minStringLength: 5', 'maxStringLength: 5'],
    city: ['required', 'minStringLength: 2', 'maxStringLength: 20'],
    time: ['required'],
  };

  const errorMessages = {
    title: ['vaadittu kenttä', 'vähintään 3 merkkiä', 'max 30 merkkiä'],
    description: ['vaadittu kenttä', 'vähintään 5 merkkiä'],
    address: ['vaadittu kenttä', 'vähintään 5 merkkiä', 'max 30 merkkiä'],
    zipcode: ['vaadittu kenttä', 'vähintään 5 merkkiä', 'max 5 merkkiä'],
    city: ['vaadittu kenttä', 'vähintään 2 merkkiä', 'max 20 merkkiä'],
    time: ['vaadittu kenttä'],
  };

  /**
   * Uploads a new meetup post form data to back-end
   *
   * @async
   */
  const doUpload = async () => {
    try {
      const fd = new FormData();
      fd.append('title', inputs.title);
      const desc = {
        description: inputs.description,
        owner: JSON.parse(user.full_name).first_name,
        address: inputs.address,
        time_start: inputs.time_start,
        time_end: inputs.time_end,
        city: inputs.city,
        zipcode: inputs.zipcode,
      };
      fd.append('description', JSON.stringify(desc));
      fd.append('file', inputs.file);
      const result = await postMedia(fd, localStorage.getItem('token'));

      const meetingsTagResult = await postTag(
          localStorage.getItem('token'),
          result.file_id,
          'EnvironmetalIdealist_meetingsproduction',
      );
      const appTagResult = await postTag(
          localStorage.getItem('token'),
          result.file_id,
          appIdentifier,
      );
      console.log('doUpload', result, meetingsTagResult, appTagResult);
      history.push('/meetups');
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit, handleFileChange, setInputs} =
    useForm(doUpload, {
      title: '',
      description: '',
      file: null,
      dataUrl: '',
      address: '',
      zipcode: '',
      city: '',
      time_start: `${(moment().format()).slice(0, -9)}`,
      time_end: '',

    });
  useEffect(() => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setInputs((inputs) => ({
        ...inputs,
        dataUrl: reader.result,
      }));
    });

    if (inputs.file !== null) {
      if (inputs.file.type.includes('image')) {
        reader.readAsDataURL(inputs.file);
      } else {
        setInputs((inputs) => ({
          ...inputs,
          dataUrl: 'logo512.png',
        }));
      }
    }
  }, [inputs.file]);

  console.log(inputs);

  return (
    <>
      <BackButton />
      <Grid
        container
        justify={'center'}
      >

        <Grid
          item
          container
          xs={12}
          justify={'center'}
        >
          <EmojiNature
            color={'primary'}
            style={{
              fontSize: '150px',

            }} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h2"
            color={'primary'}
            align={'center'}
            gutterBottom
          >
            New Meetup
          </Typography>
        </Grid>


        <Grid
          item
          xs={10}
        >
          {!loading ?
            <ValidatorForm
              onSubmit={handleSubmit}
            >
              <Grid
                container
                justify={'center'}
              >
                <Grid
                  item xs={12}
                  style={{
                    marginBottom: '3vh',
                  }}
                >
                  <TextValidator
                    variant={'filled'}
                    fullWidth
                    name="title"
                    label="Title"
                    value={inputs.title}
                    onChange={handleInputChange}
                    validators={validators.title}
                    errorMessages={errorMessages.title}
                  />
                </Grid>


                <Grid
                  item
                  xs={12}
                  style={{
                    marginBottom: '3vh',
                  }}
                >
                  <TextValidator
                    variant={'filled'}
                    fullWidth
                    name="address"
                    label="Address"
                    value={inputs.address}
                    onChange={handleInputChange}
                    validators={validators.address}
                    errorMessages={errorMessages.address}
                  />
                </Grid>
                <Grid
                  container
                  direction={'row'}
                  xs={12}
                  style={{
                    marginBottom: '3vh',
                  }}
                >
                  <Grid
                    item
                    xs={4}
                    style={{
                      paddingRight: '10px',
                    }}
                  >
                    <TextValidator
                      fullWidth
                      variant={'filled'}
                      type={'number'}
                      name="zipcode"
                      label="Zipcode"
                      value={inputs.zipcode}
                      onChange={handleInputChange}
                      validators={validators.zipcode}
                      errorMessages={errorMessages.zipcode}

                    />
                  </Grid>
                  <Grid
                    item
                    xs={8}

                  >
                    <TextValidator
                      fullWidth
                      variant={'filled'}
                      name="city"
                      label="City"
                      value={inputs.city}
                      onChange={handleInputChange}
                      validators={validators.city}
                      errorMessages={errorMessages.city}

                    />
                  </Grid>


                </Grid>


                <Grid
                  item
                  xs={12}
                  style={{
                    marginBottom: '3vh',
                  }}
                >
                  <TextValidator
                    fullWidth
                    variant={'filled'}
                    name="time_start"
                    label="Starting time"
                    type="datetime-local"
                    value={inputs.time_start}
                    onChange={handleInputChange}
                    validators={validators.time}
                    errorMessages={errorMessages.time}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: `${(moment().format()).slice(0, -9)}`,

                    }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{
                    marginBottom: '3vh',
                  }}
                >
                  <TextValidator
                    fullWidth
                    variant={'filled'}
                    name="time_end"
                    label="Ending time"
                    type="datetime-local"
                    value={inputs.time_end}
                    onChange={handleInputChange}
                    validators={validators.time}
                    errorMessages={errorMessages.time}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: `${inputs.time_start}`,

                    }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{
                    marginBottom: '3vh',
                  }}
                >
                  <TextValidator
                    variant={'filled'}
                    multiline
                    rows={6}
                    fullWidth
                    name="description"
                    label="Description"
                    value={inputs.description}
                    onChange={handleInputChange}
                    validators={validators.description}
                    errorMessages={errorMessages.description}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{
                    marginBottom: '3vh',
                  }}
                >
                  <TextValidator
                    fullWidth
                    label='Select image or video for post'
                    InputLabelProps={{shrink: true}}
                    type="file"
                    name="file"
                    accept="image/*, video/*"
                    required
                    onChange={handleFileChange}
                  />
                </Grid>
                {inputs.dataUrl.length > 0 &&
                <Grid container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={6}>
                    <img
                      src={inputs.dataUrl}
                      style={{
                        width: '100%',
                      }}
                    />
                  </Grid>
                </Grid>
                }


                <Grid
                  container
                  justify={'center'}
                  xs={12}
                  className={classes.sendButton}
                >
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"

                  >
                    Create new meetup
                  </Button>
                </Grid>
              </Grid>

            </ValidatorForm> :
            <CircularProgress/>
          }
        </Grid>
      </Grid>
    </>
  );
};

MeetingsUpload.propTypes =
  {
    history: PropTypes.object,
  };


export default MeetingsUpload;
