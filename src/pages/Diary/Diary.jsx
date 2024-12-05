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

// const fetchMissions = async (selectedDate) => {
//   const token = localStorage.getItem("userToken"); // 토큰 가져오기
//   if (!token) {
//     setError("로그인이 필요합니다.");
//     setIsLoading(false);
//     return;
//   }

//   setIsLoading(true); // 로딩 시작
//   setError(null); // 에러 초기화

//   try {
//     const response = await axios.get(
//       "/mission_record/fetchByDate", // API 엔드포인트
//       {
//         params: {
//           token: token,
//           date: moment(selectedDate).format("YYYY-MM-DD"), // 선택된 날짜
//         },
//       }
//     );

//     if (response.status === 200 && response.data) {
//       // 받아온 데이터가 객체인 경우 배열로 변환
//       const data = Array.isArray(response.data) ? response.data : [response.data];
//       setMissions(data); // 받아온 미션 데이터 설정
//     } else {
//       setMissions([]); // 데이터가 없을 경우 빈 배열 설정
//     }
//   } catch (err) {
//     console.error("Error fetching missions:", err);
//     setError("미션 데이터를 불러오지 못했습니다.");
//   } finally {
//     setIsLoading(false); // 로딩 끝
//   }
// };

function Diary() {
  const [date, setDate] = useState(new Date());
  const [missions, setMissions] = useState([]); // 미션 데이터 저장
  const [error, setError] = useState(null); // 에러 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  const fetchMissions = async (selectedDate) => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzMzMjIxOTQ2LCJleHAiOjE3MzMyNTc5NDZ9.BmDtkVCh4olVvZb7COzuum4DQWR4Je4oeDfVKC9Ewec"; // 하드코딩된 토큰

    setIsLoading(true); // 로딩 시작
    setError(null); // 에러 초기화

    try {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      console.log("API 요청에 사용된 날짜:", formattedDate);

      const response = await axios.get(
        "http://15.164.231.201:8080/mission_record/fetchByDate",
        {
          params: {
            token: token,
            date: formattedDate,
          },
        }
      );

      if (
        response.status === 200 &&
        response.data &&
        response.data.length > 0
      ) {
        setMissions(response.data); // 받아온 미션 데이터 설정
      } else {
        console.warn("선택된 날짜에 데이터가 없습니다.");
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

  // 날짜 변경 시 API 호출
  useEffect(() => {
    fetchMissions(date);
  }, [date]);

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
    <div className="full_container">
      <div className="diary-container">
        <div className="calendar-container">
          <Calendar
            formatDay={(locale, date) => moment(date).format("D")}
            formatMonthYear={(locale, date) => moment(date).format("M")}
            calendarType="gregory"
            tileContent={customTileContent}
            onChange={handleDateChange} // handleDateChange를 사용하도록 수정
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
                      src={mission.image || "/icons/default.svg"} // 기본 아이콘 추가
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
