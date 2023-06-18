import { ErrorMessage } from './Error.styled';

export const ErrorPhoneMessage = () => {
  return (
    <ErrorMessage>
      Please enter a valid phone number in an international format. <br />
      Example: +380 501234567
    </ErrorMessage>
  );
};
