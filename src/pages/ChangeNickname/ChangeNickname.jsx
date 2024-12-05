import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChangeNickname.css";
import Cancel from "../../assets/cancel.svg";

function ChangeNickname() {
  const [nickname, setNickname] = useState(""); // 비밀번호 필드

  const navigate = useNavigate();

  // 비밀번호 입력 처리
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNickname(value);
  };

  // 버튼 클릭 시 검증 및 제출
  const handleSubmit = async () => {
    // 비밀번호와 재입력 값이 다를 경우 메시지 표시
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzMzMzA3MzY0LCJleHAiOjE3MzMzNDMzNjR9.M3agOzCMGRrPsOukqEe-MGTKH_1nx8hOulHQxipIfjU"; // 로컬 스토리지에서 토큰 가져오기

    // API 요청 데이터 생성
    const requestData = {
      //   token: localStorage.getItem("token"), // 로컬 스토리지에서 토큰 가져오기
      token: token,
      nickname: nickname,
    };

    try {
      // POST 요청
      const response = await axios.post(
        "http://15.164.231.201:8080/user/changeNickname",
        null,
        {
          params: requestData, // 쿼리 파라미터로 데이터 전송
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      // 성공 시 홈 화면으로 이동
      alert("닉네임이 성공적으로 변경되었습니다!");
      navigate("/home");
    } catch (error) {
      console.error("API 요청 실패:", error.response || error.message);
      alert("닉네임 변경 중 오류가 발생했습니다.");
    }
  };

  const handleCancelClick = () => {
    navigate("/home");
  };

  return (
    <div className="signup-container">
      <div className="center">
        <div className="text">
          닉네임 변경
          <img
            className="Cancel_img"
            src={Cancel}
            alt="cancel"
            onClick={handleCancelClick}
          />
        </div>
        <div className="sub_text">변경할 닉네임을 입력해주세요</div>
        <div className="form-group">
          <div className="password_title" htmlFor="password">
            닉네임
          </div>
          <input
            type="password"
            id="password"
            placeholder="닉네임"
            value={nickname}
            onChange={handlePasswordChange}
          />
        </div>
      </div>

      <button
        className="signup-button"
        onClick={handleSubmit} // 버튼 클릭 시 검증 및 처리
      >
        확인
      </button>
    </div>
  );
}

export default ChangeNickname;
