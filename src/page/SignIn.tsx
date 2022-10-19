import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const SignIn = () => {
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");

  const navigate = useNavigate();

  const emailInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailData(e.target.value);
  };

  const passwordInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordData(e.target.value);
  };

  const SubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await API.post("auth/signin", {
        email: emailData,
        password: passwordData,
      });
      if (result) {
        localStorage.setItem("token", result.data.access_token);
        alert("정상적으로 로그인 되었습니다.");
        navigate("/todo");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={SubmitHandler}>
        <Input
          id="SignInEmailInput"
          type="text"
          label="이메일 "
          value={emailData}
          onChange={emailInputHandler}
        />
        <Input
          id="SignInPasswordInput"
          type="password"
          label="비밀번호"
          value={passwordData}
          onChange={passwordInputHandler}
        />
        <Button type="submit" id="LoginBtn" value="로그인" />
      </LoginForm>
    </Container>
  );
};

export default SignIn;

const Container = styled.div``;

const LoginForm = styled.form``;
