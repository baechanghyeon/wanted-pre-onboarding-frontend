import axios from "axios";
import React, { useState, useEffect, FormEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import {
  EmailInputValid,
  PasswordInputValid,
} from "../components/common/InputValid";
import ErrMsg from "../components/common/ErrMsg";
import Title from "../components/common/PageTitle";
import PageTitle from "../components/common/PageTitle";

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

  const SubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", {
        email: emailData,
        password: passwordData,
      });
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } catch (err) {
      ErrMsg(err, "이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <Container>
      <SignUpForm onSubmit={SubmitHandler}>
        <PageTitle title="회원가입" />
        <Input
          id="SignUpEmailInput"
          type="text"
          value={emailData}
          placeholder=" 이메일을 입력하세요."
          label="이메일"
          onChange={(e) => setEmailData(e.target.value)}
        />
        <Input
          id="SignUpPasswordInput"
          type="password"
          value={passwordData}
          placeholder=" 비밀번호를 입력하세요"
          label="비밀번호"
          onChange={(e) => setPasswordData(e.target.value)}
        />
        <Button
          id="SignUpBtn"
          type="submit"
          value="회원가입"
          disabled={btnState}
        />
        <Button
          id="BackBtn"
          type="button"
          value="되돌아가기"
          onClick={() => navigate("/")}
        />
      </SignUpForm>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 230px;
  padding: 10px;
  border: 0.5px solid black;
  text-align: left;
`;
