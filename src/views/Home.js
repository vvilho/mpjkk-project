import BlogMediaTable from '../components/BlogMediaTable';
import {Typography, Grid} from '@material-ui/core';


const Home = () => {
  return (
    <>
      <Grid container>
        <Grid item
        >
          <Typography
            component="h1"
            variant="h2"
            color="primary"
            style={{display: 'flex'}}
            gutterBottom>Blog
          </Typography>
          <Typography
            component="body1"
            variant="h2"
            style={{fontSize: '1.8em'}}
            // eslint-disable-next-line max-len
            gutterBottom>Welcome to the community of people interested in environmental issues!
          </Typography>
        </Grid>
        <Grid item
          style={{
            margin: '2em 0',
          }}>
          <Typography
            component="body1"
            variant="h2"
            style={{fontSize: '1.2em'}}
            // eslint-disable-next-line max-len
            gutterBottom>&#8226;&nbsp;Share your thoughts about environmental issues!&nbsp;&#8226;&nbsp;Show your environmental clever art!&nbsp;&#8226;&nbsp;Show how the funding project turned out!
          </Typography>
        </Grid>
      </Grid>
      <BlogMediaTable ownFiles={false}/>
    </>

  );
};

export default Home;
