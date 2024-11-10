import './login.css'
import logo from '../../../public/circle_logo.svg';
import { useState } from 'react';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API call)
    console.log('Id:', id);
    console.log('Password:', password);
  };

  const handleFindId = () => {
    console.log('Find ID clicked');
    // Redirect or show a modal for finding ID
  };

  const handleFindPassword = () => {
    console.log('Find Password clicked');
    // Redirect or show a modal for finding password
  };

  const handleSignup = () => {
    console.log('Sign Up clicked');
    // Redirect to the sign-up page
  };

  return (
    <div className="login-page-container">
      <div className="off-login-container">
        <img
          src={logo}
          alt="logo"
        />
        <div className="off-login-inputs">
          <form onSubmit={handleSubmit} className="off-login-forms">
            <input
              type="id"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder='아이디'
              required
              className="off-login-input"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='비밀번호'
              required
              className="off-login-input"
            />
            <button type="submit" className="off-login-button">로그인</button>
          </form>
          <div className="off-login-selects">
            <button type="button" onClick={handleFindId} className="option-button">
              아이디 찾기
            </button>
            <button type="button" onClick={handleFindPassword} className="option-button">
              비밀번호 찾기
            </button>
            <button type="button" onClick={handleSignup} className="option-button">
              회원가입
            </button>
          </div>
        </div>
      </div>
      <div className="easy-login-container">
        <p className="easy-login-title">SNS 간편로그인</p>
        <button type="button" className="easy-login-button kakao-button">
          kakao
        </button>
        <button type="button" className="easy-login-button google-button">
          Google
        </button>
      </div>
    </div>
  )
}

export default Login;
