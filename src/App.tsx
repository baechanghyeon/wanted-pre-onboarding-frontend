import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const App = () => {
  return (
    <BrowserRouter>
      {/* <BrowserRouter>
      <GlobalStyle />
      <Routes path="/">
        <Route index element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="todoList" element={<TodoList />} />
      </Routes>
    </BrowserRouter> */}
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
