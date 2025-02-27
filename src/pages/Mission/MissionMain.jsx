import './missionmain.css';
import ex from '../../assets/missionMain/example.svg';
import de from '../../assets/missionMain/default.svg';
import exer from '../../assets/missionMain/exercise.svg';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/nav';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// 오늘 날짜를 String 형태로 변환해 불러온다.
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
  const [refresh, setRefresh] = useState(false); // 화면 새로고침 상태
  const navigate = useNavigate();

  // Todos를 업데이트 해 준다.
  const fetchTodoData = async () => {
    const formattedDate = getFormattedDate();
    try {
      // 백앤드에 fetchByDate 요청. 현재 날짜로 지정해 오늘의 Todo만 가지고 온다.
      const response = await axios.get(`${backendUrl}/mission_record/fetchByDate`, {
        params: {
          token: userToken,
          date: formattedDate,
        },
      });

      if (response.status !== 200) {
        throw new Error('투두리스트 fetch 서버 200 아님', response.status);
      }
      
      // 하나씩 다시 매핑해준다.
      const formattedTodos = response.data.map((item) => ({
        id: item.id,
        missionId: item.missionId,
        text: item.mission,
        date: item.date,
        completed: item.completed,
      }));
      
      // Todos 저장.
      setTodos(formattedTodos);
    } catch (error) {
      console.error('투두 fetch 중 에러', error);
    }
  };

  // 미션을 업데이트 해준다.
  const fetchMissionData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/mission/getMissions`, {
        params: { token: userToken },
      });

      if (response.status !== 200) {
        throw new Error('미션 fetch 서버 200 아님', response.status);
      }
      
      // 몇 주가 지났는지 계산.
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

      console.log( formattedMissions);
      setMissions(formattedMissions);
    } catch (error) {
      console.error('미션 fetch 중 에러', error);
    }
  };

  // 렌더링 시마다 실행.
  useEffect(() => {
    fetchMissionData();
    fetchTodoData();
  }, [userToken, refresh]); // refresh 상태가 변경되면 데이터를 다시 불러옴


  // Todo complete
  const toggleComplete = async (id, missionId) => {
    try {
      const todo = todos.find((todo) => todo.id == id);
      if (!todo) throw new Error("투두 항목을 찾을 수 없음");
  
      // 이미 완료된 미션은 다시 완료 처리하지 않음
      if (todo.completed) {
        alert("이미 완료된 미션입니다!");
        return;
      }
  
      if (!window.confirm("미션을 완료하셨습니까?")) {
        return; // 사용자가 취소를 누른 경우 아무 작업도 하지 않음
      }
  

      const response = await axios.post(`${backendUrl}/mission/complete`, null, {
        params: {
          token: userToken,
          id: missionId,
          date: getFormattedDate(),
        },
      });
  
      if (response.status !== 200) {
        throw new Error("투두 완료 처리 실패");
      }
  
      // 상태를 무조건 true로 업데이트
      const updatedTodo = { ...todo, completed: true };
  
      // 상태 업데이트.
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? updatedTodo : todo
        )
      );
  
      alert("미션이 완료되었습니다!");
    } catch (error) {
      console.error("투두 완료 처리 중 에러:", error);
      alert("미션 완료 처리 중 문제가 발생했습니다.");
    }
  };
  

  // 미션 삭제
  const deleteMission = async (missionId) => {
    try {
      if (window.confirm("삭제하시겠습니까?")) {
        const response = await axios.post(`${backendUrl}/mission/deleteMission`, null, {
          params: { missionId },
        });

        if (response.status !== 200) {
          throw new Error('미션 삭제 실패');
        }

        alert("미션이 삭제되었습니다.");
        setRefresh((prev) => !prev); // refresh 상태를 변경하여 전체 렌더링 트리거
      }
    } catch (error) {
      console.error('미션 삭제 중 에러:', error);
      alert('미션 삭제 처리 중 문제가 발생했습니다.');
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
                onClick={() => toggleComplete(todo.id, todo.missionId)} // 투두 클릭 시 완료 처리
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
            <div
              key={mission.id}
              className="ongoing-card"
              onClick={() => deleteMission(mission.id)} // 카드 클릭 시 삭제 로직 실행
            >
              <img
                src={mission.title === '운동하기' ? exer : mission.title === '물 마시기' ? ex : de}
                alt="example photo"
                className="ongoing-image"
              />
              <div className="ongoing-card-banner">
                <p className="ongoing-card-title">{mission.title}</p>
              </div>
              <p className="ongoing-card-desc">{mission.description +2}주째 진행 중</p>
            </div>
          ))}
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default MissionMain;
