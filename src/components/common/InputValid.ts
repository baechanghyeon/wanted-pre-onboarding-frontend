import { useState } from "react";

export const EmailInputValid = (emailData: string) => {
  const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  return regex.test(emailData);
};

export const PasswordInputValid = (passwordData: string) => {
  return passwordData.length >= 8;
};
