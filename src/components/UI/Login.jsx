import React from "react";
import TextInput from "./TextInput";
import ScrollItem from "./ScrollItem";
import "./Login.css";

export default function Login(props) {
  return (
    <div className="LoginContainer">
      <h1> 제18대 온라인 졸업전시 정보 입력 </h1>
      <div className="inputcontainer">
        {" "}
        <input
          className="studentid"
          type="number"
          placeholder=" 학번을 입력해주세요"
        />
        <input
          className="studentid"
          type="text"
          placeholder="이름을 입력해주세요"
        />
      </div>
    </div>
  );
}
