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
import symbol700 from "../Img/700symbol.png";
import symbol1200 from "../Img/1200symbol.png";
import symbol1920 from "../Img/1920symbol.png";
import { db, storage } from "../../firebase.js";
import MainImg from "../UI/MainImage";
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
  const [mainimg, setMainimg] = useState("");
  const [mainthumb, setMainthumb] = useState("");

  const [backimg, setBackimg] = useState("");
  const [backthumb, setbackthumb] = useState("");

  const [researchimg, setResearchimg] = useState("");
  const [researchthumb, setResearchthumb] = useState("");

  const [goalimg, setGoalimg] = useState("");
  const [goalthumb, setGoalthumb] = useState("");

  const [function01img, setFunction01img] = useState("");
  const [function01thumb, setFunction01thumb] = useState("");

  const [function02img, setFunction02img] = useState("");
  const [function02thumb, setFunction02thumb] = useState("");

  const [function03img, setFunction03img] = useState("");
  const [function03thumb, setFunction03thumb] = useState("");

  // 텍스트 길이 제한
  const [maintext, setMaintext] = useState("");
  const [onelinetext, setOnelinetext] = useState("");
  const [backtext, setBacktext] = useState("");
  const [restext, setRestext] = useState("");
  const [goaltext, setGoaltext] = useState("");
  const [func01text, setFunc01text] = useState("");
  const [func02text, setFunc02text] = useState("");
  const [func03text, setFunc03text] = useState("");
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

  const [func, setFunc] = useState([
    {
      img: "",
      content: "",
    },
    {
      img: "",
      content: "",
    },
    {
      img: "",
      content: "",
    },
  ]);

  const ContentChange = (index, value) => {
    setFunc((prevFunc) => {
      const updatedFunc = [...prevFunc];
      updatedFunc[index].content = value;
      return updatedFunc;
    });
  };

  const done = async function () {
    //이미지 파이어 스토리지로 넘기기

    // 백그라운드
    var storageRef = storage.ref();

    // 백그라운드 이미지 업로드
    const mainRef = storageRef.child(id + "/" + "main");
    await mainRef.put(mainimg);
    const mainUrl = await getDownloadURL(mainRef);

    // 백그라운드 이미지 업로드
    const backgroundRef = storageRef.child(id + "/" + "background");
    await backgroundRef.put(backimg);
    const backgroundUrl = await getDownloadURL(backgroundRef);

    // 리서치 이미지 업로드
    const researchRef = storageRef.child(id + "/" + "research");
    await researchRef.put(researchimg);
    const researchUrl = await getDownloadURL(researchRef);

    // 골 이미지 업로드
    const goalRef = storageRef.child(id + "/" + "goal");
    await goalRef.put(goalimg);
    const goalUrl = await getDownloadURL(goalRef);

    // 기능 이미지 업로드
    const function01Ref = storageRef.child(id + "/" + "function01");
    await function01Ref.put(function01img);
    const function01Url = await getDownloadURL(function01Ref);

    const function02Ref = storageRef.child(id + "/" + "function02");
    await function02Ref.put(function02img);
    const function02Url = await getDownloadURL(function02Ref);

    const function03Ref = storageRef.child(id + "/" + "function03");
    await function03Ref.put(function03img);
    const function03Url = await getDownloadURL(function03Ref);

    db.collection("post")
      .doc(id)
      .set({
        id: id,
        studentinfo: major,
        major: major,
        main: {
          works: main.works,
          img: mainUrl,
          oneline: main.oneline,
        },
        background: {
          img: backgroundUrl,
          content: background.content,
        },
        research: {
          img: researchUrl,
          content: research.content,
        },
        goals: {
          img: goalUrl,
          content: goal.content,
        },
        func: [
          {
            img: function01Url,
            content: func[0].content,
          },
          {
            img: function02Url,
            content: func[1].content,
          },
          {
            img: function03Url,
            content: func[2].content,
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
      <MainImg
        size={"3:1 비율의"}
        file={"main"}
        onChangeTitle={(e) => {
          setMain((prev) => ({
            ...prev,
            works: e.target.value,
          }));
          console.log(e.target.value.length);
          const length = e.target.value.length;
          setMaintext(length);
          if (length >= 525) {
            e.target.value = e.target.value.substring(0, 525);
            alert("글자초과됨");
          }
        }}
        onChangeinfo={(e) => {
          setMain((prev) => ({
            ...prev,
            oneline: e.target.value,
          }));
          console.log(e.target.value.length);
          const length = e.target.value.length;
          setOnelinetext(length);
          if (length >= 525) {
            e.target.value = e.target.value.substring(0, 525);
            alert("글자초과됨");
          }
        }}
        textTitle={maintext}
        valueTitle={main.works}
        textOneline={onelinetext}
        valueOneline={main.oneline}
        onClick={(e) => {
          // file클릭 이벤트 추가
          $("#main").click();
        }}
        display={mainthumb != "" && "none"}
        src={mainthumb || symbol1920}
        onChangeImg={(e) => {
          const file = e.target.files[0];
          if (file) {
            setMainimg(file);
            const reader = new FileReader();
            reader.onload = (e) => {
              const id = new Date().getTime().toString();
              setMainthumb(e.target.result);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <div className={styles.Page_SecondWrapper}>
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
            const length = e.target.value.length;
            setBacktext(length);
            if (length >= 525) {
              e.target.value = e.target.value.substring(0, 525);
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
            const length = e.target.value.length;
            setRestext(length);
            if (length >= 525) {
              alert("글자초과됨");
              e.target.value = e.target.value.substring(0, 525);
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
          file={"goal"}
          head={"Goal"}
          width={550}
          text={goaltext}
          onChange={(e) => {
            setGoal((prev) => ({
              ...prev,
              content: e.target.value,
            }));

            const length = e.target.value.length;
            setGoaltext(length);
            if (length >= 230) {
              alert("글자초과됨");
              e.target.value = e.target.value.substring(0, 230);
            }
          }}
          value={goal.content}
          onClickImg={(e) => {
            // file클릭 이벤트 추가
            $("#goal").click();
          }}
          display={goalthumb != "" && "none"}
          src={goalthumb || symbol1200}
          onChangeImg={(e) => {
            const file = e.target.files[0];
            if (file) {
              setGoalimg(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                const id = new Date().getTime().toString();
                setGoalthumb(e.target.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        {/* /기능01/ */}

        <Left
          size={"752X500"}
          imgwidth={752}
          imgheight={500}
          file={"function01"}
          head={"Function01"}
          width={373}
          onChange={(e) => {
            const { value } = e.target;
            ContentChange(0, value); // 첫 번째 func 요소에 content 업데이트

            const length = e.target.value.length;
            setFunc01text(length);
            if (length >= 525) {
              e.target.value = e.target.value.substring(0, 525);
              alert("글자초과됨");
            }
          }}
          text={func01text}
          value={func[0].content}
          onClickImg={(e) => {
            // file클릭 이벤트 추가
            $("#function01").click();
          }}
          display={function01thumb != "" && "none"}
          src={function01thumb || symbol700}
          onChangeImg={(e) => {
            const file = e.target.files[0];
            if (file) {
              setFunction01img(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                const id = new Date().getTime().toString();
                setFunction01thumb(e.target.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        {/* 기능 02 */}
        <Right
          size={"752X500"}
          imgwidth={752}
          imgheight={500}
          file={"function02"}
          head={"Function02"}
          width={373}
          onChange={(e) => {
            const { value } = e.target;
            ContentChange(1, value); // 첫 번째 func 요소에 content 업데이트

            const length = e.target.value.length;
            setFunc02text(length);
            if (length >= 525) {
              e.target.value = e.target.value.substring(0, 525);
              alert("글자초과됨");
            }
          }}
          text={func02text}
          value={func[1].content}
          onClickImg={(e) => {
            // file클릭 이벤트 추가
            $("#function02").click();
          }}
          display={function02thumb != "" && "none"}
          src={function02thumb || symbol700}
          onChangeImg={(e) => {
            const file = e.target.files[0];
            if (file) {
              setFunction02img(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                setFunction02thumb(e.target.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        {/* 기능 03 */}
        <Left
          size={"752X500"}
          imgwidth={752}
          imgheight={500}
          file={"function03"}
          head={"Function03"}
          width={373}
          onChange={(e) => {
            const { value } = e.target;
            ContentChange(2, value); // 첫 번째 func 요소에 content 업데이트

            const length = e.target.value.length;
            setFunc03text(length);
            if (length >= 525) {
              e.target.value = e.target.value.substring(0, 525);
              alert("글자초과됨");
            }
          }}
          text={func03text}
          value={func[2].content}
          onClickImg={(e) => {
            // file클릭 이벤트 추가
            $("#function03").click();
          }}
          display={function03thumb != "" && "none"}
          src={function03thumb || symbol700}
          onChangeImg={(e) => {
            const file = e.target.files[0];
            if (file) {
              setFunction03img(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                const id = new Date().getTime().toString();
                setFunction03thumb(e.target.result);
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
