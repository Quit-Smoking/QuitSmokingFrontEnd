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

  // 비밀번호 재입력 처리 (입력 시 검증 없음)
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordMessage(""); // 입력 중에는 메시지 초기화
    setIsConfirmPasswordValid(true);
  };

  // 버튼 클릭 시 검증 및 제출
  const handleSubmit = () => {
    // 비밀번호와 재입력 값이 다를 경우 메시지 표시
    if (password !== confirmPassword) {
      setConfirmPasswordMessage("⚠️비밀번호가 일치하지 않습니다");
      setIsConfirmPasswordValid(false);
      return; // 검증 실패 시 함수 종료
    }

    // 모든 조건이 충족되면 다음 단계 진행 (예: API 요청 또는 페이지 이동)
    alert("비밀번호가 성공적으로 변경되었습니다!");
    navigate("/home");
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
        <div className="sub_text">현재 비밀번호를 입력해주세요</div>
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
        회원가입
      </button>
    </div>
  );
}

export default ResetPassword;
