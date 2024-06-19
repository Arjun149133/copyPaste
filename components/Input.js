"use client";
import React, { useCallback, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from "@uiw/codemirror-theme-okaidia";

const Input = ({ code, setCode }) => {
  const onChange = useCallback((val, ViewUpdate) => {
    console.log("val: ", val);
    setCode(val);
  }, []);

  return (
    <div className=" mt-7 px-5 w-screen">
      <div className="h-full">
        <div className=" mx-7">
          <CodeMirror
            value={code}
            onChange={onChange}
            height="476px"
            theme={okaidia}
            extensions={[javascript({ jsx: true })]}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
