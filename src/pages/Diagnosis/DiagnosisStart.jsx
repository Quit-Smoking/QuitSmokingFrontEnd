import React, { useEffect, useState } from "react";
import "./diagnosisstart.css";
import closeIcon from "../../assets/closeicon.png";
import cloudImg from "../../assets/char.png";
import circleImg from "../../assets/circleImg.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DiagnosisStart() {
    const navigate = useNavigate();
    const [isDiagnosed, setIsDiagnosed] = useState(null); // 진단 여부 상태
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    const fetchData = async () => {
        const token = localStorage.getItem("userToken");

        try {
            const response = await axios.get(
                "https://quitsmoking.co.kr/nicotin_dependencies/isTested",
                {
                    params: { token },
                }
            );
            setIsDiagnosed(response.data); // true/false 값 설정
        } catch (e) {
            setError("API 요청에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) return <div></div>;
    if (error) return <div>{error}</div>;

    const handleDiagnosis = () => {
        navigate("./diagnosis");
    };

    const handleViewResults = () => {
        navigate("/result");
    };

    return (
        <div className="DiagnosisStart-Container">
            <header className="DiagnosisStart-Header">
                <img
                    src={closeIcon}
                    alt="닫기 버튼"
                    className="DiagnosisStart-close-button"
                    onClick={() => navigate(-1)}
                />
            </header>

            <main className="DiagnosisStart-Main">
                <h1 className="DiagnosisStart-Title">니코틴 의존도 진단</h1>

                <div className="DiagnosisStart-Logo">
                    <img src={circleImg} alt="배경 원" className="circle-img" />
                    <img src={cloudImg} alt="클라우드 이미지" className="cloud-img" />
                </div>

                <p className="DiagnosisStart-Subtitle">
                    <div>자신의 상태를 파악하는 것은 금연에 도움이 됩니다.</div>
                    <div>금연을 시작하기 전에, 니코틴 의존 정도를 점검해 보세요.</div>
                </p>

                <button className="DiagnosisStart-Btn" onClick={handleDiagnosis}>
                    니코틴 의존도 진단하기
                </button>

                {isDiagnosed && (
                    <button
                        className="DiagnosisStart-Secondary-Btn"
                        onClick={handleViewResults}
                    >
                        지난 진단 결과 보기
                    </button>
                )}
            </main>
        </div>
    );
}

export default DiagnosisStart;
