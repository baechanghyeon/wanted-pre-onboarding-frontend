import React, { MouseEvent, MouseEventHandler } from "react";
import styled from "styled-components";

interface IProps {
  type: string;
  id: string;
  value: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}

const Button = ({ ...rest }: IProps) => {
  return (
    <>
      <CustomInput {...rest} />
    </>
  );
};

Button.defaultProps = { disabled: false, onClick: () => void 0 };

export default Button;

const CustomInput = styled.input`
  height: 30px;
  width: 100%;
  font-size: 15px;
  margin: 3px 0 3px 0;
  padding-bottom: 20;
`;
