import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import TextInput from "../UI/TextInput";
import styles from "./Page.module.css";
import $ from "jquery";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import symbol from "../Img/symbol.png";
import symbol1200 from "../Img/1200symbol.png";
import { db, storage } from "../../firebase.js";
import Right from "../UI/Right";
import Left from "../UI/Left";
import Center from "../UI/Center";

export default function PostWritePage(props) {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [id, setID] = useState("2018194031");
  const [content, setContent] = useState("");

  const [thumb, setThumb] = useState("");

  // 이미지 적용시 파일들
  const [backimg, setBackimg] = useState("");
  const [backthumb, setbackthumb] = useState("");

  const [researchimg, setResearchimg] = useState("");
  const [researchthumb, setResearchthumb] = useState("");

  // 텍스트 길이 제한
  const [backtext, setBacktext] = useState("");
  const [restext, setRestext] = useState("");
  const [goaltext, setGoaltext] = useState("");

  // 학생 데이터 변수 지정
  const [stundetinfo, setStundetinfo] = useState("");
  const [major, setMajor] = useState("");
  const [main, setMain] = useState({
    works: "",
    img: "",
    oneline: "",
  });

  const [background, setBackground] = useState({
    img: "",
    content: "",
  });
  const [research, setResearch] = useState({
    img: "",
    content: "",
  });
  const [goal, setGoal] = useState({
    img: "",
    content: "",
  });

  const done = async function () {
    //이미지 파이어 스토리지로 넘기기

    // 백그라운드
    var storageRef = storage.ref();
    // 백그라운드 이미지 업로드
    const backgroundRef = storageRef.child(id + "/" + "background");
    await backgroundRef.put(backimg);
    const backgroundUrl = await getDownloadURL(backgroundRef);

    // 리서치 이미지 업로드
    const researchRef = storageRef.child(id + "/" + "research");
    await researchRef.put(researchimg);
    const researchUrl = await getDownloadURL(researchRef);

    db.collection("post")
      .doc(id)
      .set({
        id: id,
        studentinfo: major,
        major: major,
        main: main,
        background: {
          img: backgroundUrl,
          content: background.content,
        },
        research: {
          img: researchUrl,
          content: research.content,
        },
        goals: goal,
        function: [
          {
            img: "이미지 주소",
            content:
              "안녕하세요, 소플입니다.\n이번 글에서는 리액트에서 리스트를 렌더링하는 방법에 대해서 배워보겠습니다.",
          },
          {
            img: "이미지 주소",
            content:
              "안녕하세요, 소플입니다.\n이번 글에서는 리액트에서 리스트를 렌더링하는 방법에 대해서 배워보겠습니다.",
          },
          {
            img: "이미지 주소",
            content:
              "안녕하세요, 소플입니다.\n이번 글에서는 리액트에서 리스트를 렌더링하는 방법에 대해서 배워보겠습니다.",
          },
        ],
        video: "비디오 주소",
      })
      .then(() => {
        nav("/");
      });
  };

  return (
    <div className={styles.Page_Wrapper}>
      <div className={styles.Page_SecondWrapper}>
        <TextInput
          height={44}
          minheight={116}
          fontsize={42}
          fontweight={700}
          placeholder={"작품제목을 입력해주세요."}
          lineheight={100}
          value={title}
          margin="24px 0px 0px"
          onChange={function (e) {
            setTitle(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />

        <Left
          size={"590X460"}
          imgwidth={590}
          imgheight={460}
          file={"background"}
          head={"Background"}
          width={550}
          onChange={(e) => {
            setBackground((prev) => ({
              ...prev,
              content: e.target.value,
            }));

            console.log(e.target.value.length);
            const length = e.target.value.substring(0, 525);
            setBacktext(length);
            if (length >= 525) {
              alert("글자초과됨");
            }
          }}
          text={backtext}
          value={background.content}
          onClickImg={(e) => {
            // file클릭 이벤트 추가
            $("#background").click();
          }}
          display={backthumb != "" && "none"}
          src={backthumb || symbol}
          onChangeImg={(e) => {
            const file = e.target.files[0];
            if (file) {
              setBackimg(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                const id = new Date().getTime().toString();
                setbackthumb(e.target.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />

        <Right
          size={"590X460"}
          imgwidth={590}
          imgheight={460}
          file={"research"}
          head={"Research"}
          width={550}
          onChange={(e) => {
            setResearch((prev) => ({
              ...prev,
              content: e.target.value,
            }));
            const length = e.target.value.substring(0, 525);
            setRestext(length);
            if (length >= 525) {
              alert("글자초과됨");
            }
          }}
          text={restext}
          value={research.content}
          onClickImg={(e) => {
            // file클릭 이벤트 추가
            $("#research").click();
          }}
          display={researchthumb != "" && "none"}
          src={researchthumb || symbol}
          onChangeImg={(e) => {
            const file = e.target.files[0];
            if (file) {
              setResearchimg(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                const id = new Date().getTime().toString();
                setResearchthumb(e.target.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />

        <Center
          size={"1200X460"}
          imgwidth={1200}
          imgheight={460}
          file={"background"}
          head={"Background"}
          width={550}
          onChange={(e) => {
            setBackground((prev) => ({
              ...prev,
              content: e.target.value,
            }));

            e.target.style.height = "30px";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          value={background.content}
          onClickImg={(e) => {
            // file클릭 이벤트 추가
            $("#background").click();
          }}
          display={backthumb != "" && "none"}
          src={backthumb || symbol1200}
          onChangeImg={(e) => {
            const file = e.target.files[0];
            if (file) {
              setBackimg(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                const id = new Date().getTime().toString();
                setbackthumb(e.target.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>

      <div className={styles.btnContainer}>
        <Button
          title="작성하기"
          onClick={() => {
            // 텍스트 영역에서 추가 후 입력이 안되었을 때 내용을 입력해 달라는 식 추가
            // content == "" || title == ""
            //   ? alert("내용을 입력해주세요."):
            done();
          }}
        />
      </div>
    </div>
  );
}
