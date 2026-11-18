import styled from '@emotion/styled'
import { watermelon } from 'styles/variables'

export const FormFieldContainer = styled.div`
  min-height: 140px;
  padding: 10px 0;
`

export const FormFieldLabelName = styled.h5`
  margin: 0 0 15px;

  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  text-transform: uppercase;
  color: ${watermelon};
`

export const FormFieldError = styled.div`
  display: inline-block;

  margin-top: 10px;

  font-size: 16px;
  color: ${watermelon};
`
