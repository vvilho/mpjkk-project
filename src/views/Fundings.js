import {Grid, Typography} from '@material-ui/core';
import FundingsMediaTable from '../components/FundingsMediaTable';


const Fundings = () => {
  return (
    <>
      <Grid>
        <Grid item
        >
          <Typography
            component="h1"
            variant="h2"
            color="primary"
            gutterBottom>Fundings</Typography>
        </Grid>
        <Grid item
          style={{
            margin: '2em 0',
          }}>
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
            gutterBottom>&#8226;&nbsp;Create funding projects to solve environmental issues!&nbsp;&#8226;&nbsp;Donate money to make these projects come true!
          </Typography>
        </Grid>
      </Grid>
      <FundingsMediaTable/>
    </>
  );
};

export default Fundings;
