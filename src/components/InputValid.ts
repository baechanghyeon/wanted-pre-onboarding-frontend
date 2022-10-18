import { useState } from "react";

interface IProp {
  value: string;
}

export const EmailInputValid = ({ value }: IProp) => {
  // @을 포함한 이메일 형식인지 확인
  return value.includes("@");
};

export const PasswordInputValid = ({ value }: IProp) => {
  return value.length >= 8;
};
