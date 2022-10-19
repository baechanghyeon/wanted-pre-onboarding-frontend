import React, { useEffect, useState, FormEvent } from "react";
import styled from "styled-components";
import API from "../api/axios";
import Button from "../components/common/Button";
import ErrMsg from "../components/common/ErrMsg";
import Input from "../components/common/Input";
import TodoItem from "../components/Todo/TodoItem";

export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

const Todo = () => {
  const [datas, setDatas] = useState<ITodo[]>([]);
  const [insertData, setInsertData] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await API.get("todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDatas(result.data);
      } catch (err) {
        ErrMsg(err, "다시 한번 시도해주세요.");
      }
    };
    getData();
  }, [setDatas]);

  const AddBtnHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await API.post(
        "todos",
        {
          todo: insertData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newTodo = [...datas, result.data];
      setDatas(newTodo);
      setInsertData("");
      alert("정상적으로 추가 되었습니다.");
    } catch (err) {
      ErrMsg(err, "다시 한번 시도해주세요.");
    }
  };
  return (
    <Container>
      <TodoTemplate>
        <TodoInsert onSubmit={AddBtnHandler}>
          <Input
            type="text"
            id="InsertInput"
            value={insertData}
            placeholder="추가하실 내용을 입력해주세요."
            onChange={(e) => setInsertData(e.target.value)}
          />
          <Button type="submit" id="InsertBtn" value="추가" />
        </TodoInsert>
        <TodoList>
          {datas.map((item) => (
            <TodoItem
              id={item.id}
              todo={item.todo}
              isCompleted={item.isCompleted}
              datas={datas}
              setDatas={setDatas}
            />
          ))}
        </TodoList>
      </TodoTemplate>
    </Container>
  );
};

export default Todo;

const Container = styled.div``;

const TodoTemplate = styled.div``;

const TodoInsert = styled.form``;

const TodoList = styled.div``;
