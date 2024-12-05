import "./nav.css";
import { useNavigate } from "react-router-dom";

function Nav({ currentPage }) {
  const navigate = useNavigate();

  const goShop = () => navigate("/shop");
  const goCalendar = () => navigate("/Diary");
  const goHome = () => {
    if (currentPage !== "StartPage") {
      navigate("/home");
    }
  };
  const goMission = () => navigate("/missionselect");
  const goBoard = () => navigate("/board"); //게시판 해야됨.

  return (
    <div className="nav-container">
      <div className="nav-item">
        <div className="nav-icon storeimg" onClick={goShop}></div>
        <p className="nav-text padding">상점</p>
      </div>
      <div className="nav-item">
        <div className="nav-icon calenderimg" onClick={goCalendar}></div>
        <p className="nav-text">캘린더</p>
      </div>
      <div
        className={`nav-item ${currentPage === "StartPage" ? "disabled" : ""}`}
      >
        <div className="nav-icon homeimg" onClick={goHome}></div>
        <p className="nav-text">홈</p>
      </div>
      <div className="nav-item">
        <div className="nav-icon missionimg" onClick={goMission}></div>
        <p className="nav-text">미션</p>
      </div>
      <div className="nav-item">
        <div className="nav-icon boardimg" onClick={goBoard}></div>
        <p className="nav-text">게시판</p>
      </div>
    </div>
  );
}

export default Nav;
