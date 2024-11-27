import './login.css'
import logo from '../../../public/circle_logo.svg';
import { useState } from 'react';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [wrong, setWrong] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!id || !password) {
      setShowModal(true);
      return;
    }

    // 서버로 아이디, 비번 보내기

    // 아이디 비번 틀리면 setWrong(true)

    console.log('Id:', id);
    console.log('Password:', password);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFindId = () => {
    console.log('Find ID clicked');
    // 아이디 찾기로 이동
  };

  const handleFindPassword = () => {
    console.log('Find Password clicked');
    // 비번찾기로 이동
  };

  const handleSignup = () => {
    console.log('Sign Up clicked');
    // 회원가입으로 이동
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
              className="off-login-input"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='비밀번호'
              className="off-login-input"
            />
            {wrong && <p className="wrong-login">{`아이디 또는 비밀번호가 잘못 되었습니다.\n아이디와 비밀번호를 정확히 입력해 주세요`}</p>}
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

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>아이디와 비밀번호를 입력하세요</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login;
