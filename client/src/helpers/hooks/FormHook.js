import { useState, useCallback } from 'react';

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, setFormState] = useState({
    inputs: initialInputs,
    isFormValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    setFormState(prevState => {
      const updatedInputs = {
        ...prevState.inputs,
        [id]: {
          value,
          isValid,
        },
      };
      let isFormValid = true;
      for (const inputId in updatedInputs) {
        if (!updatedInputs[inputId]?.isValid) {
          // check if the input object exists and has a defined isValid property
          isFormValid = false;
          break;
        }
      }
      return {
        inputs: updatedInputs,
        isFormValid,
      };
    });
  }, []);

  const setFormData = useCallback((inputs, isFormValid) => {
    setFormState({ inputs, isFormValid });
  }, []);

  return [formState, inputHandler, setFormData];
};
