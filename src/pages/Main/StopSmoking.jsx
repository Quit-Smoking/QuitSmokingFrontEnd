import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./stopsmoking.css";

import cloudImg from "../../assets/캐릭터.png";
import closeIcon from "../../assets/closeicon.png";

function StopSmoking() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [differenceInDays, setdifferenceInDays] = useState(state.differenceInDays || 0);
    const [resolution,setresolution] = useState(state.resolution);

    console.log(resolution,differenceInDays);


    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleConfirmChange = () => {
        setIsConfirmed((prev) => !prev);
    };

    const handleStopSmoking = async () => {
        const token = `
        eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxd2VyMTIzNEBuYXZlci5jb20iLCJpYXQiOjE3MzMzNzQwNDAsImV4cCI6MTczMzQxMDA0MH0.u_Q-tJu4kzZztYjK-Y3fNk3Xt2Kez3EM-Ge2l-k9UHY
        `;

        try {
            const response = await axios.delete("http://15.164.231.201:8080/UserStartRecord/stop", {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    token: token, // 토큰 전달
                },
            });

            if (response.status === 200) {
                alert("금연 데이터가 성공적으로 삭제되었습니다.");
                navigate("/home");
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