import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import Cancel from "../../assets/cancel.svg";

function ResetPassword() {
  const [password, setPassword] = useState(""); // 비밀번호 필드
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 재입력 필드

  const [passwordMessage, setPasswordMessage] = useState(""); // 비밀번호 메시지
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(""); // 비밀번호 재입력 메시지
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true); // 기본값 true로 설정

  const navigate = useNavigate();

  // 비밀번호 입력 처리
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordMessage(
        "⚠️비밀번호는 영어, 숫자를 포함하여 8자리 이상이어야 합니다"
      );
      setIsPasswordValid(false);
    } else {
      setPasswordMessage("사용 가능한 비밀번호입니다");
      setIsPasswordValid(true);
    }
  };

  // 비밀번호 재입력 처리
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordMessage(""); // 입력 중에는 메시지 초기화
    setIsConfirmPasswordValid(true);
  };

  // 버튼 클릭 시 검증 및 제출
  const handleSubmit = async () => {
    // 비밀번호와 재입력 값이 다를 경우 메시지 표시
    if (password !== confirmPassword) {
      setConfirmPasswordMessage("⚠️비밀번호가 일치하지 않습니다");
      setIsConfirmPasswordValid(false);
      return; // 검증 실패 시 함수 종료
    }
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzMzMzA3MzY0LCJleHAiOjE3MzMzNDMzNjR9.M3agOzCMGRrPsOukqEe-MGTKH_1nx8hOulHQxipIfjU"; // 로컬 스토리지에서 토큰 가져오기

    // API 요청 데이터 생성
    const requestData = {
      //   token: localStorage.getItem("token"), // 로컬 스토리지에서 토큰 가져오기
      token: token,
      rawPassword: password,
    };

    try {
      // POST 요청
      const response = await axios.post(
        "http://15.164.231.201:8080/user/changePassword",
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
      alert("비밀번호가 성공적으로 변경되었습니다!");
      navigate("/home");
    } catch (error) {
      console.error("API 요청 실패:", error.response || error.message);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  const handleCancelClick = () => {
    navigate("/home");
  };

  return (
    <div className="signup-container">
      <div className="center">
        <div className="text">
          비밀번호 변경
          <img
            className="Cancel_img"
            src={Cancel}
            alt="cancel"
            onClick={handleCancelClick}
          />
        </div>
        <div className="sub_text">새로운 비밀번호를 입력해주세요</div>
        <div className="form-group">
          <div className="password_title" htmlFor="password">
            비밀번호
          </div>
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
          <p className={isPasswordValid ? "valid-message" : "invalid-message"}>
            {passwordMessage}
          </p>
        </div>
        <div className="form-group">
          <div className="password_title" htmlFor="confirmPassword">
            비밀번호 재입력
          </div>
          <input
            type="password"
            id="confirmPassword"
            placeholder="비밀번호 재입력"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <p
            className={
              isConfirmPasswordValid ? "valid-message" : "invalid-message"
            }
          >
            {confirmPasswordMessage}
          </p>
        </div>
      </div>

      <button
        className="signup-button"
        onClick={handleSubmit} // 버튼 클릭 시 검증 및 처리
        disabled={!isPasswordValid} // 비밀번호 검증이 완료되지 않으면 버튼 비활성화
      >
        비밀번호 변경
      </button>
    </div>
  );
}

export default ResetPassword;
