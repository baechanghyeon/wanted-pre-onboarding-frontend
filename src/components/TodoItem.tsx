import React, { Dispatch, useEffect, useState } from "react";
import styled from "styled-components";
import API from "../api/axios";
import { ITodo } from "../page/Todo";
import Button from "./Button";
import Input from "./Input";

interface IProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  datas: ITodo[];
  setDatas: Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoItem = ({ id, todo, isCompleted, datas, setDatas }: IProps) => {
  const [editModeState, setEditModeState] = useState(false);
  const [todoContent, setTodoContent] = useState(todo);
  const [checkState, setCheckState] = useState(isCompleted);
  const token = localStorage.getItem("token");

  const editModeHandler = () => {
    setEditModeState(!editModeState);
  };

  const editDeleteHandler = () => {
    // 수정 취소 시 이전 값으로 초기화
    setTodoContent(todo);
    setCheckState(isCompleted);
    setEditModeState(!editModeState);
  };

  const deleteHandler = async () => {
    try {
      await API.delete(`todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("정상적으로 삭제 되었습니다.");
      const newTodo = datas.filter((data) => data.id !== id);
      setDatas(newTodo);
    } catch (err) {
      console.log(err);
    }
  };

  const editCompleteHandler = async () => {
    // 수정 완료 버튼
    try {
      const result = await API.put(
        `todos/${id}`,
        {
          todo: todoContent,
          isCompleted: checkState,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result) {
        setTodoContent(todoContent);
        setCheckState(checkState);
        setEditModeState(!editModeState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <li key={`Todo_key_${id}`} id={`Todo_${id}`}>
        {editModeState ? (
          <>
            <input
              type="checkbox"
              checked={checkState}
              onChange={() => setCheckState(!checkState)}
            />
            <Input
              id={`editInput_${id}`}
              type="text"
              value={todoContent}
              onChange={(e) => setTodoContent(e.target.value)}
            />
            <Button
              type="button"
              id={`editCompleBtn_${id}`}
              value="수정완료"
              onClick={editCompleteHandler}
            />
            <Button
              type="button"
              id={`editCancelBtn_${id}`}
              value="수정취소"
              onClick={editDeleteHandler}
            />
          </>
        ) : (
          <>
            <span>{todoContent}</span>
            <Button
              type="button"
              id={`editBtn_${id}`}
              value="수정"
              onClick={editModeHandler}
            />
            <Button
              type="button"
              id={`deleteBtn_${id}`}
              value="삭제"
              onClick={deleteHandler}
            />
          </>
        )}
      </li>
    </>
  );
};

export default TodoItem;
