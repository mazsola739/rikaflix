import styled from '@emotion/styled'
import { charcoalGrey, white, watermelon } from 'styles/variables'

export const CheckboxWrapper = styled.li`
  display: table-cell;

  border-radius: 4px;
  width: auto;
  height: 45px;

  &:hover {
    background-color: ${charcoalGrey + '4D'};
  }
`

export const CheckboxLabel = styled.label`
  position: relative;

  display: block;
  opacity: 0.8;

  margin-top: 10px;

  &:hover {
    opacity: 1;

    cursor: pointer;
  }
`

export const HiddenCheckbox = styled.input`
  position: absolute;

  opacity: 0;

  width: 0;
  height: 0;

  cursor: pointer;
`

export const StyledCheckbox = styled.p`
  position: absolute;
  top: -12px;

  margin-left: 5px;
  border-radius: 1.5px;
  width: 16px;
  height: 16px;

  background-color: ${white};

  ${HiddenCheckbox}:checked + & {
    background-color: ${watermelon};
  }
  ${HiddenCheckbox}:checked + &:after {
    content: '';
    position: absolute;
    top: 1px;
    left: 5px;

    display: block;
    transform: rotate(45deg);

    border: solid white;
    border-width: 0 2.5px 2.5px 0;
    width: 4px;
    height: 10px;

    background-color: ${watermelon};
  }
`

export const StyledLabelName = styled.p`
  margin: 0;
  margin-left: 30px;

  font-size: 20px;
`
