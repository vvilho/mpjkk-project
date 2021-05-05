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
  makeStyles, ListSubheader,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useContext, useEffect, useState} from 'react';
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


const BlogUpload = ({history}) => {
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();
  const {user} = useContext(MediaContext);
  const classes = useStyles();
  const [dropdownHashtag, setDropdownHashtag] = useState('Materialreuseproducion');

  const validators = {
    title: ['required', 'minStringLength: 3'],
    description: ['minStringLength: 5'],
    hashtag: ['required'],
  };

  const errorMessages = {
    title: ['vaadittu kenttä', 'vähintään 3 merkkiä'],
    description: ['vähintään 5 merkkiä'],
    hashtag: ['vaadittu kenttä'],
  };

  /**
   * Uploads a new blog post form data to back-end
   *
   * @async
   */
  const doUpload = async () => {
    try {
      const fd = new FormData();
      fd.append('title', inputs.title);
      // kuvaus + filtterit tallennetaan description kenttään
      const desc = {
        description: inputs.description,
        hashtag: dropdownHashtag,
        owner: JSON.parse(user.full_name).first_name,
      };
      fd.append('description', JSON.stringify(desc));
      fd.append('file', inputs.file);
      const result = await postMedia(fd, localStorage.getItem('token'));
      const hashtagResult = await postTag(
          localStorage.getItem('token'),
          result.file_id,
          ('EnvironmetalIdealist_blog' + dropdownHashtag),
      );
      const blogTagResult = await postTag(
          localStorage.getItem('token'),
          result.file_id,
          'EnvironmetalIdealist_blogproducion',
      );
      const appTagResult = await postTag(
          localStorage.getItem('token'),
          result.file_id,
          appIdentifier,
      );
      console.log('doUpload', result, hashtagResult, blogTagResult, appTagResult);
      history.push('/');
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
          New Blog Post
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
                multiline
                fullWidth
                rows={6}
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
                label='Select image or video for post'
                InputLabelProps={{shrink: true}}
                fullWidth
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

            <ListSubheader component="div">Choose hashtag for post</ListSubheader>
            <Grid
              container
              direction={'row'}
              justify={'space-around'} >
              <Grid
                item>
                <Button
                  style={dropdownHashtag === 'Materialreuseproducion' ?
                    {backgroundColor: '#47D37859',
                      color: '#621BEE'} :
                    {backgroundColor: '',
                      color: '#621BEE'}}
                  value={'Materialreuseproducion'}
                  onClick={(e) => {
                    setDropdownHashtag(e.currentTarget.value);
                  }}

                >
                  #Materialreuse
                </Button>
              </Grid>
              <Grid
                item>
                <Button
                  style={dropdownHashtag === 'Hanfcraftsproducion' ?
                    {backgroundColor: '#47D37859',
                      color: '#621BEE'} :
                    {backgroundColor: '',
                      color: '#621BEE'}}
                  value={'Hanfcraftsproducion'}
                  onClick={(e) => {
                    setDropdownHashtag(e.currentTarget.value);
                  }}
                >
                  #Hanfcrafts
                </Button>
              </Grid>
              <Grid
                item>
                <Button
                  style={dropdownHashtag === 'FreeWordproducion' ?
                    {backgroundColor: '#47D37859',
                      color: '#621BEE'} :
                    {backgroundColor: '',
                      color: '#621BEE'}}
                  value={'FreeWordproducion'}
                  onClick={(e) => {
                    setDropdownHashtag(e.currentTarget.value);
                  }}
                >
                  #FreeWord
                </Button>
              </Grid>
              <Grid
                item>
                <Button
                  style={dropdownHashtag === 'Cookingproducion' ?
                    {backgroundColor: '#47D37859',
                      color: '#621BEE'} :
                    {backgroundColor: '',
                      color: '#621BEE'}}
                  value={'Cookingproducion'}
                  onClick={(e) => {
                    setDropdownHashtag(e.currentTarget.value);
                  }}
                >
                  #Cooking
                </Button>
              </Grid>
              <Grid
                item>
                <Button
                  style={dropdownHashtag === 'Healthproducion' ?
                    {backgroundColor: '#47D37859',
                      color: '#621BEE'} :
                    {backgroundColor: '',
                      color: '#621BEE'}}
                  value={'Healthproducion'}
                  onClick={(e) => {
                    setDropdownHashtag(e.currentTarget.value);
                  }}
                >
                  #Health
                </Button>
              </Grid>
              <Grid
                item>
                <Button
                  value={'Energyproducion'}
                  style={dropdownHashtag === 'Energyproducion' ?
                    {backgroundColor: '#47D37859',
                      color: '#621BEE'} :
                    {backgroundColor: '',
                      color: '#621BEE'}}
                  onClick={(e) => {
                    setDropdownHashtag(e.currentTarget.value);
                  }}
                >
                  #Energy
                </Button>
              </Grid>
            </Grid>
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
              Lähetä
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

BlogUpload.propTypes =
{
  history: PropTypes.object,
};


export default BlogUpload;
