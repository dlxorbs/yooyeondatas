import { React, useState } from "react";
import TextInput from "./TextInput";
import ScrollItem from "./ScrollItem";
import "./Login.css";
import Button from "../UI/Button";
import $ from "jquery";

export default function Login(props) {
  const [toggle, setToggle] = useState(false);

  const [click, setClick] = useState("전공을 선택해주세요");
  return (
    <div className="LoginContainer">
      <h1> 제18대 온라인 졸업전시 정보 입력 </h1>
      <div className="inputcontainer">
        <div className="radio">
          <input id="s" type="radio" name="team" value="s" />
          <label htmlFor="s">
            <div className="radiobtn"> 개인작</div>
          </label>

          <input id="t" type="radio" name="team" value="t" />
          <label htmlFor="t">
            <div className="radiobtn"> 팀작</div>
          </label>
        </div>
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
        <ul>
          <button
            className={`major ${toggle ? "open" : ""}`}
            type="button"
            onClick={(e) => {
              setToggle(!toggle);
              console.log(toggle);
            }}
          >
            {click}
          </button>
          {toggle ? (
            <div className="majorcontainer">
              <li
                value="산업디자인공학"
                onClick={(e) => {
                  setClick("산업디자인공학");
                  setToggle(false);
                }}
              >
                산업디자인공학
              </li>
              <li
                value="미디어디자인공학"
                onClick={(e) => {
                  setClick("미디어디자인공학");
                  setToggle(false);
                }}
              >
                미디어디자인공학
              </li>
            </div>
          ) : (
            ""
          )}
        </ul>
      </div>
      <Button title="글작성" onClick={props.onClick}></Button>
    </div>
  );
}
