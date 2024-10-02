import React, { FC, useState } from 'react'; 
import ReactQuill from 'react-quill';
import styled from 'styled-components'; 
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  color: string;
}

const TextEditor: FC<TextEditorProps> = ({ value, setValue, color }) => { 

  return (
    <Container noteColor={color}>
      <ReactQuill
        formats={formats}
        modules={modules}
        value={value}
        onChange={setValue}
        placeholder="글을 작성하세요."
      />
    </Container>
  );
};

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "color",
  "background",
  "image",
  "blockquote",
  "code-block",
];

const modules = {
  toolbar: [
    [{ list: "ordered" }, { list: "bullet" }],
    [],
    ["bold", "italic", "underline", "strike"],
    [],
    [{ color: [] }, { background: [] }],
    [],
    ["image", "blockquote", "code-block"],
  ],
};

const Container = styled.div<{ noteColor: string }>` 
  .ql-editor {
    height: 200px;
    background-color: ${({ noteColor }) => noteColor};
  }
`;

export default TextEditor;
