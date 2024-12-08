import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import water from "../../../assets/mission/water.svg";
import exercise from "../../../assets/mission/exercise.svg";
import reward from "../../../assets/mission/reward.svg";
import report from "../../../assets/mission/report.svg";
import "./missionselect.css";

function MissionSelect() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const [currentMission, setCurrentMission] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);

  useEffect(() => {
    const checkMission = async () => {
      try {
        const response = await axios.get(
          "https://quitsmoking.co.kr/mission/getMissions",
          { params: { userToken } }
        );
        if (response.status === 200) {
          setCurrentMission(response.data !== null);
        }
      } catch (error) {
        console.error("Error fetching mission data:", error);
      }
    };
    checkMission();
  }, [userToken]);

  const slides = [
    {
      title: "물 마시기",
      description:
        "물을 마시는 것은 금연 중 흡연 욕구를 줄이는 데 효과적입니다.",
      image: water,
    },
    {
      title: "운동하기",
      description: "운동은 금연과 건강 유지에 도움을 줍니다.",
      image: exercise,
    },
    {
      title: "자기보상",
      description: "금연 성공을 축하하며 자신을 격려하세요.",
      image: reward,
    },
    {
      title: "금연일지",
      description: "흡연 습관을 기록하며 금연 계획을 세우세요.",
      image: report,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setSelectedSlide(next),
  };

  const startMission = () => {
    if (selectedSlide !== null) {
      navigate("/newMission", { state: { missionName: slides[selectedSlide].title } });
    } else {
      alert("미션을 선택해주세요!");
    }
  };

  return (
    <div className="mission-select-container">
      <header className="mission-header">
        {currentMission ? (
          <h1>미션 추가</h1>
        ) : (
          <>
            <h1>금연 미션</h1>
            <p>금연에 도움이 되는 미션 4가지를 추천드려요!</p>
          </>
        )}
      </header>
      <div className="mission-slider-container">
        <Slider {...settings} className="mission-slider">
          {slides.map((slide, index) => (
            <div key={index} className="mission-card">
              <h2 className="mission-title">{slide.title}</h2>
              <img src={slide.image} alt={slide.title} className="mission-image" />
              <p className="mission-description">{slide.description}</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="mission-actions">
        <button onClick={startMission} className="mission-button start">
          해당 미션 시작하기
        </button>
        <button
          onClick={() => navigate("/createmission")}
          className="mission-button create"
        >
          미션 직접 생성하기
        </button>
      </div>
    </div>
  );
}

export default MissionSelect;
