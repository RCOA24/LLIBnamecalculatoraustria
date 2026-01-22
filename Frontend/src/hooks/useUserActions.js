import React from 'react';
import { toast } from 'react-hot-toast';

export const useUserActions = (fetchUsers) => {
  const validate = (val) => /^[a-zA-Z\s]+$/.test(val);

  const handleError = (error, defaultMessage) => {
    console.error(error);
    const msg = error.response?.data?.message || defaultMessage;
    toast.error(msg);
  };

  return { validate, handleError };
};
