import './missionselect.css';
import TopBar from "../../../components/TopBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import water from '../../../assets/mission/water.svg';
import exercise from '../../../assets/mission/exercise.svg';
import reward from '../../../assets/mission/reward.svg';
import report from '../../../assets/mission/report.svg';
import Slider from "react-slick";

function MissionSelect() {
  const navigate = useNavigate();

  //! 진행중인 미션이 있는지 확인하기 -> 있으면 TopBar 존재해야, 그리고 진행중인 미션 색상과 미션 뱃지 추가 필요

  const [currentMission, setCurrentMission] = useState(true); //! 진행중인 미션 확인

  
  const slides = [
    {
      key: "slide-1",
      content: (
        <div className="card-container">
          <p className="card-title">물 마시기</p>
          <img
            src={water}
            alt="drink water"
            className="card-image"
          />
          <p className="card-desc">물을 마시는 것은 금연하는데 오랫동안 사용된 가장 좋은 방법 중의 하나입니다. 시원한 물은 입 속의 감각을 다르게 하여 흡연 욕구를 많이 없애줍니다. 그리고 물은 니코틴과 각종 노폐물의 배설을 촉진시켜줍니다.</p>
        </div>
      ),
    },
    {
      key: "slide-2",
      content: (
        <div className="card-container">
          <p className="card-title">운동하기</p>
          <img
            src={exercise}
            alt="exercise"
            className="card-image"
          />
          <p className="card-desc">금연 후 체중 증가와 함께 나타나는 우울, 불안, 흥분, 집중력 저하 등의 금단증상에 대처하기 위한 방법으로 적절한 신체활동이 추천됩니다. 운동은 금연 실천에도 도움을 주고 체력 향상과 스트레스 관리에도 효과적입니다.</p>
        </div>
      ),
    },
    {
      key: "slide-3",
      content: (
        <div className="card-container">
          <p className="card-title">자기보상</p>
          <img
            src={reward}
            alt="reward"
            className="card-image"
          />
          <p className="card-desc">금연 성공 경험을 축하하고 격려해줌으로써 금연 유지에 큰 힘이 되어 줄 수 있습니다. 또한 금연 성공을 기념한 자기 보상을 준비하여 금연에 대한 심리적 강화와 금연에서 오는 신체적 이득뿐만 아니라 경제적인 이득을 얻게 됩니다.</p>
        </div>
      ),
    },
    {
      key: "slide-4",
      content: (
        <div className="card-container">
          <p className="card-title">금연일지</p>
          <img
            src={report}
            alt="report"
            className="card-image"
          />
          <p className="card-desc">금연을 시작하기 전에 먼저 자신이 흡연한 시간과 장소, 함께하는 사람, 흡연량 등을 기록해 나의 흡연시간과 금연 시 발생할 흡연욕구 상황을 미리 파악합니다. 이후 금연 시작과 동시에 금연 일지를 쓰기 시작합니다.</p>
        </div>
      ),
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: true,
    appendDots: dots => (
      <div
        style={{
          position: "absolute",
          padding: "10px",
          bottom: "-20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ margin: "0px", padding: '0', display: 'flex' }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: "30px",
          color: "#008285",
          transition: "all 0.3s ease",
          fontWeight: "bold",
          border: "none",
          cursor: 'pointer',
        }}
      >
        {i + 1}
      </div>
    )
  };

  return (
    <div className="mission-select-container">
      {currentMission ? (
        <TopBar title="미션 추가" onBack={() => navigate(-1)} />
      ) : (
        <div className="current-banner">
          <p className="current-title">금연 미션</p>
          <p className="current-desc">{`숨쉴래에서\n금연에 도움이 되는 미션 4가지를 추천드려요!`}</p>
        </div>
      )}
      <Slider {...settings} className="mission-carousel-wrapper">
        {slides.map(({ key, content }) => (
          <div key={key} className="mission-carousel-slide">
            {content}
          </div>
        ))}
      </Slider>
      <div className="mission-carousel-controls">
        <button className="new-mission-start">
          해당 미션 시작하기
        </button>
        <button className="my-mission-start">
          미션 직접 생성하기
        </button>
      </div>
    </div>
  );
}

export default MissionSelect;