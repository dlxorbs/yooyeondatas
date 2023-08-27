import React from "react";
import TextInput from "./TextInput";
import ScrollItem from "./ScrollItem";
import "./Back.css";

export default function Left(props) {
  return (
    <div className="BackgroundContianer">
      <div className="text">
        <h4>{props.head || "dlxorbs"}</h4>
        <TextInput
          height={400}
          minheight={62}
          fontsize={18}
          fontweight={500}
          lineheight={160}
          placeholder={"내용 없음"}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      <ScrollItem
        file={props.file}
        onClick={props.onClickImg}
        src={props.src}
        onChange={props.onChangeImg}
        display={props.display}
      />
    </div>
  );
}
