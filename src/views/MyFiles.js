import MediaTable from '../components/MediaTable';
import {Typography} from '@material-ui/core';
import BackButton from '../components/BackButton';
import {appIdentifier} from '../utils/variables';


const MyFiles = () => {
  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>My files</Typography>
      <MediaTable ownFiles={true} tag={appIdentifier}/>
    </>
  );
};

export default MyFiles;
