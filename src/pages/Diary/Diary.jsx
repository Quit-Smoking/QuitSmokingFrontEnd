import { useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Diary.css";
import CheckBox from "../../assets/CheckBox.svg";
import notCheckBox from "../../assets/notCheckBox.svg";
import Character from "../../assets/Character.svg";
import DiaryIcon from "../../assets/DiaryIcon.svg";

function Diary() {
  const [date, setDate] = useState(new Date());
  const missions = [
    {
      date: "2024-11-25",
      description: "하루에 물 2L 마시기",
      progress: "누적 2일 성공 / 5일 진행 중",
      completed: false,
      image: "/icons/water.svg",
    },
    {
      date: "2024-11-27",
      description: "하루에 물 2L 마시기",
      progress: "누적 2일 성공 / 5일 진행 중",
      completed: false,
      image: "/icons/water.svg",
    },
    {
      date: "2024-11-27",
      description: "매일 운동 30분 하기",
      progress: "누적 4일 성공 / 5일 진행 중",
      completed: true,
      image: "/icons/exercise.svg",
    },
    {
      date: "2024-11-29",
      description: "매일 운동 30분 하기",
      progress: "누적 4일 성공 / 5일 진행 중",
      completed: true,
      image: "/icons/exercise.svg",
    },
    {
      date: "2025-11-27",
      description: "매일 운동 30분 하기",
      progress: "누적 4일 성공 / 5일 진행 중",
      completed: true,
      image: "/icons/exercise.svg",
    },
  ];

  const selectedMissions = missions.filter(
    (mission) => mission.date === moment(date).format("YYYY-MM-DD")
  );

  const customTileContent = ({ date, view }) => {
    if (view === "month") {
      const today = new Date();
      const isToday = date.toDateString() === today.toDateString();
      const isPastDay = date < today;

      if (isToday) {
        return (
          <div className="today-icon">
            <img src={Character} alt="character" />
          </div>
        ); // 당일 구름 아이콘
      }

      if (isPastDay) {
        return <div className="past-day-bar"></div>; // 지난 날 파란 줄
      }
    }
    return null;
  };

  return (
    <div className="diary-container">
      <div className="calendar-container">
        <Calendar
          formatDay={(locale, date) => moment(date).format("D")}
          formatMonthYear={(locale, date) => moment(date).format("M")}
          calendarType="gregory"
          tileContent={customTileContent}
          onChange={setDate}
          value={date}
          prev2Label={null}
          next2Label={null}
          prevLabel={null}
          nextLabel={null}
          navigationLabel={({ label }) => (
            <div className="calendar-navigation-label">
              <div className="Diary_title_left">
                <div className="Diary_title_1">금연</div>
                <div className="Diary_title_2">캘린더</div>
              </div>
              <div className="Diary_title_mid">
                <span className="calendar-label-text">{label}</span>
                <span className="calendar-icon">
                  <img src={DiaryIcon} alt="" />
                </span>
              </div>
              <div className="Diary_title_right">
                <div className="Diary_title_1">누적금연일</div>
                <div className="Diary_title_2">총6일</div>
              </div>
            </div>
          )}
        />
      </div>

      <div className="record-section">
        <h3>
          {moment(date).isSame(new Date(), "day")
            ? "오늘의 기록"
            : `${moment(date).format("M월 D일")}의 기록`}
        </h3>
        <div className="missions">
          {selectedMissions.length > 0 ? (
            selectedMissions.map((mission, index) => (
              <div key={index} className="mission">
                <div className="mission_box">
                  <img
                    src={mission.image}
                    alt="mission-icon"
                    className="mission-icon"
                  />
                  <div className="mission_text">
                    <div className="text_1">
                      <p>{mission.description}</p>
                    </div>
                    <div className="text_2">
                      <p>{mission.progress}</p>
                    </div>
                  </div>
                </div>
                {mission.completed ? (
                  <img src={CheckBox} alt="완료" className="icon-completed" />
                ) : (
                  <img
                    src={notCheckBox}
                    alt="미완료"
                    className="icon-pending"
                  />
                )}
              </div>
            ))
          ) : (
            <p>기록이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Diary;
