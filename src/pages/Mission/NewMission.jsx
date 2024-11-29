import "./newmission.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";

function NewMission() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null)

  const selectWeek = (week) => {
    setSelectedWeek(week);
  }

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (startX === null) return;
    if (selectedWeek === null) {
      setStartX(null);
      return;
    }

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) {
      // Swipe left
      nextSlide();
    } else if (diff < -50) {
      // Swipe right
      prevSlide();
    }
    setStartX(null);
  };

  const toggleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day) // Deselect if already selected
        : [...prevSelectedDays, day] // Add if not selected
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < slides.length ? prevIndex + 1 : prevIndex
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const slides = [
    {
      key: "slide-1",
      content: (
        <div>
          <p className="week-title">기간 설정</p>
          <p className="week-desc">미션을 진행할 기간을 설정해주세요</p>
          <div className="new-mission-weeks">
            {["1주", "2주", "4주", "8주", "12주", "16주"].map((week) => (
              <button
                key={week}
                className={`new-mission-week ${
                  selectedWeek === week ? "selected" : ""
                }`}
                onClick={() => selectWeek(week)}
              >
                {week}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "slide-2",
      content: (
        <div>
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
      ),
    },
  ];

  // ! top bar title 가져오기!!

  return (
    <div className="new-mission-container">
      <TopBar title="중강도 운동하기" onBack={() => navigate(-1)} />
      <div
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel-wrapper">
          <div
            className="carousel-content"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              display: "flex",
              width: `${slides.length * 100}%`,
            }}
          >
            {slides.map(({ key, content }) => (
              <div
                key={key}
                className="carousel-slide"
              >
                {content}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="new-mission-move">
        {currentIndex !== 0 ? 
          <button
            className="new-mission-prev"
            onClick={prevSlide}
          >이전</button> 
          : null
        }
        <button
          className="new-mission-next"
          onClick={nextSlide}
          disabled={selectedWeek === null}
          //! 기간과 요일 선택하지 않으면 넘어가지 않는 로직 추가
          //! 넘어갈때 요일과 기간 params로 보내기
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default NewMission;
