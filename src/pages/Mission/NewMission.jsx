import React, { useState } from "react";
import "./newmission.css"; // CSS 파일 경로 수정
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "../../components/TopBar"; // TopBar 컴포넌트 가져오기

function NewMission() {
  const navigate = useNavigate();
  const location = useLocation();

  // `missionName`을 전달받아 초기값 설정
  const initialMissionName = location.state?.missionName || "";
  const [missionName, setMissionName] = useState(initialMissionName);
  const [selectedDays, setSelectedDays] = useState([]); // 선택된 요일
  const weekdays = ["월", "화", "수", "목", "금"]; // 평일
  const weekends = ["토", "일"]; // 주말

  // 요일 선택 처리
  const handleDaySelect = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // 요일 정렬 함수
  const sortDays = (days) => {
    const dayOrder = ["월", "화", "수", "목", "금", "토", "일"];
    return [...days].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  };

  // 다음 버튼 핸들러
  const handleNext = () => {
    const sortedDays = sortDays(selectedDays); // 요일 정렬
    console.log("정렬된 요일:", sortedDays);

    navigate("/startmission", {
      state: { missionName, selectedDays: sortedDays },
    });
  };

  return (
    <div className="new-mission-container">
      {/* 헤더 */}
      <header>
        <TopBar
          title={missionName || "새로운 미션"}
          onBack={() => navigate(-1)}
        />
      </header>

      {/* 메인 콘텐츠 */}
      <main className="mission-main">
        <div className="mission-text-container">
          <h1 className="mission-title">요일 설정</h1>
          <p className="mission-subtitle">미션을 수행할 요일을 설정해주세요</p>
        </div>
        <div className="mission-days-container">
          {/* 평일 */}
          <div className="mission-weekdays-container">
            {weekdays.map((day, index) => (
              <div
                key={index}
                className={`mission-day-box ${
                  selectedDays.includes(day) ? "selected" : ""
                }`}
                onClick={() => handleDaySelect(day)}
              >
                {day}
              </div>
            ))}
          </div>
          {/* 주말 */}
          <div className="mission-weekend-container">
            {weekends.map((day, index) => (
              <div
                key={index}
                className={`mission-day-box ${
                  selectedDays.includes(day) ? "selected" : ""
                }`}
                onClick={() => handleDaySelect(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="newmission-footer">
        <div className="newmission-btn-pair">
          <button
            className={`newmission-next-btn ${
              selectedDays.length > 0 ? "active" : ""
            }`}
            onClick={handleNext}
            disabled={selectedDays.length === 0}
          >
            다음
          </button>
        </div>
      </footer>
    </div>
  );
}

export default NewMission;
