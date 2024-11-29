import './startmission.css'
import TopBar from '../../components/TopBar';
import { useNavigate } from "react-router-dom";
import bubble from "../../assets/talk.svg";
import char from "../../assets/char.svg";

function StartMission() {
  const navigate = useNavigate();

  //! params로 요일과 기간 확인해서 가져오기

  return (
    <div className="start-container">
      <TopBar title="중강도 운동하기" onBack={() => navigate(-1)} />
      <div className="start-content">
        <div className="start-title">
          <p>Mission</p>
          <p>중강도 운동하기</p>
          {/* !!!!!!!!!타이틀 가져오기!!!!!!!!!! */}
        </div>
        <div
          style={{background: `no-repeat center url(${bubble})`}}
          //! 가져온 요일과 기간 사용하기
          className="mission-bubble"
        >
          {`2024년 12월 2일까지\n월요일마다 실천하겠습니다!`}
        </div>
        <img
          src={char}
          alt="숨쉴래 캐릭터"
          className="start-char"
        />
        <button className="start-mission-button"
        //! 여기서 서버로 보내기!!
        >미션 시작하기</button>
      </div>
    </div>
  );
}

export default StartMission;
