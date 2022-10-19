import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import ErrMsg from "../components/common/ErrMsg";
import PageTitle from "../components/common/PageTitle";

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
      ErrMsg(err, "이메일과 비밀번호를 다시한번 확인해주세요.");
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={SubmitHandler}>
        <PageTitle title="로그인" />
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
        <CButton type="submit" id="LoginBtn" value="로그인" />
        <Link to="/signup">
          <SignUpBtn>회원가입 하셨나요?</SignUpBtn>
        </Link>
      </LoginForm>
    </Container>
  );
};

export default SignIn;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 250px;
  padding: 10px;
  border: 0.5px solid black;
  text-align: left;
`;

const SignUpBtn = styled.span`
  font-size: 15px;
  margin-top: 30px;
  padding: 8px;
`;

const CButton = styled(Button)`
  margin-top: 10px;
  margin-bottom: 10px;
`;
