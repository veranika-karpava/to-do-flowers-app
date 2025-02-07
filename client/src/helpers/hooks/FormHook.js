import { useState, useCallback } from 'react';

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, setFormState] = useState({
    inputs: initialInputs,
    isFormValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    setFormState((prevState) => {
      let formIsValid = true;

      for (const inputId in prevState.inputs) {
        if (!prevState.inputs[inputId]) {
          continue;
        }

        if (inputId === id) {
          formIsValid = formIsValid && isValid;
        } else {
          formIsValid = formIsValid && prevState.inputs[inputId].isValid;
        }
      }

      return {
        ...prevState,
        inputs: {
          ...prevState.inputs,
          [id]: { value, isValid },
        },
        isFormValid: formIsValid,
      };
    });
  }, []);

  const setFormData = useCallback((inputs, isFormValid) => {
    setFormState({ inputs, isFormValid });
  }, []);

  return [formState, inputHandler, setFormData];
};
