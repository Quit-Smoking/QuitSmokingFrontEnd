import './missionselect.css';
import TopBar from "../../../components/TopBar";
import Nav from "../../../components/nav";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import water from '../../../assets/mission/water.svg';
import exercise from '../../../assets/mission/exercise.svg';
import reward from '../../../assets/mission/reward.svg';
import report from '../../../assets/mission/report.svg';
import Slider from "react-slick";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function MissionSelect() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken');

  const [currentMission, setCurrentMission] = useState(false); // 진행 중인 미션 확인
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(null); // 선택된 슬라이드 인덱스


  const fetchMissions = async () => {
    try {
      const response = await axios.get(`${backendUrl}/mission/getMissions`, {
        params: { token: userToken },
      });

      if (response.status !== 200) {
        throw new Error('진행 중인 미션 확인 중 서버 응답 오류');
      }

      const missionExist = response.data !== null;
      setCurrentMission(missionExist);
    } catch (error) {
      console.error('미션 데이터 확인 중 에러:', error);
    }
  };
  
  useEffect(() => {
    fetchMissions();
  }, [userToken]);

  const slides = [
    {
      key: "slide-1",
      title: "물 마시기",
      description: "물을 마시는 것은 금연하는 데 가장 좋은 방법 중 하나입니다. 시원한 물은 흡연 욕구를 줄여주고, 니코틴과 노폐물 배출을 돕습니다.",
      image: water,
    },
    {
      key: "slide-2",
      title: "운동하기",
      description: "운동은 금연 실천뿐만 아니라 체력 향상과 스트레스 관리에도 효과적입니다. 적절한 신체활동은 금단 증상 완화에 도움을 줍니다.",
      image: exercise,
    },
    {
      key: "slide-3",
      title: "자기보상",
      description: "금연 성공 경험을 축하하며 자신을 격려하세요. 금연 성공의 심리적 강화와 경제적 이득을 동시에 느낄 수 있습니다.",
      image: reward,
    },
    {
      key: "slide-4",
      title: "금연일지",
      description: "흡연 습관을 기록하며 금연 계획을 세우세요. 금연 시작과 함께 금연 일지를 작성하면 효과적입니다.",
      image: report,
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
  };

  const handleCardClick = (index) => {
    if (selectedSlideIndex === index) {
      setSelectedSlideIndex(null); // 이미 선택된 카드를 다시 클릭하면 선택 해제
    } else {
      setSelectedSlideIndex(index); // 새로운 카드 선택
    }
  };

  return (
    <div className="mission-select-container">
      {currentMission ? (
        <TopBar title="미션 추가" onBack={() => navigate(-1)} />
      ) : (
        <div className="current-banner">
          <p className="current-title">금연 미션</p>
          <p className="current-desc">숨쉴래에서 금연에 도움이 되는 미션 4가지를 추천드려요!</p>
        </div>
      )}

      <Slider {...settings} className="mission-carousel-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.key}
            className={`mission-carousel-slide ${
              selectedSlideIndex === index ? "selected-card" : ""
            }`}
            onClick={() => handleCardClick(index)} // 카드 클릭 핸들러
          >
            <div className={`card-container`}>
              <p className="card-title">{slide.title}</p>
              <img src={slide.image} alt={slide.title} className="card-image" />
              <p className="card-desc">{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>

      <div className="mission-carousel-controls">
        <button
          className="new-mission-start"
          onClick={() => {
            if (selectedSlideIndex !== null) {
              navigate('/newMission', { state: { missionName: slides[selectedSlideIndex].title } });
            } else {
              alert("슬라이드를 선택해주세요.");
            }
          }}
        >
          해당 미션 시작하기
        </button>
        <button className="my-mission-start" onClick={() => navigate('/createmission')}>
          미션 직접 생성하기
        </button>
      </div>
      <footer className="nav-footer">
        <Nav />
      </footer>
    </div>
  );
}

export default MissionSelect;
