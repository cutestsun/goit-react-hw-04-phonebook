import styled from 'styled-components';
import { Form as FormikForm } from 'formik';

export const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  width: 245px;
  gap: 12px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
