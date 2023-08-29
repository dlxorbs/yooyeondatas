import { React, useState } from "react";
import TextInput from "./TextInput";
import ScrollItem from "./ScrollItem";
import "./Login.css";
import Button from "../UI/Button";
import $ from "jquery";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const nav = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [radioChecked, setRadioChecked] = useState(false);

  const [click, setClick] = useState("전공을 선택해주세요");
  // 학생 데이터 변수 지정
  const [studentinfo, setStundetInfo] = useState("");
  const [studentid, setStundetId] = useState("");
  const [major, setMajor] = useState("");

  const data = {
    studentinfo: studentinfo,
    studentid: studentid,
    major: major,
    type: radioChecked,
  };
  const next = async function () {
    await db
      .collection("post")
      .doc(studentid + "_" + radioChecked)
      .set({
        data,
      })
      .then(() => {
        if (
          click != "전공을 선택해주세요" &&
          $(".studentinfo").val() != "" &&
          $(".studentid").val() != "" &&
          radioChecked
        ) {
          nav("/write");
          console.log($(".studentid").val());
          console.log(radioChecked);
        } else {
          if (click == "전공을 선택해주세요") {
            alert("전공을 선택해주세요");
          }
          if ($(".studentinfo").val() == "") {
            alert("이름을 입력해주세요");
          }
          if ($(".studentid").val() == "") {
            alert("학번을 입력해주세요");
          }
          if (radioChecked == false) {
            alert("작품정보를 입력해주세요");
          }
        }
      });
  };

  return (
    <div className="LoginContainer">
      <h1> 제18대 온라인 졸업전시 정보 입력 </h1>
      <form className="inputcontainer" onSubmit={(e) => {}}>
        <div className="radio">
          <input
            id="s"
            type="radio"
            name="team"
            value="s"
            checked={radioChecked === "s"}
            onChange={() => setRadioChecked("s")}
          />
          <label htmlFor="s">
            <div className="radiobtn"> 개인작</div>
          </label>

          <input
            id="t"
            type="radio"
            name="team"
            value="t"
            checked={radioChecked === "t"}
            onChange={() => setRadioChecked("t")}
          />
          <label htmlFor="t">
            <div className="radiobtn"> 팀작</div>
          </label>
        </div>
        <input
          className="studentid"
          type="number"
          placeholder=" 학번을 입력해주세요"
          onChange={(e) => {
            setStundetId(e.target.value);
          }}
        />
        <input
          className="studentinfo"
          type="text"
          placeholder="이름을 입력해주세요"
          onChange={(e) => {
            setStundetInfo(e.target.value);
          }}
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
                  setMajor(e.target.value);
                  setToggle(false);
                }}
              >
                산업디자인공학
              </li>
              <li
                value="미디어디자인공학"
                onClick={(e) => {
                  setClick("미디어디자인공학");
                  setMajor(e.target.value);
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
      </form>
      <Button
        title="글작성"
        onClick={(e) => {
          next();
        }}
      ></Button>
    </div>
  );
}
