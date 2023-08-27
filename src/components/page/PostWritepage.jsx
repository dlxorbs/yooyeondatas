import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import TextInput from "../UI/TextInput";
import Code from "../UI/Code";
import styles from "./Page.module.css";
import $ from "jquery";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { db, storage } from "../../firebase.js";
import Right from "../UI/Right";
import Img from "../UI/Img";
import Left from "../UI/Left";

export default function PostWritePage(props) {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [id, setID] = useState("2018194031");
  const [content, setContent] = useState("");

  const [thumb, setThumb] = useState("");

  // 이미지 적용시 파일들
  const [backimg, setBackimg] = useState("");
  const [backthumb, setbackthumb] = useState("");

  const [reseachimg, setResearchimg] = useState("");
  const [reseachthumb, setReseachthumb] = useState("");

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

  const done = function () {
    //이미지 파이어 스토리지로 넘기기

    // 백그라운드
    var storageRef = storage.ref();
    var root = storageRef.child(id + "/" + "background");
    root.put(backimg).then((img) => {
      getDownloadURL(img.ref).then((url) => {
        console.log(url);
        // 기존 데이터는 남기고 업데이트 하기 위하여 사용
        setBackground((prev) => ({
          ...prev,
          img: url,
        }));
      });
    });

    // 리서치
    var res = storageRef.child(id + "/" + "research");
    res.put(reseachimg).then((img) => {
      getDownloadURL(img.ref).then((url) => {
        setResearch((prev) => ({
          ...prev,
          img: url,
        }));
        console.log(research);
      });
    });

    // // 목표
    // var goals = storageRef.child(id + "/" + "goals");
    // goals.put(file).then((img) => {
    //   getDownloadURL(img.ref)
    //     .then((url) => {
    //       console.log(url);
    //     })
    //     .catch((error) => {
    //       // Handle any errors
    //     });
    // });
    // // 기능1
    // var function1 = storageRef.child(id + "/" + "function01");
    // function1.put(file).then((img) => {
    //   getDownloadURL(img.ref)
    //     .then((url) => {
    //       console.log(url);
    //     })
    //     .catch((error) => {
    //       // Handle any errors
    //     });
    // });
    // // 기능2
    // var function2 = storageRef.child(id + "/" + "function02");
    // function2.put(file).then((img) => {
    //   getDownloadURL(img.ref)
    //     .then((url) => {
    //       console.log(url);
    //     })
    //     .catch((error) => {
    //       // Handle any errors
    //     });
    // });
    // // 기능3
    // var function3 = storageRef.child(id + "/" + "function03");
    // function3.put(file).then((img) => {
    //   getDownloadURL(img.ref)
    //     .then((url) => {
    //       console.log(url);
    //       // 기존 데이터는 남기고 업데이트 하기 위하여 사용
    //     })
    //     .catch((error) => {
    //       // Handle any errors
    //     });
    // });
  };

  const update = () => {
    const timestamp = new Date().getTime().toString();

    db.collection("post")
      .doc(timestamp)
      .set({
        id: id,
        studentinfo: major,
        major: major,
        main: main,
        background: background,
        research: research,
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
          file={"background"}
          head={"Background"}
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
          src={backthumb}
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
          file={"research"}
          head={"Research"}
          onChange={(e) => {
            setResearch((prev) => ({
              ...prev,
              content: e.target.value,
            }));

            e.target.style.height = "30px";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          value={research.content}
          onClickImg={(e) => {
            // file클릭 이벤트 추가
            $("#research").click();
          }}
          display={reseachthumb != "" && "none"}
          src={reseachthumb}
          onChangeImg={(e) => {
            const file = e.target.files[0];
            if (file) {
              setResearchimg(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                const id = new Date().getTime().toString();
                setReseachthumb(e.target.result);
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
            update();
          }}
        />
      </div>
    </div>
  );
}
