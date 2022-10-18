import React, { MouseEvent, MouseEventHandler } from "react";

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
      <input {...rest} />
    </>
  );
};

Button.defaultProps = { disabled: false, onClick: () => void 0 };

export default Button;
