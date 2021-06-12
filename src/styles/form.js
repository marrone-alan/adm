import styled from 'styled-components';
import { colors, fontSize, screenSize } from './variables';

export const LabelessInput = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: ${fontSize.md};
  width: 100%;

  @media (min-width: ${screenSize.md}) {
    width: 300px;
  }

  input {
    background: none;
    border: none;
    border-bottom: 1px solid grey;
    padding: 12px 15px;
    margin: 5px 0;
    width: 100%;
  }
`;

export const WrapperLabel = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: ${fontSize.md};
  width: 100%;

  @media (min-width: ${screenSize.md}) {
    width: ${(props) => props.width || '200px'};
  }

  label {
    padding-left: 0.5rem;
  }

  input {
    padding: 8px 15px;
    width: 100%;
  }

  textarea {
    resize: none;
    width: 100%;
  }

  select {
    padding: 8px 15px;
    width: 100%;
  }
`;

export const WrapperLabelRow = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  font-size: ${fontSize.md};
  width: 100%;

  input {
    padding: 8px 15px;
    margin-left: 0.5rem;
    width: auto;
  }
`;

export const WrapperCheckbox = styled.div`
  padding: 0.5rem;
  font-size: ${fontSize.md};
  label {
    padding-left: 0.5rem;
  }
`;

export const WrapperButton = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  font-family: 'Redwing';
  letter-spacing: 0.1rem;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
  color: #fff;
  text-transform: uppercase;
  padding: 0 16px;
  margin: 0.5rem;
  height: 36px;
  font-weight: 600;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  background-color: ${colors.primary};
  cursor: pointer;

  &:disabled {
    background-color: darkgray;
    cursor: not-allowed;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

export const RowForm = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: ${screenSize.md}) {
    flex-direction: column;
    align-items: center;
  }
`;
