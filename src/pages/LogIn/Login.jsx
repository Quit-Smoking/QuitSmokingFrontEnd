import './login.css'
import logo from '../../../public/circle_logo.svg'
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

    // 서버로 아이디, 비번 보내기
    try {
      const response = await axios.post(`http://15.164.231.201:8080/user/login`, {
        params: {
          email: id,
          password: password,
        }
      });
      if (response.status === 200) {
        console.log('로그인 성공', response.data);
        localStorage.setItem('userToken', response.data);
        navigate('/Home'); //! 홈으로 이동
      }
    } catch(error) {
      console.log('로그인 실패', error);
      setWrong(true); // 아이디 비번 틀리면 setWrong(true)
    }

    console.log('Id:', id);
    console.log('Password:', password);
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


  // 서버로 아이디, 비번 보내기 -> 미안 해결하지 못했어... 부탁해...

  // const sendData = async () => {

  //   const requestData = {
  //     email: id,
  //     password: password,
  //   };

  //   try {
  //     await axios.post('/user/login', requestData, {
  //       headers: { 'Content-Type': 'application/json' },
  //     });

  //   } catch (error) {
  //     console.error('Error sending data:', error);
  //     alert('데이터 전송에 실패했습니다.');
  //   }
  // };

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
        <button type="button" className="easy-login-button naver-button">
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
  )
}

export default Login;
