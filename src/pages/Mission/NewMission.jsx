import "./newmission.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";

function NewMission() {
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState([]);
  const missionName = "중강도 운동하기"; //! 미션명 가져오기
  const defaultMission = true;

  const toggleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day) // Deselect if already selected
        : [...prevSelectedDays, day] // Add if not selected
    );
  };

  const handleNext = () => {
    if (selectedDays.length === 0) {
      alert("요일을 선택해주세요.");
      return;
    }
    
    console.log("Selected Days:", selectedDays);
    
    try {
      console.log('navigating to start mission')
      navigate('/startMission', {
        state: { missionName, selectedDays, defaultMission },
      });
    } catch (error) {
      console.error(`error navigate to start mission: ${error}`)
    }
  };

  return (
    <div className="new-mission-container">
      <TopBar title="중강도 운동하기" onBack={() => navigate(-1)} />
      <div className="content-container">
        <p className="week-title">요일 설정</p>
        <p className="week-desc">미션을 수행할 요일을 설정해주세요</p>
        <div className="weekdays">
          {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
            <button
              key={day}
              className={`weekday ${selectedDays.includes(day) ? "selected" : ""}`}
              onClick={() => toggleDaySelection(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <div className="new-mission-move">
        <button
          className="new-mission-next"
          onClick={handleNext}
          disabled={selectedDays === null}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default NewMission;