import axios from "axios";
import React, { useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Button from "../components/Button";
import Input from "../components/Input";
import { EmailInputValid, PasswordInputValid } from "../components/InputValid";

const SignUp = () => {
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [btnState, setBtnState] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (EmailInputValid(emailData) && PasswordInputValid(passwordData)) {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
  }, [emailData, passwordData]);

  const SubmitHandler = async () => {
    try {
      await API.post("/auth/signup", {
        email: emailData,
        password: passwordData,
      });
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <SignUpForm onSubmit={SubmitHandler}>
        <Input
          id="SignUpEmailInput"
          type="text"
          value={emailData}
          placeholder="이메일을 입력하세요."
          label="이메일"
          onChange={(e) => setEmailData(e.target.value)}
        />
        <Input
          id="SignUpPasswordInput"
          type="password"
          value={passwordData}
          placeholder="비밀번호를 입력하세요"
          label="비밀번호"
          onChange={(e) => setPasswordData(e.target.value)}
        />
        <Button
          id="SignUpBtn"
          type="submit"
          value="회원가입"
          disabled={btnState}
        />
      </SignUpForm>
    </Container>
  );
};

export default SignUp;

const Container = styled.div``;

const SignUpForm = styled.form``;
