import React from "react";
import styled from "styled-components";

interface IProp {
  title: string;
}

const PageTitle = ({ title }: IProp) => {
  return <TitleName>{title}</TitleName>;
};

export default PageTitle;

const TitleName = styled.h1`
  display: flex;
  font-size: 30px;
  align-items: center;
  justify-content: center;
`;
