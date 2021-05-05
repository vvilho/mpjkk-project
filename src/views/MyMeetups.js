import MeetingsMediaTable from '../components/MeetingsMediaTable';
import {Typography} from '@material-ui/core';
import BackButton from '../components/BackButton';


const MyMeetupFiles = () => {
  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>My meetups</Typography>
      <MeetingsMediaTable ownFiles={true}/>
    </>
  );
};

export default MyMeetupFiles;
