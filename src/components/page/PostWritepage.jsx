import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [title, setTitle] = useState("");
  // useLocation을 이용하여 로그인 데이터를 불러오기
  const [data, setData] = useState(location.state?.data);
  const [id, setID] = useState("2018194031");
  const [content, setContent] = useState("");

  const [thumb, setThumb] = useState("");

  // 이미지 적용시 파일들
  const [mainimg, setMainimg] = useState("");
  const [mainthumb, setMainthumb] = useState(symbol1920);

  const [backimg, setBackimg] = useState("");
  const [backthumb, setbackthumb] = useState(symbol);

  const [researchimg, setResearchimg] = useState("");
  const [researchthumb, setResearchthumb] = useState(symbol);

  const [goalimg, setGoalimg] = useState("");
  const [goalthumb, setGoalthumb] = useState(symbol1200);

  const [function01img, setFunction01img] = useState("");
  const [function01thumb, setFunction01thumb] = useState(symbol700);

  const [function02img, setFunction02img] = useState("");
  const [function02thumb, setFunction02thumb] = useState(symbol700);

  const [function03img, setFunction03img] = useState("");
  const [function03thumb, setFunction03thumb] = useState(symbol700);

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
  const [student, setStudent] = useState(data);
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
  let mainUrl,
    backgroundUrl,
    researchUrl,
    goalUrl,
    function01Url,
    function02Url,
    function03Url;

  useEffect(() => {
    console.log(function03Url);
  }, [function03Url]);

  // 작성했던 데이터 불러오기
  useEffect(function () {
    console.log(data);
    let Datas = {};
    db.collection("post")
      .doc(data.studentid + "_" + data.type)
      .get()
      .then((doc) => {
        if (doc.exists) {
          Datas = doc.data();
          setMainthumb(Datas.main?.img || symbol1920); // Datas.mainImg는 받아온 데이터의 필드명에 따라 수정해야 합니다.
          setbackthumb(Datas.background?.img || symbol);
          setResearchthumb(Datas.research?.img || symbol);
          setGoalthumb(Datas.goals?.img || symbol1200);
          setFunction01thumb(
            Datas.func && Datas.func[0] && Datas.func[0].img
              ? Datas.func[0].img
              : symbol700
          );
          setFunction02thumb(
            Datas.func && Datas.func[1] && Datas.func[1].img
              ? Datas.func[1].img
              : symbol700
          );
          setFunction03thumb(
            Datas.func && Datas.func[2] && Datas.func[2].img
              ? Datas.func[2].img
              : symbol700
          );
        }
      });
  }, []);

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

    // 이미지 업로드와 URL 저장 부분
    if (mainimg) {
      const mainRef = storageRef.child(
        data.studentid + "_" + data.type + "/" + "main"
      );
      await mainRef.put(mainimg);
      mainUrl = await getDownloadURL(mainRef);
    }
    if (backimg) {
      const backgroundRef = storageRef.child(
        data.studentid + "_" + data.type + "/" + "background"
      );
      await backgroundRef.put(backimg);
      backgroundUrl = await getDownloadURL(backgroundRef);
    }
    if (researchimg) {
      const researchRef = storageRef.child(
        data.studentid + "_" + data.type + "/" + "research"
      );
      await researchRef.put(researchimg);
      researchUrl = await getDownloadURL(researchRef);
    }
    if (goalimg) {
      const goalRef = storageRef.child(
        data.studentid + "_" + data.type + "/" + "goal"
      );
      await goalRef.put(goalimg);
      goalUrl = await getDownloadURL(goalRef);
    }
    if (function01img) {
      const function01Ref = storageRef.child(
        data.studentid + "_" + data.type + "/" + "function01"
      );
      await function01Ref.put(function01img);
      function01Url = await getDownloadURL(function01Ref);
    }
    if (function02img) {
      const function02Ref = storageRef.child(
        data.studentid + "_" + data.type + "/" + "function02"
      );
      await function02Ref.put(function02img);
      function02Url = await getDownloadURL(function02Ref);
    }
    if (function03img) {
      const function03Ref = storageRef.child(
        data.studentid + "_" + data.type + "/" + "function03"
      );
      await function03Ref.put(function03img);
      function03Url = await getDownloadURL(function03Ref);
    }

    // db 업데이트 부분
    const docId = await db
      .collection("post")
      .doc(data.studentid + "_" + data.type)
      .get();

    const updatedData = {
      main: {
        works: main.works,
        img: mainUrl !== undefined ? mainUrl : "",
        oneline: main.oneline,
      },
      background: {
        img: backgroundUrl !== undefined ? backgroundUrl : "", // 유효한 URL이 없을 경우에는 빈 문자열로 설정
        content: background.content,
      },
      research: {
        img: researchUrl !== undefined ? researchUrl : "",
        content: research.content,
      },
      goals: {
        img: goalUrl !== undefined ? goalUrl : "",
        content: goal.content,
      },
      func: [
        {
          img: function01Url !== undefined ? function01Url : "",
          content: func[0].content,
        },
        {
          img: function02Url !== undefined ? function02Url : "",
          content: func[1].content,
        },
        {
          img: function03Url !== undefined ? function03Url : "",
          content: func[2].content,
        },
      ],
      video: "비디오 주소",
    };
    console.log(updatedData);

    if (docId.exists) {
      db.collection("post")
        .doc(data.studentid + "_" + data.type)
        .update(updatedData)
        .then(() => {
          nav("/");
        });
    } else {
      db.collection("post")
        .doc(data.studentid + "_" + data.type)
        .set(updatedData)
        .then(() => {
          nav("/");
        });
    }
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
          console.log(data);
        }}
        display={mainthumb != "" && "none"}
        src={mainthumb}
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
          src={researchthumb}
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
          src={goalthumb}
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
          src={function01thumb}
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
          src={function02thumb}
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
          src={function03thumb}
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
        {/* <Left
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
          src={function03thumb}
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
        /> */}
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
