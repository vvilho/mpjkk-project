import BlogMediaTable from '../components/BlogMediaTable';
import {Typography} from '@material-ui/core';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from '../utils/basicTheme';

const Home = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Typography
        component="body1"
        variant="h5"
        // eslint-disable-next-line max-len
        gutterBottom>Welcome to the community of people interested in environmental issues!
      </Typography>
      <Typography
        component="h1"
        variant="h2"
        color="primary"
        gutterBottom>Blog</Typography>
      <BlogMediaTable ownFiles={false}/>
    </MuiThemeProvider>
  );
};

export default Home;
