import React, { ChangeEventHandler } from "react";
import styled from "styled-components";

interface InputProps {
  id: string;
  type: string;
  value?: string;
  placeholder?: string;
  label?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ label, ...rest }: InputProps) => {
  return (
    <Containter>
      {label}
      <CustomInput {...rest} />
    </Containter>
  );
};

Input.defaultProps = {
  value: "",
  placeholder: "",
  label: "",
};

export default Input;

const Containter = styled.div`
  margin: 3px;
`;

const CustomInput = styled.input`
  height: 25px;
  width: 100%;
  font-size: 15px;
  margin: 3px 0 3px 0;
`;
