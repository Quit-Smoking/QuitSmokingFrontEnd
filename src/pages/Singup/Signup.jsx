import { useState } from "react";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [nickname, setNickname] = useState("");

  const checkEmail = () => {
    // 가짜 예제: 이메일 중복 체크
    if (email === "kmu01@naver.com") {
      setEmailMessage("이미 존재하는 아이디입니다");
      setIsEmailValid(false);
    } else {
      setEmailMessage("사용 가능한 아이디입니다");
      setIsEmailValid(true);
    }
  };

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

  return (
    <div className="signup-container">
      <div className="text">회원가입</div>
      <div className="center">
        <div className="form-group">
          <div className="email_title" htmlFor="email">
            아이디(이메일)
          </div>
          <div className="email_box">
            <div className="email_input">
              <input
                type="email"
                id="email"
                placeholder="ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className={isEmailValid ? "valid-message" : "invalid-message"}>
                {emailMessage}
              </p>
            </div>
            <button className="email_button" onClick={checkEmail}>
              중복확인
            </button>
          </div>
        </div>

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
          <div className="nickname_title" htmlFor="nickname">
            닉네임
          </div>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
      </div>

      <button
        className="signup-button"
        disabled={!isEmailValid || !isPasswordValid}
      >
        회원가입
      </button>
    </div>
  );
}

export default Signup;
