import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import {withRouter} from 'react-router-dom';


const BackButton = ({history}) => {
  return (
    <Button
      color="secondary"
      style={{
        border: 'solid 1px',
      }}
      onClick={() => {
        history.goBack();
      }}
    >
      Back
    </Button>
  );
};


BackButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(BackButton);
