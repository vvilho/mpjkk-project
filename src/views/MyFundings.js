import FundingsMediaTable from '../components/FundingsMediaTable';
import {Typography} from '@material-ui/core';
import BackButton from '../components/BackButton';


const MyFundingFiles = () => {
  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>My fundings</Typography>
      <FundingsMediaTable ownFiles={true} />
    </>
  );
};

export default MyFundingFiles;
