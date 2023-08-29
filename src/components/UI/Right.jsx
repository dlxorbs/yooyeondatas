import React from "react";
import TextInput from "./TextInput";
import ScrollItem from "./ScrollItem";
import "./Back.css";

export default function Right(props) {
  return (
    <div className="BackgroundContianer">
      <ScrollItem
        imgwidth={props.imgwidth}
        imgheight={props.imgheight}
        size={props.size}
        file={props.file}
        onClick={props.onClickImg}
        src={props.src}
        onChange={props.onChangeImg}
        display={props.display}
        placeholdercolor={"#66666680"}
      />
      <div className="text">
        <h4
          style={{
            "--width": props.width + "px",
          }}
        >
          {props.head || "dlxorbs"}
        </h4>
        <TextInput
          height={460}
          fontsize={18}
          fontweight={500}
          lineheight={160}
          placeholder={"내용 없음"}
          value={props.value}
          onChange={props.onChange}
          overflow={"hidden"}
          text={props.text}
          maxlength={props.maxlength}
          limit={"525자"}
          placeholdercolor={"#66666680"}
        />
      </div>
    </div>
  );
}
