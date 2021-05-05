import {useState} from 'react';

const useForm = (callback, initState) => {
  const [inputs, setInputs] = useState(initState);

  // when form is submitted do this
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  // when input field value changes
  // this changes the value in 'inputs-object'
  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileChange = (event) => {
    event.persist();
    console.log(event.target.files);
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.files[0],
    }));
  };

  return {inputs, handleSubmit, handleInputChange, handleFileChange, setInputs};
};

export default useForm;
