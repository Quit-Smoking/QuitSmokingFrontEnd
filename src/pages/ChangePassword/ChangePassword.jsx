import { useState } from "react";
import axios from "axios";
import "./ChangePassword.css";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  const handleRegister = async () => {
    const requestData = {
      password: password,
    };

    console.log("Sending data: ", requestData);

    try {
      const response = await axios.post("/user/register", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      alert("회원가입이 성공적으로 완료되었습니다!");
    } catch (error) {
      console.error("Error: ", error.response || error.message);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordMessage("⚠️비밀번호가 틀렸습니다");
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  };

  return (
    <div className="signup-container">
      <div className="center">
        <div className="text">비밀번호 변경</div>
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
      </div>

      <button
        className="signup-button"
        onClick={handleRegister}
        disabled={!isPasswordValid}
      >
        확인
      </button>
    </div>
  );
}

export default ChangePassword;
