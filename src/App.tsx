import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import PrivateRoute from "./components/\bauth/PrivateRoute";
import PublicRoute from "./components/\bauth/PublicRoute";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Todo from "./page/Todo";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyled />
      <Routes>
        <Route path="/" element={<PublicRoute component={<SignIn />} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<PrivateRoute component={<Todo />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

const GlobalStyled = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
}
body {
  background-color: white;
  font-family: 'Noto Sans KR', sans-serif;
}
*, :after, :before {
    box-sizing: border-box;
}
a {
  color: inherit;
  text-decoration: none;
  &:hover,
  &:focus {
    cursor: pointer;
  }
}
button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}
ul,
ol {
  list-style: none;
}
`;
