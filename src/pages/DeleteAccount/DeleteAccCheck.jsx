import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import "./DeleteAccCheck.css";
import Cancel from "../../assets/cancel.svg";

function DeleteAccCheck() {
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(null); // 비밀번호 검증 상태 저장
  const navigate = useNavigate(); // 페이지 이동용 훅

  const handleCheckPassword = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzMzMzA3MzY0LCJleHAiOjE3MzMzNDMzNjR9.M3agOzCMGRrPsOukqEe-MGTKH_1nx8hOulHQxipIfjU"; // 로컬 스토리지에서 토큰 가져오기

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      // GET 요청: 비밀번호와 토큰 전송
      const response = await axios.get(
        "http://15.164.231.201:8080/user/checkPassword",
        {
          params: {
            token: token,
            password: password,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data === true) {
        console.log(response.data);
        // 서버 응답이 true면 Home 페이지로 이동
        navigate("/DeleteAcc", { state: { password } });
      } else {
        // 서버 응답이 false면 에러 메시지 표시
        setPasswordMessage("⚠️비밀번호가 틀렸습니다");
        setIsPasswordValid(false);
      }
    } catch (error) {
      console.error("API 호출 중 오류가 발생했습니다:", error);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // 입력한 비밀번호 상태 업데이트
    setPasswordMessage(""); // 입력 시 기존 에러 메시지 초기화
    setIsPasswordValid(null); // 입력 시 검증 상태 초기화
  };

  const handleCancelClick = () => {
    navigate("/home");
  };

  return (
    <div className="signup-container">
      <div className="center">
        <div className="text">
          회원탈퇴
          <img
            className="Cancel_img"
            src={Cancel}
            alt="cancel"
            onClick={handleCancelClick}
          />
        </div>
        <div className="sub_text">비밀번호를 입력해주세요</div>
        <div className="form-group">
          <div className="password_title" htmlFor="password">
            비밀번호
          </div>
          <input
            type="password"
            id="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={handlePasswordChange}
          />
          {isPasswordValid === false && (
            <p className="invalid-message">{passwordMessage}</p>
          )}
        </div>
      </div>

      <button
        className="signup-button"
        onClick={handleCheckPassword}
        disabled={!password} // 비밀번호가 비어 있으면 버튼 비활성화
      >
        확인
      </button>
    </div>
  );
}

export default DeleteAccCheck;
