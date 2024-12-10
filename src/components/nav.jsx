import "./nav.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Nav({ currentPage }) {
    const navigate = useNavigate();
    const [canAccessHome, setCanAccessHome] = useState(false);
    const [loading, setLoading] = useState(true); // API 호출 로딩 상태

    useEffect(() => {
        const fetchAccessStatus = async () => {
            const token = localStorage.getItem("userToken");
            try {
                // 첫 번째 API 호출
                const userStartRecordResponse = await axios.get("https://quitsmoking.co.kr/UserStartRecord/doExist", {
                    params: { token },
                });

                if (userStartRecordResponse.data === true) {
                    // UserStartRecord/doExist가 true면 홈 이동 가능 상태로 설정
                    setCanAccessHome(true);
                } else {
                    // UserStartRecord/doExist가 false일 때 두 번째 API 호출
                    const cessationRecordResponse = await axios.get(
                        "https://quitsmoking.co.kr/user_cessation_record/doExist",
                        {
                            params: { token },
                        }
                    );

                    if (cessationRecordResponse.data === false) {
                        // user_cessation_record/doExist도 false면 StartPage로 이동
                        setCanAccessHome(false); // Home 비활성화
                    } else if (cessationRecordResponse.data === true) {
                        // user_cessation_record/doExist가 true면 Cessation 페이지로 이동
                        setCanAccessHome(false); // Home 비활성화
                    }
                }
            } catch (error) {
                console.error("홈 접근 상태 확인 실패:", error);
                setCanAccessHome(false); // 기본적으로 false로 설정
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchAccessStatus();
    }, []);

    const goShop = () => navigate("/shop");
    const goCalendar = () => navigate("/Diary");
    const goHome = async () => {
        if (loading) return; // 로딩 중일 때는 아무 동작하지 않음

        const token = localStorage.getItem("userToken");
        try {
            const userStartRecordResponse = await axios.get("https://quitsmoking.co.kr/UserStartRecord/doExist", {
                params: { token },
            });

            if (userStartRecordResponse.data === true) {
                navigate("/home"); // 홈 페이지로 이동
            } else {
                const cessationRecordResponse = await axios.get(
                    "https://quitsmoking.co.kr/user_cessation_record/doExist",
                    { params: { token } }
                );

                if (cessationRecordResponse.data === false) {
                    navigate("/StartPage"); // StartPage로 이동
                } else if (cessationRecordResponse.data === true) {
                    navigate("/cessation"); // Cessation 페이지로 이동
                }
            }
        } catch (error) {
            console.error("Home 버튼 클릭 중 오류:", error);
            navigate("/StartPage"); // 기본적으로 StartPage로 이동
        }
    };
    const goMission = () => navigate("/missionmain");
    const goBoard = () => navigate("/MainBoard"); // 게시판 이동

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
                className={`nav-item ${
                    !canAccessHome || currentPage === "StartPage" || currentPage === "Cessation" ? "disabled" : ""
                }`}
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
