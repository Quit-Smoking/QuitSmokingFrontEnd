import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Diary.css";
import CheckBox from "../../assets/CheckBox.svg";
import notCheckBox from "../../assets/notCheckBox.svg";
import Character from "../../assets/Character.svg";
import DiaryIcon from "../../assets/DiaryIcon.svg";
import Nav from "../../components/nav";
import water from "../../assets/mission/water.svg";

function Diary() {
  const [date, setDate] = useState(new Date());
  const [missions, setMissions] = useState([]); // 미션 데이터 저장
  const [startDate, setStartDate] = useState(null); // 금연 시작일 저장
  const [error, setError] = useState(null); // 에러 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 금연 시작일 가져오기
  const fetchStartDate = async () => {
    const token = localStorage.getItem("userToken");

    try {
      const response = await axios.get(
        "http://15.164.231.201:8080/UserStartRecord/findUserStartRecord",
        {
          params: { token },
        }
      );

      if (response.status === 200 && response.data.startDate) {
        setStartDate(response.data.startDate); // 시작 날짜 설정
        console.log("금연 시작일:", response.data.startDate);
      } else {
        console.warn("금연 시작일 데이터를 가져오지 못했습니다.");
        setStartDate(null);
      }
    } catch (err) {
      console.error("API 요청 실패:", err);
      setStartDate(null);
    }
  };

  const fetchMissions = async (selectedDate) => {
    const token = localStorage.getItem("userToken");

    setIsLoading(true); // 로딩 시작
    setError(null); // 에러 초기화

    try {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      const response = await axios.get(
        "http://15.164.231.201:8080/mission_record/fetchByDate",
        {
          params: {
            token: token,
            date: formattedDate,
          },
        }
      );

      if (response.status === 200 && response.data.length > 0) {
        setMissions(response.data); // 받아온 미션 데이터 설정
      } else {
        setMissions([]); // 데이터가 없을 경우 빈 배열 설정
      }
    } catch (err) {
      console.error("API 요청 실패:", err);
      setError("미션 데이터를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleDateChange = async (selectedDate) => {
    setDate(selectedDate);
    await fetchMissions(selectedDate);
  };

  useEffect(() => {
    fetchStartDate(); // 금연 시작일 가져오기
    fetchMissions(date); // 초기 미션 데이터 가져오기
  }, []);

  const customTileContent = ({ date, view }) => {
    if (view === "month" && startDate) {
      const today = new Date(); // 오늘 날짜
      const formattedStartDate = new Date(startDate); // 시작 날짜

      if (date.toDateString() === today.toDateString()) {
        // 오늘 날짜에 구름 아이콘 표시
        return (
          <div className="today-icon">
            <img src={Character} alt="character" />
          </div>
        );
      }

      if (date >= formattedStartDate && date < today) {
        // 금연 시작일부터 어제까지 밑줄 표시
        return <div className="past-day-bar"></div>;
      }
    }
    return null;
  };

  return (
    <div className="full_container">
      <div className="diary-container">
        <div className="calendar-container">
          <Calendar
            formatDay={(locale, date) => moment(date).format("D")}
            formatMonthYear={(locale, date) => moment(date).format("M")}
            calendarType="gregory"
            tileContent={customTileContent}
            onChange={handleDateChange}
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
            {isLoading ? (
              <p>로딩 중...</p>
            ) : error ? (
              <p>{error}</p>
            ) : missions.length > 0 ? (
              missions.map((mission, index) => (
                <div key={index} className="mission">
                  <div className="mission_box">
                    <img
                      src={water} // 기본 아이콘 추가
                      alt="mission-icon"
                      className="mission-icon"
                    />
                    <div className="mission_text">
                      <div className="text_1">
                        <p>{mission.mission}</p>
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
      <div>
        <Nav />
      </div>
    </div>
  );
}

export default Diary;
