import './startmission.css'
import TopBar from '../../components/TopBar';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import bubble from "../../assets/talk.svg";
import char from "../../assets/char.svg";
import axios from 'axios';

function StartMission() {
  const navigate = useNavigate();
  const location = useLocation();
  const { missionName, selectedDays, defaultMission } = location.state || {};
  
  const [userToken, setUserToken] = useState(null);
  //! params로 요일 확인해서 가져오기

  useEffect(() => {
    try {
      const token = localStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
      } else {
        console.log('토큰 세팅 불가');
      }
    } catch (error) {
      console.log('토큰 가져오기 실패', error)
    }
  }, []);

  const getFormattedDate = () => {
    const today = new Date();
  
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`; // "YYYY-MM-DD"
  };

  const convertDaysToBinary = (selectedDays) => {
    const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
    return daysOfWeek.map(day => (selectedDays.includes(day) ? "1" : "0")).join("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userToken) {
      console.log('토큰이 없음');
      return;
    }
    console.log(userToken);

    const binaryWeekData = convertDaysToBinary(selectedDays);
    console.log("binaryWeekData:", binaryWeekData, typeof binaryWeekData);

    try {
      const response = await axios.post(
        "https://quitsmoking.co.kr/mission/add",
        {
          token: userToken,
          mission: missionName,
          start_date: getFormattedDate(),
          is_deleted: false,
          is_default: defaultMission,
          week_data: binaryWeekData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('만든 미션 서버 전송 중 200 아님', response.status);
      } else if (response.status === 200) {
        console.log('미션 성공적으로 전송:', response.data);
        console.log('mission main 페이지로 이동')
        navigate('/missionMain');
      }
    } catch (error) {
      console.error('미션 서버로 보내는 중 에러 발생', error);
    }
  }

  return (
    <div className="start-container">
      <TopBar title={missionName} onBack={() => navigate(-1)} />
      <div className="start-content">
        <div className="start-title">
          <p>Mission</p>
          <p>{missionName}</p>
        </div>
        <div
          style={{background: `no-repeat center url(${bubble})`}}
          className="mission-bubble"
        >
          {`${selectedDays}요일마다 실천하겠습니다!`}
        </div>
        <img
          src={char}
          alt="숨쉴래 캐릭터"
          className="start-char"
        />
        <button
          className="start-mission-button"
          onClick={handleSubmit}
        >
          미션 시작하기
        </button>
      </div>
    </div>
  );
}

export default StartMission;
