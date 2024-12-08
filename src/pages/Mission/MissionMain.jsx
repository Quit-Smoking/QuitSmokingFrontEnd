import './missionmain.css';
import ex from '../../assets/missionMain/example.svg';
import de from '../../assets/missionMain/default.svg';
import exer from '../../assets/missionMain/exercise.svg';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/nav';

function getFormattedDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
}

function getFormattedDate2() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = days[today.getDay()];
  return `${year}-${month.toString().padStart(2, "0")}-${date.toString().padStart(2, "0")} (${dayOfWeek})`;
}

function MissionMain() {
  const userToken = localStorage.getItem('userToken');
  const [todos, setTodos] = useState([]);
  const [missions, setMissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodoData = async () => {
      const formattedDate = getFormattedDate();
      try {
        const response = await axios.get("https://quitsmoking.co.kr/mission_record/fetchByDate", {
          params: {
            token: userToken,
            date: formattedDate,
          },
        });

        if (response.status !== 200) {
          throw new Error('투두리스트 fetch 서버 200 아님', response.status);
        }

        const formattedTodos = response.data.map((item) => ({
          id: item.id,
          missionId: item.missionId,
          text: item.mission,
          date: item.date,
          completed: item.completed,
        }));

        setTodos(formattedTodos);
      } catch (error) {
        console.error('투두 fetch 중 에러', error);
      }
    };

    const fetchMissionData = async () => {
      try {
        const response = await axios.get("https://quitsmoking.co.kr/mission/getMissions", {
          params: { token: userToken },
        });

        if (response.status !== 200) {
          throw new Error('미션 fetch 서버 200 아님', response.status);
        }

        function calculateWeeksPassed(startDate) {
          const start = new Date(startDate);
          const today = new Date();
          const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
          return Math.floor((today - start) / millisecondsInAWeek);
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
    };

    fetchMissionData();
    fetchTodoData();
  }, [userToken]);

  const toggleComplete = async (id, missionId) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) throw new Error('투두 항목을 찾을 수 없음');

      const formattedDate = getFormattedDate();

      // /mission/complete API 호출
      const response = await axios.post("https://quitsmoking.co.kr/mission/complete", null, {
        params: {
          token: userToken,
          id: missionId,
          date: formattedDate,
        },
      });

      if (response.status !== 200) {
        throw new Error('미션 완료 서버 요청 실패');
      }

      // UI에서 상태 업데이트
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: true } : todo
        )
      );

      alert('미션을 완료했습니다!');
    } catch (error) {
      console.error('미션 완료 처리 중 에러:', error);
      alert('미션 완료 처리 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className="mission-main-container">
      <p className="mission-main-title">금연 미션</p>
      <div className="mission-todo">
        <div className="todo-banner">
          <p className="todo-title">Todo</p>
          <p className="todo-date">{getFormattedDate2()}</p>
        </div>

        <div className="todo-list">
          {todos.length > 0 ? (
            todos.map((todo) => (
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
            ))
          ) : (
            <p>미션을 시작해보세요!</p>
          )}
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
                src={mission.title === '운동하기' ? exer : mission.title === '물 마시기' ? ex : de}
                alt="example photo"
                className="ongoing-image"
              />
              <div className="ongoing-card-banner">
                <p className="ongoing-card-title">{mission.title}</p>
              </div>
              <p className="ongoing-card-desc">{mission.description}주째 진행 중</p>
            </div>
          ))}
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default MissionMain;
