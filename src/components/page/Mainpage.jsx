import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import CardList from "../list/CardList";
import styles from "./Page.module.css";
import Userprofile from "../list/Userprofile";
import Login from "../UI/Login";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.js";

export default function Mainpage() {
  const nav = useNavigate();
  const [data, setData] = useState([]);

  useEffect(function () {
    let Datas = [];
    db.collection("post")
      .get()
      .then(function (qs) {
        qs.forEach((doc) => {
          Datas.push(doc.data());
        });
        setData(Datas);
      });
  }, []);

  return (
    <div className={styles.Page_Wrapper}>
      <Login></Login>
      <div className={styles.btnContainer}>
        <Button title="글작성" onClick={function () {}}></Button>
      </div>
    </div>
  );
}
