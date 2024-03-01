import React from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ErrorToastProps {
    message: string;
}

const StyledErrorToast = styled.div`
  background-color: red;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
`;

function ErrorToast({ message }: ErrorToastProps) {
    return toast.error(<StyledErrorToast>{message}</StyledErrorToast>, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export default ErrorToast;