import { React, useEffect, useState } from "react";
import styles from "./Page.module.css";
import "../UI/Login.css";
import Button from "../UI/Button";
import $ from "jquery";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";

import Team from "../UI/Team";
import symbol from "../Img/symbol.png";
import symbol1 from "../Img/symbol1_1.png";

export default function Mainpage(props) {
  const nav = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [radioChecked, setRadioChecked] = useState("s");

  const [click, setClick] = useState("전공을 선택해주세요");

  // 학생 데이터 변수 지정
  const [studentinfo, setStudentInfo] = useState([]);
  const [studentid, setStudentId] = useState("");
  const [major, setMajor] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  // 팀원 정보
  const [teamMembers, setTeamMembers] = useState([
    { studentId: "", studentname: "", major: "", toggle: false },
  ]);

  const data = {
    studentinfo: studentinfo,
    studentid: studentid,
    major: major,
    type: radioChecked,
    img: thumbnail,
    teamMembers: radioChecked === "t" ? teamMembers : [],
  };

  $("form").on("focus", "input[type=number]", function (e) {
    $(this).on("wheel.disableScroll", function (e) {
      e.preventDefault();
    });
  });
  $("form").on("blur", "input[type=number]", function (e) {
    $(this).off("wheel.disableScroll");
  });

  useEffect(() => {
    async function fetchData() {
      const docId = await db
        .collection("post")
        .doc(studentid + "_" + radioChecked)
        .get();

      if (docId.exists) {
        const docData = docId.data();
        setThumbnail(docData.data?.img || "");
      } else {
        setThumbnail(""); // 데이터가 없는 경우 빈 문자열로 설정
      }
    }

    fetchData(); // 컴포넌트가 마운트될 때 데이터 확인
  }, [studentid, radioChecked]);

  const handleWheel = (e) => {
    e.preventDefault();
  };
  const addTeamMember = () => {
    if (teamMembers.length < 4) {
      setTeamMembers([
        ...teamMembers,
        { studentId: "", studentname: "", major: "", toggle: false },
      ]);
    }
  };

  const removeTeamMember = (indexToRemove) => {
    const updatedMembers = teamMembers.filter(
      (_, index) => index !== indexToRemove
    );
    setTeamMembers(updatedMembers);
  };

  const TeamMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const selectMajor = (index, majorValue) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index].major = majorValue;
    setTeamMembers(updatedMembers);
  };

  const toggleMajor = (index) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index].toggle = !updatedMembers[index].toggle;
    setTeamMembers(updatedMembers);
  };

  const next = async function () {
    const docId = await db
      .collection("post")
      .doc(studentid + "_" + radioChecked)
      .get();

    if (
      click !== "전공을 선택해주세요" &&
      $(".studentinfo").val() !== "" &&
      $(".studentid").val() !== "" &&
      $(".studentid").val().length === 10 &&
      radioChecked
    ) {
      if (docId.exists) {
        // 이미 해당 문서가 존재하는 경우 업데이트 로직을 추가
        db.collection("post")
          .doc(studentid + "_" + radioChecked)
          .update({
            data,
          })
          .then(() => {
            if (
              click !== "전공을 선택해주세요" &&
              $(".studentinfo").val() !== "" &&
              $(".studentid").val() !== "" &&
              $(".studentid").val().length === 10 &&
              radioChecked
            ) {
              nav("/thumb", {
                state: {
                  data: data,
                },
              });
              console.log($(".studentid").val());
              console.log(radioChecked);
            } else {
              // 알림을 한국어로 변경
              if (click === "전공을 선택해주세요") {
                alert("전공을 선택해주세요");
              }
              if ($(".studentinfo").val() === "") {
                alert("이름을 입력해주세요");
              }
              if ($(".studentid").val() === "") {
                alert("학번을 입력해주세요");
              }
              if (radioChecked === false) {
                alert("작품정보를 입력해주세요");
              }
              if ($(".studentid").val().length !== 10) {
                alert("학번은 10자리로 입력해 주세요.");
              }
            }
          });
      } else {
        if (
          click !== "전공을 선택해주세요" &&
          $(".studentinfo").val() !== "" &&
          $(".studentid").val() !== "" &&
          radioChecked
        ) {
          // 해당 문서가 없는 경우 새로운 문서를 생성
          db.collection("post")
            .doc(studentid + "_" + radioChecked)
            .set({
              data,
            })
            .then(() => {
              if (
                radioChecked &&
                click !== "전공을 선택해주세요" &&
                $(".studentinfo").val() !== "" &&
                $(".studentid").val() !== "" &&
                $(".studentid").val().length === 10
              ) {
                nav("/thumb", {
                  state: {
                    data: data,
                  },
                });
              } else {
                // 알림을 한국어로 변경
                if (click === "전공을 선택해주세요") {
                  alert("전공을 선택해주세요");
                }
                if ($(".studentinfo").val() === "") {
                  alert("이름을 입력해주세요");
                }
                if ($(".studentid").val() === "") {
                  alert("학번을 입력해주세요");
                }
                if (radioChecked === false) {
                  alert("작품정보를 입력해주세요");
                }
                if ($(".studentid").val().length !== 10) {
                  alert("학번은 10자리로 입력해 주세요.");
                }
              }
            });
        }
      }
    } else if (radioChecked === "s") {
      // 알림을 한국어로 변경
      if (click === "전공을 선택해주세요") {
        alert("전공을 선택해주세요");
      }
      if ($(".studentinfo").val() === "") {
        alert("이름을 입력해주세요");
      }
      if ($(".studentid").val() === "") {
        alert("학번을 입력해주세요");
      }
      if (radioChecked === false) {
        alert("작품정보를 입력해주세요");
      }
      if ($(".studentid").val().length !== 10) {
        alert("학번은 10자리로 입력해 주세요.");
      }
    } else if (radioChecked === "t") {
      // 알림을 한국어로 변경
      let memberIncomplete = false;
      teamMembers.forEach((member, index) => {
        if (
          member.studentId === "" ||
          member.studentname === "" ||
          member.major === ""
        ) {
          alert(`팀원 ${index + 1}의 정보를 모두 입력해주세요.`);
          memberIncomplete = true;
        }
      });

      if (!memberIncomplete) {
        // 팀원 정보가 모두 입력된 경우
        if (
          click === "전공을 선택해주세요" ||
          $(".studentinfo").val() === "" ||
          $(".studentid").val() === "" ||
          !radioChecked
        ) {
          // 알림을 한국어로 변경
          if (click === "전공을 선택해주세요") {
            alert("전공을 선택해주세요");
          }
          if ($(".studentinfo").val() === "") {
            alert("이름을 입력해주세요");
          }
          if ($(".studentid").val() === "") {
            alert("학번을 입력해주세요");
          }
          if (!radioChecked) {
            alert("작품정보를 입력해주세요");
          }
        } else {
          // 팀원 정보가 모두 입력되었고, 필수 정보도 입력된 경우
          db.collection("post")
            .doc(studentid + "_" + radioChecked)
            .set({
              data,
            })
            .then(() => {
              if (
                radioChecked &&
                click !== "전공을 선택해주세요" &&
                $(".studentinfo").val() !== "" &&
                $(".studentid").val() !== "" &&
                $(".studentid").val().length === 10
              ) {
                nav("/thumb", {
                  state: {
                    data: data,
                  },
                });
              }
            });
        }
      }
    }
  };
  return (
    <div className={styles.Page_Wrapper}>
      <div className="LoginContainer">
        <h1> 제18대 온라인 졸업전시 정보 입력 </h1>
        <form className="inputcontainer">
          <div className="radio">
            <input
              id="s"
              type="radio"
              name="team"
              value="s"
              checked={radioChecked === "s"}
              onChange={() => setRadioChecked("s")}
            />
            <label htmlFor="s">
              <div className="radiobtn"> 개인작</div>
            </label>

            <input
              id="t"
              type="radio"
              name="team"
              value="t"
              checked={radioChecked === "t"}
              onChange={() => setRadioChecked("t")}
            />
            <label htmlFor="t">
              <div className="radiobtn"> 팀작</div>
            </label>
          </div>
          {/* 체크된 상태에 따라 다른게 보여지게... */}
          {radioChecked == "s" ? (
            <div className="solocontainer">
              <input
                className="studentid"
                type="number"
                onWheel={handleWheel}
                placeholder=" 학번을 입력해주세요"
                onChange={(e) => {
                  setStudentId(e.target.value);
                }}
              />
              <input
                className="studentinfo"
                type="text"
                placeholder="이름을 입력해주세요"
                onChange={(e) => {
                  setStudentInfo([e.target.value]);
                }}
              />
              <ul>
                <button
                  className={`major ${toggle ? "open" : ""}`}
                  type="button"
                  onClick={(e) => {
                    setToggle(!toggle);
                    console.log(toggle);
                  }}
                >
                  {click}
                </button>
                {toggle ? (
                  <div className="majorcontainer">
                    <li
                      value="산업디자인공학"
                      onClick={(e) => {
                        setClick("산업디자인공학");
                        setMajor("1");
                        setToggle(false);
                      }}
                    >
                      산업디자인공학
                    </li>
                    <li
                      value="미디어디자인공학"
                      onClick={(e) => {
                        setClick("미디어디자인공학");
                        setMajor("2");
                        setToggle(false);
                      }}
                    >
                      미디어디자인공학
                    </li>
                  </div>
                ) : (
                  ""
                )}
              </ul>
            </div>
          ) : (
            <div className="teamcontainer">
              {teamMembers.map((member, index) => (
                <div className="coopbox" key={index}>
                  <div className="teammaster">
                    <input
                      className="studentid"
                      type="number"
                      onWheel={handleWheel}
                      placeholder={`  학번을 입력하세요`}
                      value={member.studentId}
                      onChange={(e) => {
                        TeamMemberChange(index, "studentId", e.target.value);
                        if (index === 0) {
                          setStudentId(member.studentId);
                        }
                      }}
                    />
                    <input
                      className="studentinfo"
                      type="text"
                      placeholder={`  이름을 입력하세요`}
                      value={member.studentname}
                      onChange={(e) => {
                        TeamMemberChange(index, "studentname", e.target.value);
                        if (index === 0) {
                          setStudentInfo(member.studentname);
                        }
                      }}
                    />
                    <ul>
                      <button
                        className={`major ${member.toggle ? "open" : ""}`}
                        type="button"
                        onClick={() => {
                          toggleMajor(index);
                        }}
                      >
                        {member.major == ""
                          ? "전공을 입력해주세요"
                          : member.major == "1"
                          ? "산업디자인공학"
                          : "미디어디자인공학"}
                      </button>
                      {member.toggle ? (
                        <div className="majorcontainer">
                          <li
                            value="산업디자인공학"
                            onClick={(e) => {
                              selectMajor(index, 1);
                              TeamMemberChange(index, "major", "1");
                              setClick("산업디자인공학");
                              toggleMajor(index);
                              if (index == 1) {
                                setMajor("1");
                              }
                            }}
                          >
                            산업디자인공학
                          </li>
                          <li
                            value="미디어디자인공학"
                            onClick={(e) => {
                              selectMajor(index, 2);
                              TeamMemberChange(index, "major", "2");
                              setClick("미디어디자인공학");
                              toggleMajor(index);
                              if (index == 1) {
                                setMajor("2");
                              }
                            }}
                          >
                            미디어디자인공학
                          </li>
                        </div>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                  {index > 0 && (
                    <button
                      className="borderedButton"
                      type="button"
                      onClick={() => removeTeamMember(index)}
                    >
                      팀원 삭제
                    </button>
                  )}
                </div>
              ))}
              <button
                className="add borderedButton"
                type="button"
                onClick={addTeamMember}
              >
                팀원 추가하기
              </button>
            </div>
          )}
        </form>
        <Button
          title="글작성"
          onClick={(e) => {
            next();
            console.log(data);
          }}
        ></Button>
      </div>
    </div>
  );
}
