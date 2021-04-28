import {Typography} from '@material-ui/core';
import FundingsMediaTable from '../components/FundingsMediaTable';


const Fundings = () => {
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
        gutterBottom>Fundings</Typography>

      <FundingsMediaTable/>
    </>
  );
};

export default Fundings;
