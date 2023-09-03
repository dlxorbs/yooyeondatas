import React, { useState } from "react";

export default function Team(props) {
  const [teams, setTeams] = useState([]);

  const addTeam = () => {
    // 새로운 Team 컴포넌트를 추가하는 로직을 작성합니다.
    // 이때, teams 배열에 새로운 팀 정보를 추가해야 합니다.
  };

  return (
    <div className="teammaster">
      <input
        className="studentid"
        type="number"
        placeholder=" 학번을 입력해주세요"
        onChange={props.studentIdonChange}
      />
      <input
        className="studentinfo"
        type="text"
        placeholder="이름을 입력해주세요"
        onChange={props.studentinfoonChange}
      />
      <ul>
        <button
          className={`major ${props.toggle ? "open" : ""}`}
          type="button"
          onClick={props.toggleonClick}
        >
          {props.click}
        </button>
        {props.toggle ? (
          <div className="majorcontainer">
            <li value="산업디자인공학" onClick={props.onIDclick}>
              산업디자인공학
            </li>
            <li value="미디어디자인공학" onClick={props.onMDclick}>
              미디어디자인공학
            </li>
          </div>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}
