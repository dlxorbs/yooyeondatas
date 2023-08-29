import React from "react";
import Login from "../UI/Login";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const nav = useNavigate();
  return (
    <div className="header">
      <span
        className="logo"
    
      >
        Blog
      </span>

      <button onClick={props.onClick}></button>
    </div>
  );
}
