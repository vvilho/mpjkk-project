import {Typography} from '@material-ui/core';
import MeetingsMediaTable from '../components/MeetingsMediaTable';


const Meetings = () => {
  return (
    <>
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
        gutterBottom>Meetings</Typography>

      <MeetingsMediaTable/>
    </>
  );
};

export default Meetings;
