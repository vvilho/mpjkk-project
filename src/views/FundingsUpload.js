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


const FundingsUpload = ({history}) => {
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();
  const {user} = useContext(MediaContext);
  const classes = useStyles();
  const validators = {
    title: ['required', 'minStringLength: 3', 'maxStringLength: 40'],
    description: ['required', 'minStringLength: 5'],
    organizer: ['required', 'minStringLength: 5', 'maxStringLength: 30'],
    location: ['required', 'minStringLength: 5', 'maxStringLength: 30'],
    money: ['required', 'minNumber: 0', 'maxNumber: 1000000'],
  };

  const errorMessages = {
    title: ['vaadittu kenttä', 'vähintään 3 merkkiä', 'max 40 merkkiä'],
    description: ['vaadittu kenttä', 'vähintään 5 merkkiä'],
    organizer: ['vaadittu kenttä', 'vähintään 5 merkkiä', 'max 30 merkkiä'],
    location: ['vaadittu kenttä', 'vähintään 5 merkkiä', 'max 30 merkkiä'],
    money: ['vaadittu kenttä', 'vähintään 0 euroa', 'max miljoona euroa'],
  };

  /**
   * Uploads a new funding post form data to back-end
   *
   * @async
   */
  const doUpload = async () => {
    try {
      const fd = new FormData();
      fd.append('title', inputs.title);
      const desc = {
        title: inputs.title,
        organizer: inputs.organizer,
        location: inputs.location,
        money: inputs.money,
        description: inputs.description,
        owner: user.first_name +' '+ user.last_name,
      };
      fd.append('description', JSON.stringify(desc));
      fd.append('file', inputs.file);
      const result = await postMedia(fd, localStorage.getItem('token'));

      const meetingsTagResult = await postTag(
          localStorage.getItem('token'),
          result.file_id,
          'EnvironmetalIdealist_fundingsproduction',
      );
      const appTagResult = await postTag(
          localStorage.getItem('token'),
          result.file_id,
          appIdentifier,
      );
      console.log('doUpload', result, meetingsTagResult, appTagResult);
      history.push('/fundings');
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
      organizer: '',
      location: '',
      money: '',

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
            New Funding Project
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
                  item
                  xs={12}
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
                  item xs={12}
                  style={{
                    marginBottom: '3vh',
                  }}
                >
                  <TextValidator
                    variant={'filled'}
                    fullWidth
                    name="organizer"
                    label="Organizer"
                    value={inputs.organizer}
                    onChange={handleInputChange}
                    validators={validators.organizer}
                    errorMessages={errorMessages.organizer}
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
                    name="location"
                    label="Location"
                    value={inputs.location}
                    onChange={handleInputChange}
                    validators={validators.location}
                    errorMessages={errorMessages.location}


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
                    name="money"
                    label="Fundraising ammount €"
                    placeholder='€'
                    type="number"
                    value={inputs.money}
                    onChange={handleInputChange}
                    validators={validators.money}
                    errorMessages={errorMessages.money}
                    inputProps={{
                      min: '0',
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
                    multiline
                    variant={'filled'}
                    rows={6}
                    name="description"
                    label="description"
                    type="Description"
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
                    Create new funding project
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

FundingsUpload.propTypes =
  {
    history: PropTypes.object,
  };


export default FundingsUpload;
