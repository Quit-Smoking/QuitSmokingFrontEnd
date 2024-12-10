import React, { useState, useEffect } from "react";
import logo from "../../assets/logo_letters.svg";
import cloudchar from "../../assets/cloudchar.png";
import shadow from "../../assets/shadowblue.png";
import menuIcon from "../../assets/Menu.png";
import axios from "axios";
import Nav from "../../components/nav";
import "./cessation.css";
import MenuModal from "./HomeModal/MenuModal";

import { useNavigate, useLocation } from "react-router-dom";

const Cessation = () => {
    const navigate = useNavigate();

    const { state } = useLocation();

    const differenceInDays = state?.differenceInDays || 0;
    const savedMoneyExact = state?.savedMoneyExact || 0;

    const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 모달 상태
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // 메뉴 모달 토글
    const closeMenuModal = () => setIsMenuOpen(false); // 메뉴 모달 닫기

    const handleRetry = () => {
        // "금연 재도전하기" 버튼을 클릭했을 때의 동작
        navigate("/startpage/survey");
    };

    const fetchData = async () => {
        const token = localStorage.getItem("userToken");

        try {
            const response = await axios.get("https://quitsmoking.co.kr/user_cessation_record/findByUser", {
                params: { token },
            });
            console.log(response.data);
            setData(response.data);
        } catch (err) {
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

    const calculateDaysDifference = (startDate, endDate) => {
        if (!startDate || !endDate) return "기록이 없습니다.";
        const diffInMilliseconds = new Date(endDate) - new Date(startDate);
        return `${Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))}일`;
    };

    return (
        <>
            {isMenuOpen && (
                <MenuModal
                    nickname={localStorage.getItem("userNickname")}
                    email={localStorage.getItem("userEmail")}
                    onClose={closeMenuModal}
                    navigate={navigate}
                    disableClock={true} // 금연 시계를 비활성화
                />
            )}
            <div className="cessation-container">
                <div className="cessation-header">
                    <img src={logo} alt="숨쉴래 로고" className="cessation-header-logo" />
                    <img
                        src={menuIcon}
                        alt="메뉴 아이콘"
                        className="cessation-menu-icon"
                        onClick={toggleMenu} // 메뉴 버튼 클릭 시 모달 열기
                    />
                </div>
                <div className="cessation-main">
                    <div className="cessation-record">
                        <div>지난 금연 기록</div>
                        <h2>{calculateDaysDifference(data?.start_date, data?.end_date)}</h2>
                    </div>

                    <div className="cessation-logo">
                        <div className="cessation-cloud">
                            <img src={cloudchar} alt="클라우드 캐릭터" />
                        </div>
                    </div>

                    <div className="cessation-message">
                        {/* "건강한 나의 삶을 위해" */}
                        <div>건강한 나의 삶을 위해</div>
                        {/* 금연 재도전하기 버튼 */}
                        <button className="retry-button" onClick={handleRetry}>
                            금연 재도전하기
                        </button>
                    </div>

                    <div className="cessation-report">
                        <div className="cessation-report-container">
                            <div className="cessation-report-black">
                                <div className="cessation-report-white">
                                    <div className="cessation-report-title">
                                        <div>지난 금연 리포트</div>
                                    </div>
                                    <div className="cessation-report-details">
                                        <div className="cessation-report-box">
                                            <div>연장한 수명</div>
                                            <div className="cessation-report-time-img"></div>
                                            <div>{data.savedTime != 0 ? data.savedTime  : 0}일</div>
                                        </div>
                                        <div className="cessation-report-box">
                                            <div>아낀 돈</div>
                                            <div className="cessation-report-money-img"></div>
                                            <div>{data?.savedMoney}원</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cessation-footer">
                    <Nav currentPage="Cessation" />
                </div>
            </div>
        </>
    );
};

export default Cessation;
