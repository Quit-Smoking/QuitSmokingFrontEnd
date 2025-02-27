import "./CreateMission.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../../components/TopBar";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function NewMission() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 (0: page0, 1: page1, 2: page2)
    const [missionName, setMissionName] = useState(""); // 입력된 텍스트 상태
    const [selectedPeriod, setSelectedPeriod] = useState(null); // 선택된 기간
    const [selectedDays, setSelectedDays] = useState([]); // 선택된 요일
    const weekdays = ["월", "화", "수", "목", "금"]; // 평일
    const weekends = ["토", "일"]; // 주말
    const defaultMission = false;

    // 입력값 변경 핸들러
    const handleInputChange = (e) => {
        setMissionName(e.target.value);
    };

    // 요일 선택 처리
    const handleDaySelect = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    // 이전 버튼 핸들러
    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 다음 버튼 핸들러
    const handleNext = () => {
        if (currentPage === 0 && missionName) {
            setCurrentPage(1);
        } else if (currentPage === 1 && selectedDays.length > 0) {
            setCurrentPage(2);
            const sortedDays = sortDays(selectedDays);
            console.log("선택된 요일 (정렬 후):", sortedDays);
            navigate("/startmission", {
                state: { missionName, selectedDays: sortedDays, defaultMission },
            });
        }
    };

    // 요일을 오름차순으로 정렬하는 함수
    const sortDays = (days) => {
        const dayOrder = ["월", "화", "수", "목", "금", "토", "일"];
        return [...days].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
    };

    const pages = [
        // Page0
        <div className="create-mission-container" key="page0">
            <header>
                <TopBar title="미션 생성하기" onBack={() => navigate(-1)} />
            </header>
            <main className="mission-main">
                <div className="mission-text-container">
                    <h1 className="mission-title">미션 내용 입력</h1>
                    <p className="mission-subtitle">어떤 미션을 진행할지 정해주세요</p>
                </div>
                <div className="mission-input-container">
                    <input
                        className="mission-input"
                        type="text"
                        placeholder="내용을 입력하세요"
                        value={missionName}
                        onChange={handleInputChange}
                    />
                </div>
            </main>
            <footer className="mission-footer">
                <button
                    className={`mission-next-btn-single ${missionName ? "active" : ""}`}
                    onClick={handleNext}
                    disabled={!missionName}
                >
                    다음
                </button>
            </footer>
        </div>,

        // Page2
        <div className="create-mission-container" key="page2">
            <header>
                <TopBar title={missionName} onBack={() => setCurrentPage(0)} />
            </header>
            <main className="mission-main">
                <div className="mission-text-container">
                    <h1 className="mission-title">요일 설정</h1>
                    <p className="mission-subtitle">미션을 수행할 요일을 설정해주세요</p>
                </div>
                <div className="mission-days-container">
                    {/* 평일 */}
                    <div className="mission-weekdays-container">
                        {weekdays.map((day, index) => (
                            <div
                                key={index}
                                className={`mission-day-box ${selectedDays.includes(day) ? "selected" : ""}`}
                                onClick={() => handleDaySelect(day)}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                    {/* 주말 */}
                    <div className="mission-weekend-container">
                        {weekends.map((day, index) => (
                            <div
                                key={index}
                                className={`mission-day-box ${selectedDays.includes(day) ? "selected" : ""}`}
                                onClick={() => handleDaySelect(day)}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="selected-days-container">
                </div>
            </main>
            <footer className="mission-footer">
                <div className="mission-btn-pair">
                    <button className={`mission-prev-btn active`} onClick={handlePrev}>
                        이전
                    </button>
                    <button
                        className={`mission-next-btn ${selectedDays.length > 0 ? "active" : ""}`}
                        onClick={handleNext}
                        disabled={selectedDays.length === 0}
                    >
                        다음
                    </button>
                </div>
            </footer>
        </div>,
    ];

    return <>{pages[currentPage]}</>;
}

export default NewMission;
