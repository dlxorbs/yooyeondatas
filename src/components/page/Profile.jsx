import React, { useState, useRef, useEffect } from "react";
import symbol from "../Img/symbol1_1.png";
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
export default function Profile(props) {
  const nav = useNavigate();
  const location = useLocation();
  const [toggle, setToggle] = useState(false);

  const [predata, setpreData] = useState(location.state?.data);

  // 이메일 입력 상태 관리
  const [email, setEmail] = useState(location.state?.email);
  const [emaillength, setEmaillength] = useState("");
  // 한 마디 입력 상태 관리
  const [comment, setComment] = useState(location.state?.comment);
  const [commentlength, setCommentlength] = useState("");

  useEffect(() => {
    console.log(predata);

    let Datas = {};
    db.collection("post")
      .doc(predata.studentid + "_" + predata.type)
      .get()
      .then((doc) => {
        if (doc.exists) {
          Datas = doc.data();
        }
        setEmail(Datas.profile.email);
        setComment(Datas.profile.comment);
      });
  }, []);

  const next = async function () {
    // 백그라운드

    const profile = {
      // 이메일 추가
      email: email,
      comment: comment,
    };

    setpreData(profile);

    const docId = await db
      .collection("post")
      .doc(predata.studentid + "_" + predata.type)
      .get();

    if (docId.exists) {
      // 이미 해당 문서가 존재하는 경우 업데이트 로직을 추가
      db.collection("post")
        .doc(predata.studentid + "_" + predata.type)
        .update({
          profile,
        })
        .then(() => {
          console.log(predata);
          nav("/");
        });
    } else {
      // 해당 문서가 없는 경우 새로운 문서를 생성
      db.collection("post")
        .doc(predata.studentid + "_" + predata.type)
        .set({
          profile,
        })
        .then(() => {
          console.log(profile);
          nav("/");
        });
    }
  };

  return (
    <div className={styles.Page_Wrapper}>
      <div className="LoginContainer">
        <h1> 자신의 정보를 입력해 주세요</h1>
        <div className="thumbnail"></div>

        <div className={styles.emailContainer}>
          <span className="text">이메일을 입력하세요</span>
          <input
            className={styles.comment}
            label="email"
            type="email"
            placeholder="이메일을 입력하세요."
            maxLength={60}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              const length = e.target.value.length;
              setEmaillength(length);
              if (length >= 60) {
                e.target.value = e.target.value.substring(0, 60);
                alert("글자초과됨");
              }
            }}
          />
        </div>

        <div className={styles.commentContainer}>
          <span className="text">한마디를 작성해주세요</span>
          <input
            className={styles.comment}
            label="한 마디"
            type="text"
            maxLength={60}
            placeholder="한 마디를 작성해주세요."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              const length = e.target.value.length;
              setCommentlength(length);
              if (length >= 60) {
                e.target.value = e.target.value.substring(0, 60);
                alert("글자초과됨");
              }
            }}
          />
        </div>
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
