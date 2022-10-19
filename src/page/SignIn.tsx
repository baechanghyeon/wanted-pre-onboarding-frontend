import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import ErrMsg from "../components/common/ErrMsg";

const SignIn = () => {
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");

  const navigate = useNavigate();

  const emailInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailData(e.target.value);
    // email Valid alert Message
    if (e.target.value === "") {
      alert("이메일을 입력해주세요.");
    }
  };

  const passwordInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordData(e.target.value);
    // password Valid alert Message
    if (e.target.value === "") {
      alert("비밀번호를 입력해주세요.");
    }
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
      // 이메일과 비밀번호를 확인해주세요
      ErrMsg(err, "이메일과 비밀번호를 다시한번 확인해주세요.");
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
      <Link to="/signup">
        <span>회원가입 하셨나요?</span>
      </Link>
    </Container>
  );
};

export default SignIn;

const Container = styled.div``;

const LoginForm = styled.form``;
