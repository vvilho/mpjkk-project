import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MediaContext = React.createContext();
// initialize user, modal and modalopentext
// so that they can be used everywhere in the app
const MediaProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenText, setModalOpenText] = useState('');

  return (
    <MediaContext.Provider
      value={{
        user,
        setUser,
        modalOpen,
        setModalOpen,
        modalOpenText,
        setModalOpenText,
      }}>
      {children}
    </MediaContext.Provider>
  );
};

MediaProvider.propTypes = {
  children: PropTypes.node,
};


export {MediaContext, MediaProvider};
