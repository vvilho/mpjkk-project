import {useState} from 'react';

const useHashtag = (initState) => {
  const [inputs, setInputs] = useState(initState);

  const handleInputChange = (value) => {
    setInputs((inputs) => ({
      value,
    }));
  };

  return [inputs, handleInputChange];
};

export default useHashtag;
