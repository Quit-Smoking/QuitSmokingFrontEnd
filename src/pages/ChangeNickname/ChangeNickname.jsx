import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import Cancel from "../../assets/cancel.svg";

function ChangeNickname() {
  const [password, setPassword] = useState(""); // 비밀번호 필드
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 재입력 필드

  const [passwordMessage, setPasswordMessage] = useState(""); // 비밀번호 메시지
  const [isPasswordValid, setIsPasswordValid] = useState(null);

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
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
          <p className={isPasswordValid ? "valid-message" : "invalid-message"}>
            {passwordMessage}
          </p>
        </div>
      </div>

      <button
        className="signup-button"
        onClick={handleSubmit} // 버튼 클릭 시 검증 및 처리
        disabled={!isPasswordValid} // 비밀번호 검증이 완료되지 않으면 버튼 비활성화
      >
        확인
      </button>
    </div>
  );
}

export default ChangeNickname;
