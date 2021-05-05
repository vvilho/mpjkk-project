import {Grid, Typography} from '@material-ui/core';
import MeetingsMediaTable from '../components/MeetingsMediaTable';


const Meetings = () => {
  return (

    <>
      <Grid>
        <Grid item
        >
          <Typography
            component="h1"
            variant="h2"
            color="primary"
            gutterBottom>Meetups</Typography>
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
            gutterBottom>&#8226;&nbsp;Meet similar minded people!&nbsp;&#8226;&nbsp;Find volunteers for your funding projects!
          </Typography>
        </Grid>
      </Grid>
      <MeetingsMediaTable/>
    </>
  );
};

export default Meetings;
