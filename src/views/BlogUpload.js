/* eslint-disable max-len */
import useForm from '../hooks/FormHooks';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {
  CircularProgress,
  Button,
  Grid,
  Typography,
  Slider,
  makeStyles,
  Select,


} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import useSlider from '../hooks/SliderHooks';
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
  const classes = useStyles();
  const [dropdownHashtag, setDropdownHashtag] = useState('#Materialreuse');
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

  const doUpload = async () => {
    try {
      const fd = new FormData();
      fd.append('title', inputs.title);
      // kuvaus + filtterit tallennetaan description kenttään
      const desc = {
        description: inputs.description,
        hashtag: dropdownHashtag,
      };
      fd.append('description', JSON.stringify(desc));
      fd.append('file', inputs.file);
      const result = await postMedia(fd, localStorage.getItem('token'));
      const tagResult = await postTag(
          localStorage.getItem('token'),
          result.file_id,
      );
      console.log('doUpload', result, tagResult);
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

  const [sliderInputs, handleSliderChange] = useSlider({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
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

  console.log(inputs, sliderInputs);

  return (
    <>
      <BackButton />
      <Grid
        container
        justify={'center'}
      ><Grid
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
                type="file"
                name="file"
                accept="image/*, audio/*, video/*"
                required
                onChange={handleFileChange}
              />
            </Grid>

            <Grid
              item
              xs={12}
              className={classes.dropdown}

            >
              <Typography>Select Tag From Dropdown</Typography>

              <Select
                native
                required
                value={dropdownHashtag}
                fullWidth
                onChange={(e) => {
                  setDropdownHashtag(e.target.value);
                }}
              >
                <option value={'#Materialreuse'} selected>#Materialreuse</option>
                <option value={'#Handcrafts'}>#Handcrafts</option>
                <option value={'#FreeWord'}>#FreeWord</option>
                <option value={'#Cooking'}>#Cooking</option>
                <option value={'#Health'}>#Health</option>
                <option value={'#Energy'}>#Energy</option>
              </Select>

            </Grid>


            <Grid
              container
              direction={'row'}
              justify={'space-around'} >
              <Grid
                item>
                <Typography
                  color={'secondary'}
                  className={classes.hashtag}
                >
                  #Materialreuse
                </Typography>
              </Grid>
              <Grid
                item>
                <Typography
                  color={'secondary'}
                  className={classes.hashtag}
                >
                  #Hanfcrafts
                </Typography>
              </Grid>
              <Grid
                item>
                <Typography
                  color={'secondary'}
                  className={classes.hashtag}
                >
                  #FreeWord
                </Typography>
              </Grid>
              <Grid
                item>
                <Typography
                  color={'secondary'}
                  className={classes.hashtag}
                >
                  #Cooking
                </Typography>
              </Grid>
              <Grid
                item>
                <Typography
                  color={'secondary'}
                  className={classes.hashtag}
                >
                  #Health
                </Typography>
              </Grid>
              <Grid
                item>
                <Typography
                  color={'secondary'}
                  className={classes.hashtag}
                >
                  #Energy
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={2}
              className={classes.sendButton}
            >
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                fullWidth
              >
              Lähetä
              </Button>
            </Grid>
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
                      filter: `
                      brightness(${sliderInputs.brightness}%)
                      contrast(${sliderInputs.contrast}%)
                      saturate(${sliderInputs.saturate}%)
                      sepia(${sliderInputs.sepia}%)
                      `,
                      width: '100%',
                    }}
                  />
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography>Brightness</Typography>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      name="brightness"
                      value={sliderInputs?.brightness}
                      valueLabelDisplay="on"
                      valueLabelFormat={(value) => value + '%'}
                      onChange={handleSliderChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Contrast</Typography>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      name="contrast"
                      value={sliderInputs?.contrast}
                      valueLabelDisplay="on"
                      valueLabelFormat={(value) => value + '%'}
                      onChange={handleSliderChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Saturation</Typography>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      name="saturate"
                      value={sliderInputs?.saturate}
                      valueLabelDisplay="on"
                      valueLabelFormat={(value) => value + '%'}
                      onChange={handleSliderChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Sepia</Typography>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      name="sepia"
                      value={sliderInputs?.sepia}
                      valueLabelDisplay="on"
                      valueLabelFormat={(value) => value + '%'}
                      onChange={handleSliderChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
          }
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
