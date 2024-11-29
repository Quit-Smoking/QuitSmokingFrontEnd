import "./CreateMission.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../../components/TopBar";
import StartMission from "../StartMission";

function NewMission() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 (0: page0, 1: page1, 2: page2)
    const [missionContent, setMissionContent] = useState(""); // 입력된 텍스트 상태
    const [selectedPeriod, setSelectedPeriod] = useState(null); // 선택된 기간
    const [selectedDays, setSelectedDays] = useState([]); // 선택된 요일
    const periods = ["1주", "2주", "4주", "8주", "12주", "16주"]; // 선택 가능한 기간
    const weekdays = ["월", "화", "수", "목", "금"]; // 평일
    const weekends = ["토", "일"]; // 주말

    // 입력값 변경 핸들러
    const handleInputChange = (e) => {
        setMissionContent(e.target.value);
    };

    // 기간 선택 처리
    const handlePeriodSelect = (index) => {
        setSelectedPeriod(index); // 선택된 박스의 인덱스를 저장
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
        if (currentPage === 0 && missionContent) {
            setCurrentPage(1);
        } else if (currentPage === 1 && selectedPeriod !== null) {
            setCurrentPage(2);
        } else if (currentPage === 2 && selectedDays.length > 0) {
            navigate("/createMission/startmission"); // startMission()으로 이동
        }
    };


    const pages = [
        // Page0
        <div className="create-mission-container" key="page0">
            <header>
                <TopBar title="중강도 운동하기" onBack={() => navigate(-1)} />
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
                        value={missionContent}
                        onChange={handleInputChange}
                    />
                </div>
            </main>
            <footer className="mission-footer">
                <button
                    className={`mission-next-btn-single ${missionContent ? "active" : ""
                        }`}
                    onClick={handleNext}
                    disabled={!missionContent}
                >
                    다음
                </button>
            </footer>
        </div>,

        // Page1
        <div className="create-mission-container" key="page1">
            <header>
                <TopBar title="카페인 섭취 안 하기" onBack={() => setCurrentPage(0)} />
            </header>
            <main className="mission-main">
                <div className="mission-text-container">
                    <h1 className="mission-title">기간 설정</h1>
                    <p className="mission-subtitle">미션을 진행할 기간을 설정해주세요</p>
                </div>
                <div className="mission-grid-container">
                    {periods.map((period, index) => (
                        <div
                            key={index}
                            className={`mission-period-box ${selectedPeriod === index ? "selected" : ""
                                }`}
                            onClick={() => handlePeriodSelect(index)}
                        >
                            {period}
                        </div>
                    ))}
                </div>
            </main>
            <footer className="mission-footer">
                <div className="mission-btn-pair">
                    <button
                        className={`mission-prev-btn active`}
                        onClick={handlePrev}
                    >
                        이전
                    </button>
                    <button
                        className={`mission-next-btn ${selectedPeriod !== null ? "active" : ""
                            }`}
                        onClick={handleNext}
                        disabled={selectedPeriod === null}
                    >
                        다음
                    </button>
                </div>
            </footer>
        </div>,

        // Page2
        <div className="create-mission-container" key="page2">
            <header>
                <TopBar title="카페인 섭취 안 하기" onBack={() => setCurrentPage(1)} />
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
                                className={`mission-day-box ${selectedDays.includes(day) ? "selected" : ""
                                    }`}
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
                                className={`mission-day-box ${selectedDays.includes(day) ? "selected" : ""
                                    }`}
                                onClick={() => handleDaySelect(day)}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="mission-footer">
                <div className="mission-btn-pair">
                    <button
                        className={`mission-prev-btn active`}
                        onClick={handlePrev}
                    >
                        이전
                    </button>
                    <button
                        className={`mission-next-btn ${selectedDays.length > 0 ? "active" : ""
                            }`}
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
