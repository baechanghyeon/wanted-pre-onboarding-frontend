import React, { Dispatch, useEffect, useState, Key } from "react";
import styled, { css } from "styled-components";
import API from "../../api/axios";
import { ITodo } from "../../page/Todo";
import Button from "../common/Button";
import ErrMsg from "../common/ErrMsg";
import Input from "../common/Input";

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
      ErrMsg(err, "다시 한번 시도해주세요.");
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
      ErrMsg(err, "다시한번 시도해주세요.");
    }
  };

  return (
    <>
      <CustomLi>
        {editModeState ? (
          <>
            <CheckBox
              type="checkbox"
              checked={checkState}
              onChange={() => setCheckState(!checkState)}
            />
            <CustomInput
              id={`editInput_${id}`}
              type="text"
              value={todoContent}
              onChange={(e) => setTodoContent(e.target.value)}
            />
            <CustomBtn
              type="button"
              id={`editCompleBtn_${id}`}
              value="수정완료"
              onClick={editCompleteHandler}
            />
            <CustomBtn
              type="button"
              id={`editCancelBtn_${id}`}
              value="수정취소"
              onClick={editDeleteHandler}
            />
          </>
        ) : (
          <EditContainer>
            <Span flag={checkState}>{todoContent}</Span>
            <CustomBtn
              type="button"
              id={`editBtn_${id}`}
              value="수정"
              onClick={editModeHandler}
            />
            <CustomBtn
              type="button"
              id={`deleteBtn_${id}`}
              value="삭제"
              onClick={deleteHandler}
            />
          </EditContainer>
        )}
      </CustomLi>
    </>
  );
};

export default TodoItem;

const CustomLi = styled.li`
  display: flex;
  flex-direction: raw;
  width: 100%;
  margin-top: 10px;
  border: 1px solid black;
`;

const CustomInput = styled(Input)`
  width: 170px;
  margin-left: 10px;
`;

const CustomBtn = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
  width: 60px;
`;

const EditContainer = styled.div`
  width: 100%;
`;

const Span = styled.span<{ flag: boolean }>`
  font-size: 15px;
  padding-left: 20px;
  padding-right: 10px;
  margin: 3px 0 3px 0;
  ${({ flag }) =>
    flag
      ? css`
          color: green;
          text-decoration: line-through;
        `
      : css``}
`;

const CheckBox = styled.input`
  margin-left: 5px;
`;
