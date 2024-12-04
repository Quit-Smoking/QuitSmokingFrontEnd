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
