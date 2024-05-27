import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { slateDarkA } from "@radix-ui/colors";

const InputField = styled.input`
  margin-left: 0.2rem;
  width: 90%;
  padding: 0.5rem;
  font-size: 24px;
  background-color: #ffffff00;
  border: none;
  border-bottom: 2px solid ${slateDarkA.slateA10};
  transition: border-bottom 0.1s;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
  color: white;

  &::placeholder {
    color: ${slateDarkA.slateA8}; /* placeholder 색상 변경 */
    font-size: 20px; /* placeholder 크기 변경 */
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid ${slateDarkA.slateA12};
  }
`;

interface TextAreaProps {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <InputField
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
