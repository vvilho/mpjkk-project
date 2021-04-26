import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MediaContext = React.createContext();

const MediaProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(null);

  console.log(user);
  return (
    <MediaContext.Provider value={{user, setUser, modalOpen, setModalOpen}}>
      {children}
    </MediaContext.Provider>
  );
};

MediaProvider.propTypes = {
  children: PropTypes.node,
};


export {MediaContext, MediaProvider};
