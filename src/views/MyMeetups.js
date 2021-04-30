import MeetingsMediaTable from '../components/MeetingsMediaTable';
import {Typography} from '@material-ui/core';
import BackButton from '../components/BackButton';
import {appIdentifier} from '../utils/variables';


const MyMeetupFiles = () => {
  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>My meetups</Typography>
      <MeetingsMediaTable ownFiles={true} tag={appIdentifier}/>
    </>
  );
};

export default MyMeetupFiles;
