import React, { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "../api/axios";
import Button from "../components/common/Button";
import ErrMsg from "../components/common/ErrMsg";
import Input from "../components/common/Input";
import PageTitle from "../components/common/PageTitle";
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

  const navigate = useNavigate();

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
        ErrMsg(err, "다시 한번 시도 해주세요.");
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
      ErrMsg(err, "다시 한번 시도 해주세요.");
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Container>
      <TodoTemplate>
        <PageTitle title="TODO LIST" />
        <LogoutBtn type="button" value="로그아웃" onClick={logoutHandler} />
        <TodoInsert onSubmit={AddBtnHandler}>
          <CustomInsertInput
            type="text"
            id="InsertInput"
            value={insertData}
            placeholder=" 일정을 추가해 해주세요."
            onChange={(e) => setInsertData(e.target.value)}
          />
          <CustomInsertBtn type="submit" id="InsertBtn" value="추가" />
        </TodoInsert>
        <TodoList>
          {datas.map((item) => (
            <TodoItem
              key={`TodoKey-${item.id}`}
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
`;

const TodoTemplate = styled.div`
  width: 400px;
  height: 30rem;
  padding: 20px;
`;

const TodoInsert = styled.form`
  display: flex;
  padding: 10px;
  border: 1px solid black;
`;

const CustomInsertInput = styled(Input)`
  margin-top: 10px;
  height: 30px;
  width: 250px;
`;

const CustomInsertBtn = styled(Button)`
  margin-top: 13px;
`;
const TodoList = styled.ul`
  list-style: none;
`;

const LogoutBtn = styled.input`
  margin-bottom: 5px;
`;
