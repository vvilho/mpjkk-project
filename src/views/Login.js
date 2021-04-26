import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import PropTypes from 'prop-types';
import {Button, Grid} from '@material-ui/core';
import {useState} from 'react';

const Login = ({setModalOpen}) => {
  const [toggle, setToggle] = useState(true);

  const showHide = () => {
    setToggle(!toggle);
  };

  return (

    <Grid
      xs={12}
      container
      direction={'column'}
      spacing={0}
      justify={'center'}
      alignItems={'center'}
      alignContent={'center'}

    >
      <Grid
        item

      >

        { toggle ?
          <LoginForm setModalOpen={setModalOpen} /> :
          <RegisterForm setToggle={setToggle}/> }
        <Button onClick={showHide}>{toggle ?
            'or register' :
            'or login'}</Button>


      </Grid>

    </Grid>


  );
};
Login.propTypes = {
  setModalOpen: PropTypes.func,
};
export default Login;
