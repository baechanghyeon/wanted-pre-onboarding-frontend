import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Button from "../components/Button";
import Input from "../components/Input";

const SignUp = () => {
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [btnState, setBtnState] = useState(false);

  const navigate = useNavigate();

  const EmailInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailData(e.target.value);
  };

  const PasswordInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordData(e.target.value);
  };

  const SubmitHandler = async () => {
    // axios.config 설정 ( instance 설정 )
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
          onChange={EmailInputHandler}
        />
        <Input
          id="SignUpPasswordInput"
          type="password"
          value={passwordData}
          placeholder="비밀번호를 입력하세요"
          label="비밀번호"
          onChange={PasswordInputHandler}
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
