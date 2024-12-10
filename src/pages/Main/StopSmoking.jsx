import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./stopsmoking.css";

import cloudImg from "../../assets/char.png";
import closeIcon from "../../assets/closeicon.png";

function StopSmoking() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [differenceInDays, setdifferenceInDays] = useState(state.differenceInDays || 0);
    const [extendedLifeDays, setextendedLifeDays] = useState(state.extendedLifeDays);
    const [resolution, setresolution] = useState(state.resolution);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const savedMoneyExact = state.savedMoneyExact;

    const handleConfirmChange = () => {
        setIsConfirmed((prev) => !prev);
    };

    const handleStopSmoking = async () => {
        const token = localStorage.getItem("userToken");

        try {
            
            const response = await axios.delete("https://quitsmoking.co.kr/UserStartRecord/stop", {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    token: token,
                    savedTime:extendedLifeDays,
                    savedMoney:savedMoneyExact
                },
            });

            if (response.status === 200) {
                alert("금연 데이터가 성공적으로 삭제되었습니다.");
                navigate("/cessation");
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            console.error("Error deleting smoking data:", error);
            alert("금연 중단 처리에 실패했습니다.");
        }
    };

    return (
        <div className="StopSmoking-Container">
            <header className="StopSmoking-Header">
                <h1 className="StopSmoking-Title">금연중단</h1>
                <img
                    src={closeIcon}
                    alt="닫기 버튼"
                    className="StopSmoking-CloseButton"
                    onClick={() => navigate(-1)}
                />
            </header>
            <main className="StopSmoking-Main">
                <div className="StopSmoking-Timer">
                    <h2>금연한지</h2>
                    <div className="StopSmoking-Time">D+{differenceInDays}</div>
                </div>
                <div className="StopSmoking-Cloud">
                    <img src={cloudImg} alt="클라우드 이미지" />
                </div>
                <div className="StopSmoking-Resolution">{resolution || "건강한 나의 삶을 위해!"}</div>
            </main>
            <footer className="StopSmoking-Footer">
                <div className="StopSmoking-ConfirmContainer">
                    <p className="StopSmoking-ConfirmText">정말 금연을<br />중단하시겠습니까?</p>
                    <div className="StopSmoking-CheckboxWrapper">
                        <input
                            type="checkbox"
                            id="stopSmoking"
                            checked={isConfirmed}
                            onChange={handleConfirmChange}
                        />
                        <label htmlFor="stopSmoking">금연을 중단합니다.</label>
                    </div>
                </div>
                <button
                    className={`StopSmoking-SubmitBtn ${isConfirmed ? "active" : ""}`}
                    onClick={handleStopSmoking}
                    disabled={!isConfirmed}
                >
                    금연 중단
                </button>
            </footer>
        </div>
    );
}

export default StopSmoking;
