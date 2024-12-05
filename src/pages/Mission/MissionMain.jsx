import './missionmain.css';
import ex from '../../assets/example.svg';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function getFormattedDate() {
  const today = new Date();

  // 날짜 정보 가져오기
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  // 요일 배열
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = days[today.getDay()];

  // 형식화
  const formattedDate = `${year}.${month.toString().padStart(2, "0")}.${date
    .toString()
    .padStart(2, "0")} (${dayOfWeek})`;

  return formattedDate;
}

function MissionMain() {
  //! 가져와야할 것 1. 날짜, 2. 미션, 3. 진행중인 미션 (사진, 몇주차 진행중, 몇주차 도전?)
  const userToken = localStorage.getItem('userToken');
  
  //? 예시 투두리스트
  const [todos, setTodos] = useState([
    { id: 1, text: "하루에 물 2L 마시기", completed: false },
    { id: 2, text: "중강도 운동하기", completed: false },
    { id: 3, text: "카페인 섭취 안 하기", completed: false },
    { id: 4, text: "책 한 권 읽기", completed: false },
  ]);
   //? 예시 진행 중 미션들
  const [missions, setMissions] = useState([
    {
      id: 1,
      title: "하루에 물 2L 마시기",
      description: "1주차 진행중 / 4주 도전",
      image: ex,
    },
    {
      id: 2,
      title: "중강도 운동하기",
      description: "1주차 진행중 / 1주 도전",
      image: ex,
    },
    {
      id: 3,
      title: "카페인 섭취 안하기",
      description: "1주차 진행중 / 1주 도전",
      image: ex,
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodoData = async () => {
      try {
        const response = await axios.get("http://15.164.231.201:8080/mission_record/fetchByDate",
        {
          params: {
            token: userToken,
            date: getFormattedDate(),
          },
        }
      );

        if (response !== 200) {
          throw new Error('투두리스트 fetch 서버 200 아님');
        }

        // Map API data to todos format
        const formattedTodos = response.data.map((item) => ({
          id: item.id,
          missionId: item.missionId,
          text: item.mission,
          completed: item.completed,
        }));

        setTodos(formattedTodos);
      } catch (error) {
        console.error('투두 fetch 중 에러', error);
      }
    };

    const fetchMissionData = async () => {
      try {
        const response = await axios.get("http://15.164.231.201:8080/mission/getMissions", 
          {
            params: {
              token: userToken,
            },
          }
        );

        if (response !== 200) {
          throw new Error('미션 fetch 서버 200 아님');
        }

        function calculateWeeksPassed(startDate) {
          // 서버: (YYYY-MM-DD)
          const start = new Date(startDate); 
          const today = new Date(); // 오늘 날짜
        
          const differenceInMilliseconds = today - start; // 밀리초 차이 계산
        
          // 밀리초 -> 일주일 단위
          const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
          const weeksPassed = Math.floor(differenceInMilliseconds / millisecondsInAWeek);
        
          return weeksPassed; // 경과된 주 반환
        }
        
        const formattedMissions = response.data.map((item) => ({
          id: item.id,
          title: item.mission,
          description: calculateWeeksPassed(item.startDate),
          default: item.default,
        }));

        setMissions(formattedMissions);
      } catch (error) {
        console.error('미션 fetch 중 에러', error);
      }
    }

    fetchMissionData();
    fetchTodoData();
  }, [userToken]);

  const toggleComplete = async (id, missionId) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      
      const updatedTodo = { ...todo, completed: !todo.completed };

      const response = await axios.get("http://15.164.231.201:8080/mission_record/completedMission",
        {
          params: {
            token: userToken,
            missionRecordId: missionId,
          }
        }
      );

      if (response.status !== 200) {
        throw new Error('투두리스트 완료 서버 전송 200 아님');
      }

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.log('투두리스트 완료 상태 업데이트 중 에러', error);
    }
  };

  return (
    <div className="mission-main-container">
      <p className="mission-main-title">금연 미션</p>
      <div className="mission-todo">
        <div className="todo-banner">
          <p className="todo-title">Todo</p>
          <p className="todo-date">{getFormattedDate()}</p>
        </div>
        <div className="todo-list">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
            onClick={() => toggleComplete(todo.id, todo.missionId)}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="todo-checkbox"
            />
            <span>{todo.text}</span>
          </div>
        ))}
      </div>
      </div>
      <div className="main-ongoing">
        <div className="ongoing-banner">
          <p className="ongoing-title">진행 중인 미션</p>
          <button
            className="ongoing-add"
            onClick={() => navigate('/missionSelect')}
          >
            미션 추가
          </button>
        </div>
        <div className="ongoing-content">
          {missions.map((mission) => (
            <div key={mission.id} className="ongoing-card">
              <img
                src={mission.image}
                alt="example photo"
                className="ongoing-image"
              />
              <div className="ongoing-card-banner">
                <p className="ongoing-card-title">{mission.title}</p>
              </div>
              <p className="ongoing-card-desc">{mission.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MissionMain;