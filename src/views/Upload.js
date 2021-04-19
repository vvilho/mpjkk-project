import useForm from '../hooks/FormHooks';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {
  CircularProgress,
  Button,
  Grid,
  Typography,
  Slider,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import useSlider from '../hooks/SliderHooks';
import BackButton from '../components/BackButton';

const Upload = ({history}) => {
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();

  const validators = {
    title: ['required', 'minStringLength: 3'],
    // eslint-disable-next-line max-len
    description: ['minStringLength: 5'],
  };

  const errorMessages = {
    title: ['vaadittu kenttä', 'vähintään 3 merkkiä'],
    description: ['vähintään 5 merkkiä'],
  };

  const doUpload = async () => {
    try {
      const fd = new FormData();
      fd.append('title', inputs.title);
      // kuvaus + filtterit tallennetaan description kenttään
      const desc = {
        description: inputs.description,
        filters: sliderInputs,
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
      <Grid container>
        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h2"
            gutterBottom
          >
          Upload
          </Typography>
        </Grid>
        <Grid item>
          {!loading ?
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <TextValidator
                fullWidth
                name="title"
                label="Title"
                value={inputs.title}
                onChange={handleInputChange}
                validators={validators.title}
                errorMessages={errorMessages.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                fullWidth
                name="description"
                label="Description"
                value={inputs.description}
                onChange={handleInputChange}
                validators={validators.description}
                errorMessages={errorMessages.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                fullWidth
                type="file"
                name="file"
                accept="image/*, audio/*, video/*"
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
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

Upload.propTypes =
{
  history: PropTypes.object,
};


export default Upload;
