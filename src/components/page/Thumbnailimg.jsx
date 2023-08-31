import React, { useState, useRef, useEffect } from "react";
import symbol from "../Img/symbol.png";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Page.module.css";
import "../UI/Login.css";
import Button from "../UI/Button";
import $ from "jquery";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { db, storage } from "../../firebase";

import ScrollItem from "../UI/ScrollItem";
export default function Thumbnailimg(props) {
  const nav = useNavigate();
  const location = useLocation();
  const [toggle, setToggle] = useState(false);

  const [predata, setpreData] = useState(location.state?.data);
  const [thumb, setThumb] = useState("");
  const [Img, setImg] = useState("");
  const [url, setUrl] = useState("");
  // 학생 데이터 변수 지정
  const [dummy, setDummy] = useState({});

  let thumbUrl;

  //   이전데이터 불러오기
  useEffect(function () {
    let Datas = {};
    db.collection("post")
      .doc(predata.studentid + "_" + predata.type)
      .get()
      .then((doc) => {
        if (doc.exists) {
          Datas = doc.data();
          if (doc.data().data.img != "") {
            setThumb(doc.data().data.img);
          }
        }
        setDummy(Datas);
        console.log(dummy);
      });
  }, []);
  // 작성 처음일 경우 기본이미지

  useEffect(() => {
    console.log(predata, thumbUrl);
  }, [predata]);

  const next = async function () {
    // 백그라운드
    var storageRef = storage.ref();
    // 썸네일 이미지 저장하기

    if (Img) {
      const thumbRef = storageRef.child(
        predata.studentid + "_" + predata.type + "/" + "thumb"
      );
      await thumbRef.put(Img);
      thumbUrl = await getDownloadURL(thumbRef);
      setUrl(thumbUrl);
    }

    const data = {
      studentinfo: predata.studentinfo,
      studentid: predata.studentid,
      major: predata.major,
      type: predata.type,
      img: url,
    };

    setpreData(data);

    const docId = await db
      .collection("post")
      .doc(predata.studentid + "_" + predata.type)
      .get();

    if (docId.exists) {
      // 이미 해당 문서가 존재하는 경우 업데이트 로직을 추가
      db.collection("post")
        .doc(predata.studentid + "_" + predata.type)
        .update({
          data: {
            studentinfo: predata.studentinfo,
            studentid: predata.studentid,
            major: predata.major,
            type: predata.type,
            img: predata.img,
          },
        })
        .then(() => {
          if (thumb != "") {
            nav("/write", {
              state: {
                data: data,
              },
            });
          }
        });
    } else {
      if (thumb != "") {
        // 해당 문서가 없는 경우 새로운 문서를 생성
        db.collection("post")
          .doc(predata.studentid + "_" + predata.type)
          .set({
            data,
          })
          .then(() => {
            if (thumb != "") {
              nav("/write", {
                state: {
                  data: data,
                },
              });
            }
          });
      }
    }
  };

  return (
    <div className={styles.Page_Wrapper}>
      <div className="LoginContainer">
        <h1>썸네일을 작성해주세요.</h1>
        <div className="thumbnail"></div>
        <ScrollItem
          imgwidth={285}
          imgheight={285}
          size={"285X285"}
          file={"thumbnail"}
          onClick={(e) => {
            $("#thumbnail").click();
          }}
          src={thumb}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImg(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                const id = new Date().getTime().toString();
                setThumb(e.target.result);
              };
              reader.readAsDataURL(file);
            }
          }}
          display={thumb != "" && "none"}
        ></ScrollItem>
        <Button
          title="글작성"
          onClick={(e) => {
            next();
          }}
        ></Button>
      </div>
    </div>
  );
}
