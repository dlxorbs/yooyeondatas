import React from "react";
import styles from "./Scroll.module.css";
import symbol from "../Img/symbol.png";
import symbol1200 from "../Img/1200symbol.png";
export default function ScrollItem(props) {
  return (
    <div
      className={[styles.scrollitem, props.content].join(" ")}
      style={{
        "--imgwidth": props.imgwidth + "px",
        "--imgheight": props.imgheight + "px",
      }}
      onClick={props.onClick}
    >
      <span style={{ display: props.display, textAlign: "center" }}>
        {props.size}
        <br />
        <br /> 이미지를 추가해주세요
      </span>
      {/* {props.content === 'img' && <label for={props.file} id = 'file'></label>} */}
      <img className={styles.smimg} src={props.src} alt="" />
      <label for={props.file} style={{ display: "none" }}></label>
      <input
        id={props.file}
        type="file"
        accept=" image/png, image/jpeg, image/jpg"
        onChange={props.onChange}
      />
    </div>
  );
}
