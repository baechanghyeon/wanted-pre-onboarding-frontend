import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";

interface IProps {
  id: string;
  todo: string;
  isComplete: boolean;
}

const TodoItem = ({ id, todo, isComplete }: IProps) => {
  const [editModeState, setEditModeState] = useState(false);
  const [todoContent, setTodoContent] = useState("");

  useEffect(() => {
    setTodoContent(todo);
  }, [todo]);

  const todoContentHandler = () => {
    // todoContent 내용 변경
  };

  const editModeHandler = () => {
    // 수정모드 관리 버튼
    setEditModeState(!editModeState);
  };

  const deleteHandler = () => {
    // 해당 todo 삭제
  };

  const editCompleteHandler = () => {
    // 수정 완료 버튼
  };

  return (
    <>
      <input type="checkbox" checked={isComplete} />
      {/* 수정 버튼 클릭시 input 으로 변경 해주기 */}
      <li id={id}>
        editModeState ?{" "}
        <Input
          id={`editInput_${id}`}
          type="text"
          value={todoContent}
          onChange={todoContentHandler}
        />{" "}
        : {todoContent}
      </li>
      <Button
        type="button"
        id={`editCompleBtn_${id}`}
        value="수정완료"
        // onClick={editCompleteHandler}
      />
      <Button
        type="button"
        id={`editCancelBtn_${id}`}
        value="수정취소"
        // onClick={editModeHandler}
      />
      <Button
        type="button"
        id={`editBtn_${id}`}
        value="수정"
        // onClick={editModeHandler}
      />
      <Button
        type="button"
        id={`deleteBtn_${id}`}
        value="삭제"
        // onClick={deleteHandler}
      />
    </>
  );
};

export default TodoItem;
