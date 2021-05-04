import BlogMediaTable from '../components/BlogMediaTable';
import {Typography, Grid} from '@material-ui/core';


const Home = () => {
  return (
    <>
      <Grid>
        <Grid item
          style={{
            margin: '2em 0',
          }}>
          <Typography
            component="body1"
            variant="h5"
            // eslint-disable-next-line max-len
            gutterBottom>Welcome to the community of people interested in environmental issues!
          </Typography>
        </Grid>
        <Grid item
        >
          <Typography
            component="h1"
            variant="h2"
            color="primary"
            gutterBottom>Blog</Typography>
        </Grid>
      </Grid>
      <BlogMediaTable ownFiles={false}/>
    </>

  );
};

export default Home;
