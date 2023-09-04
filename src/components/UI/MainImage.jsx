import React from "react";
import TextInput from "./TextInput";
import ScrollItem from "./ScrollItem";
import "./Back.css";
import styles from "./Scroll.module.css";

export default function MainImg(props) {
  return (
    <div className="BackgroundContianer thumbnail">
      <div
        className={[styles.scrollitem, props.content].join(" ")}
        style={{
          "--imgwidth": "100vw",
          "--imgheight": "33vw",
        }}
        onClick={props.onClick}
      >
        <div className="black">
          <div className={styles.over}>
            {" "}
            <span>
              {props.size} <br /> <br /> 이미지를 추가해주세요
            </span>{" "}
          </div>{" "}
          <span
            style={{
              display: props.display,
              textAlign: "center",
              color: "#FFFFFF",
            }}
          >
            {props.size}
            <br />
            <br /> 이미지를 추가해주세요
          </span>
        </div>
        <label htmlFor={props.file} style={{ display: "none" }}></label>
        <img className={styles.smimg} src={props.src} alt="" />

        <input
          id={props.file}
          type="file"
          accept=" image/png, image/jpeg, image/jpg"
          onChange={props.onChangeImg}
        />
      </div>

      <div className="mainback">
        <TextInput
          height={112}
          fontsize={70}
          fontweight={700}
          lineheight={160}
          placeholder={"내용 없음"}
          value={props.valueTitle}
          onChange={props.onChangeTitle}
          maxlength={18}
          text={props.textTitle}
          color={"#FFFFFF"}
          limit={"18자"}
          overflow={"hidden"}
          placeholdercolor={"#FFFFFF60"}
        />

        <TextInput
          height={45}
          fontsize={28}
          fontweight={500}
          lineheight={160}
          placeholder={"내용 없음"}
          value={props.valueOneline}
          onChange={props.onChangeinfo}
          maxlength={40}
          color={"#FFFFFF"}
          text={props.textOneline}
          limit={"40자"}
          overflow={"hidden"}
          placeholdercolor={"#FFFFFF60"}
        />
      </div>
    </div>
  );
}
