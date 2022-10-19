import React, { ChangeEventHandler } from "react";

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
    <>
      {label}
      <input {...rest} />
    </>
  );
};

Input.defaultProps = {
  value: "",
  placeholder: "",
  label: "",
};

export default Input;
