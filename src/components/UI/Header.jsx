import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Link } from "react-router-dom";
import logo from "../Img/logo.svg";

export default function Header() {
  const nav = useNavigate();
  return (
    <div className={styles.Header}>
      <div className={styles.Header_Container}>
        <div className={styles.Header_LOGO}>
          <img src={logo} alt="" />{" "}
        </div>
      </div>
    </div>
  );
}
