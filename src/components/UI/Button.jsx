import React, { useState } from "react";
import styles from "./Button.module.css";
import "./Login.css";
import $ from "jquery";
export default function Button(props) {
  //props
  // 타이틀
  // 온클릭이벤트
  //optional js
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  return (
    <button
      className={[styles.borderedButton, props.type].join(" ")}
      style={{
        "--margin": props.margin,
        "--top": y + "px",
        "--left": x + "px",
      }}
      onClick={props.onClick}
      type="button"
      onMouseDown={(e) => {
        // console.log(e.nativeEvent.offsetX);
        setX(e.nativeEvent.offsetX);
        setY(e.nativeEvent.offsetY);
      }}
    >
      <div className={styles.floatani}></div>
      <span> {props.title || "button"}</span>
    </button>
  );
}
