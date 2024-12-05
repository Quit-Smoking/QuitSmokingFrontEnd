import './login.css';
import logo from '../../../public/circle_logo.svg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [wrong, setWrong] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password) {
      setShowModal(true);
      return;
    }

    try {
      // 첫 번째 요청: 로그인 API 호출
      const loginResponse = await axios.post('http://15.164.231.201:8080/user/login', {
        email: id,
        password: password,
      });

      if (loginResponse.status === 200) {
        console.log('로그인 성공', loginResponse.data);

        // 로그인 성공 시 반환된 토큰 가져오기
        const token = loginResponse.data;
        localStorage.setItem('userToken', token);

        // 두 번째 요청: 데이터 존재 여부 확인
        const dataExistResponse = await axios.get('http://15.164.231.201:8080/UserStartRecord/doExist', {
          params: { token },
        });

        // 데이터가 있으면 홈으로 이동, 없으면 알림 표시
        if (dataExistResponse.data) {
          navigate('/home');
        } else {
          navigate('/startpage');
        }
      }
    } catch (error) {
      // 첫 번째 요청이 실패한 경우
      console.error('요청 실패', error);
      setWrong(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFindIdPw = () => {
    console.log('Find ID clicked');
    // 아이디 찾기로 이동
  };

  const handleSignup = () => {
    console.log('Sign Up clicked');
    navigate('/Signup'); // 회원가입으로 이동
  };

  const handleNaverLogin = () => {
    alert('아직 개발 중입니다! :)');
  };

  return (
    <div className="login-page-container">
      <div className="off-login-container">
        <img src={logo} alt="logo" />
        <div className="off-login-inputs">
          <form onSubmit={handleSubmit} className="off-login-forms">
            <input
              type="id"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="이메일"
              className="off-login-input"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="off-login-input"
            />
            {wrong && <p className="wrong-login">{`아이디 또는 비밀번호가 잘못 되었습니다.\n아이디와 비밀번호를 정확히 입력해 주세요`}</p>}
            <button type="submit" className="off-login-button">로그인</button>
          </form>
          <div className="off-login-selects">
            <button type="button" onClick={handleFindIdPw} className="option-button">
              아이디/비밀번호 찾기
            </button>
            <button type="button" onClick={handleSignup} className="option-button">
              회원가입
            </button>
          </div>
        </div>
      </div>
      <div className="easy-login-container">
        <p className="easy-login-title">SNS 간편로그인</p>
        <button type="button" className="easy-login-button naver-button" onClick={handleNaverLogin}>
          네이버 로그인
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
  );
}

export default Login;
