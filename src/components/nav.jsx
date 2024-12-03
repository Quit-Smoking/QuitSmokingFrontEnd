import './nav.css';
import { Navigate, useNavigate } from "react-router-dom";

function Nav() {

    const navigate = useNavigate();

    const goShop = () => {navigate('/shop');};
    const goCalendar = () => {navigate('/calendar');};
    const goHome = () => {navigate('/home');};
    const goMission = () => {navigate('/mission');};
    const goBoard = () => {navigate('/board');};

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
            <div className="nav-item ">
                <div className="nav-icon homeimg" onClick={goHome}></div>
                <p className="nav-text">홈</p>
            </div>
            <div className="nav-item ">
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