import FundingsMediaTable from '../components/FundingsMediaTable';
import {Typography} from '@material-ui/core';
import BackButton from '../components/BackButton';
import {appIdentifier} from '../utils/variables';


const MyFundingFiles = () => {
  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>My fundings</Typography>
      <FundingsMediaTable ownFiles={true} tag={appIdentifier}/>
    </>
  );
};

export default MyFundingFiles;
