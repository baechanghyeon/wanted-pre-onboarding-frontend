import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import TodoItem from "../components/TodoItem";

const Todo = () => {
  const [getData, setGetData] = useState([]);
  const [insertData, setInsertData] = useState("");

  useEffect(() => {
    // GET API  result에 저장하여 setGetData Update
  }, []);

  const InputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInsertData(e.target.value);
  };

  const AddBtnHandler = () => {
    // InsertData Post API
    console.log("insertInput 내용 추가");
  };

  return (
    <Container>
      <TodoTemplate>
        <TodoInsert>
          <Input
            type="text"
            id="InsertInput"
            value={insertData}
            placeholder="추가하실 내용을 입력해주세요."
            onChange={InputHandler}
          />
          <Button
            type="button"
            id="InsertBtn"
            value="추가"
            // onClick={AddBtnHandler}
          />
        </TodoInsert>
        <TodoList>
          {/* getData List로 출 */}
          {/* {getData.map((item) => {
            <TodoItem />;
          })} */}
        </TodoList>
      </TodoTemplate>
    </Container>
  );
};

export default Todo;

const Container = styled.div``;

const TodoTemplate = styled.div``;

const TodoInsert = styled.div``;

const TodoList = styled.ul``;
