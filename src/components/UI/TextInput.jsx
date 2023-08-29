import React, { useState, useRef } from "react";
import styles from "./Textarea.module.css";

export default function TextInput(props) {
  //props
  // height : 높이
  // value:
  // placeholder
  // onChange : 이벤트

  return (
    <div className={styles.TextContainer}>
      <textarea
        className={styles.TextInput}
        placeholder={props.placeholder}
        style={{
          "--height": props.height + "px",
          "--minheight": props.minheight + "px",
          "--fontsize": props.fontsize + "px",
          "--fontweight": props.fontweight,
          "--lineheight": props.lineheight + "%",
          "--overflow": props.overflow,
          "--color": props.color || "#666666",
          // border: "1px solid #66666640",
          "--placeholdercolor": props.placeholdercolor,
        }}
        maxlength={props.maxlength}
        height={props.height}
        value={props.value}
        onChange={props.onChange}
      ></textarea>
      <span
        style={{
          position: "absolute",
          bottom: "12px",
          right: "12px",
          color: "#666666",
        }}
      >
        {props.text || 0}/{props.limit}
      </span>
    </div>
  );
}
