import { useState, useEffect } from "react";
import "./Diary.css";
import CalendarIcon from "../../assets/calendar_icon.svg"; // 달력 아이콘을 여기에 넣어주세요
import CloudIcon from "../../assets/cloud_icon.svg"; // 구름 아이콘을 여기에 넣어주세요

function Diary() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [smokeFreeDays, setSmokeFreeDays] = useState([]); // 금연 날짜 저장
  const [isSmoking, setIsSmoking] = useState(true); // 금연 상태 (true: 금연 중, false: 실패)

  useEffect(() => {
    if (isSmoking) {
      // 금연 중이라면 날짜가 지남에 따라 구름 아이콘을 추가
      const today = currentDate.toISOString().split("T")[0];
      if (!smokeFreeDays.includes(today)) {
        setSmokeFreeDays([...smokeFreeDays, today]);
      }
    }
  }, [currentDate, isSmoking]);

  const handleFail = () => {
    setSmokeFreeDays([]); // 금연 실패 시 모든 구름 아이콘 초기화
    setIsSmoking(false);
  };

  const handleRestart = () => {
    const today = currentDate.toISOString().split("T")[0];
    setSmokeFreeDays([today]); // 금연 재시작 시 오늘부터 구름 아이콘 추가
    setIsSmoking(true);
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const renderCalendar = () => {
    const calendarDays = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dateString = date.toISOString().split("T")[0];
      const isToday = date.toDateString() === new Date().toDateString();
      const isSmokeFree = smokeFreeDays.includes(dateString);

      calendarDays.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? "today" : ""} ${
            date.getDay() === 6
              ? "saturday"
              : date.getDay() === 0
              ? "sunday"
              : ""
          }`}
        >
          {day}
          {isSmokeFree && (
            <img src={CloudIcon} alt="cloud" className="cloud-icon" />
          )}
          {isSmokeFree && day !== 1 && day - 1 !== 0 && (
            <div className="cloud-connector"></div>
          )}
        </div>
      );
    }
    return calendarDays;
  };

  return (
    <div className="diary-container">
      <header className="diary-header">
        <h2>금연 캘린더</h2>
        <div className="month-display">
          <span>{currentDate.getMonth() + 1}월</span>
          <img src={CalendarIcon} alt="calendar" className="calendar-icon" />
        </div>
        <p>
          누적 금연일{" "}
          <span className="smoke-free-days">총 {smokeFreeDays.length}일</span>
        </p>
      </header>

      <div className="calendar">
        <div className="weekdays">
          <span className="sunday">S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span className="saturday">S</span>
        </div>
        <div className="calendar-days">{renderCalendar()}</div>
      </div>

      <div className="today-record">
        <h3>오늘의 기록</h3>
        {/* 기록 예시 */}
        <div className="record-item">
          <span>하루에 물 2L 마시기</span>
          <button>-</button>
        </div>
        <div className="record-item">
          <span>매일 운동 30분씩 하기</span>
          <button>✓</button>
        </div>
      </div>

      {/* 금연 실패 및 재시작 버튼 */}
      <div className="button-group">
        <button onClick={handleFail} className="fail-button">
          금연 실패
        </button>
        <button onClick={handleRestart} className="restart-button">
          금연 재시작
        </button>
      </div>
    </div>
  );
}

export default Diary;
