import React, { useState, useEffect } from "react";
import logo from "../../assets/logo_letters.svg";
import homecloud from "../../assets/home캐릭터.png";
import shadow from "../../assets/그림자.png";
import menuIcon from "../../assets/menu.png"; // 메뉴 아이콘 이미지
import axios from "axios";
import sun from "../../assets/Sun.png";
import Nav from "../../components/nav";
import "./Css/Home.css";

const Home = () => {
    const [data, setData] = useState(null); // 데이터 상태
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 금연 시작 모달 상태
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 모달 상태

    const closeModal = () => {
        setIsModalOpen(false);
        localStorage.setItem("isModalShown", "true"); // 모달 상태 저장
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenuModal = () => setIsMenuOpen(false); // 메뉴 모달 닫기

    const fetchData = async () => {
        const token = `
        eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqa2cwNjkxQG5hdmVyLmNvbSIsImlhdCI6MTczMzI4Njk1OCwiZXhwIjoxNzMzMzIyOTU4fQ.i8HIMFTk9LvDYOFjtetPV-cQeG77H4rNzYlqBd4R3GY
        `;

        try {
            const [recordResponse, nicknameResponse, emailResponse] = await Promise.all([
                axios.get("http://15.164.231.201:8080/UserStartRecord/findUserStartRecord", { params: { token } }),
                axios.get("http://15.164.231.201:8080/user/getNickname", { params: { token } }),
                axios.get("http://15.164.231.201:8080/user/getEmail", { params: { token } }),
            ]);

            setData({
                ...recordResponse.data,
                nickname: nicknameResponse.data,
                email: emailResponse.data,
            });
        } catch (err) {
            setError("API 요청에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        const modalShown = localStorage.getItem("isModalShown");
        if (!modalShown) {
            setIsModalOpen(true); // 모달 표시
        }
    }, []);

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    const nowDate = new Date();
    const startDate = new Date(data.startDate);
    const differenceInDays = Math.floor((nowDate - startDate) / (1000 * 60 * 60 * 24));
    const savedMoneyExact = data.numbersSmoked * differenceInDays * (4500 / 20);

    return (
        <>
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <img src={sun} className="modal-image" alt="Sun" />
                        <h2>시작이 반이다!</h2>
                        <p>금연 시작하기</p>
                    </div>
                </div>
            )}

            {isMenuOpen && (
                <div className="menu-modal-overlay" onClick={closeMenuModal}>
                    <div
                        className="menu-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="menu-header">{data.nickname} 님</div>
                        <div className="menu-body">
                            {/* 계정 섹션 */}
                            <div className="menu-section">
                                <span className="menu-title">계정</span>
                                <div className="menu-item">아이디 : {data.email}</div>
                                <div className="menu-item" onClick={() => console.log("비밀번호 변경")}>
                                    비밀번호 변경
                                </div>
                                <div className="menu-item" onClick={() => console.log("닉네임 변경")}>
                                    닉네임 변경
                                </div>
                            </div>

                            {/* 금연 시계 섹션 */}
                            <div className="menu-section">
                                <span className="menu-title">금연 시계</span>
                                <div className="menu-item" onClick={() => console.log("금연 각오 수정")}>
                                    금연 각오 수정
                                </div>
                                <div className="menu-item" onClick={() => console.log("금연 중단")}>
                                    금연 중단
                                </div>
                            </div>

                            {/* 금연 게시판 섹션 */}
                            <div className="menu-section">
                                <span className="menu-title">금연 게시판</span>
                                <div className="menu-item" onClick={() => console.log("작성한 글")}>
                                    작성한 글
                                </div>
                                <div className="menu-item" onClick={() => console.log("댓글 단 글")}>
                                    댓글 단 글
                                </div>
                            </div>

                            {/* 기타 섹션 */}
                            <div className="menu-section">
                                <span className="menu-title">기타</span>
                                <div className="menu-item" onClick={() => console.log("니코틴 의존도 진단")}>
                                    니코틴 의존도 진단
                                </div>
                                <div className="menu-item" onClick={() => console.log("회원탈퇴")}>
                                    회원탈퇴
                                </div>
                                <div className="menu-item" onClick={() => console.log("로그아웃")}>
                                    로그아웃
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <div className="Home-Container">
                <div className="Home-Header">
                    <img src={logo} alt="숨쉴래 로고" className="Header-logo" />
                    <img
                        src={menuIcon}
                        alt="메뉴 아이콘"
                        className="menu-icon"
                        onClick={toggleMenu}
                    />
                </div>
                <div className="Start-Main">
                    <div className="Start-MainMotive">
                        <div>{data.motive || "건강한 나의 삶을 위해!"}</div>
                    </div>
                    <div className="Home-Mainlogo">
                        <div className="homecloud">
                            <img src={homecloud} alt="홈 클라우드" />
                        </div>
                        <div>
                            <img src={shadow} className="shadow" alt="그림자" />
                        </div>
                    </div>
                    <div className="Home-MainTime">
                        <div>{data.startDate ? `D+${differenceInDays}` : "날짜를 불러오는 중..."}</div>
                        <div>금연 중</div>
                    </div>
                    <div className="Home-MainReport">
                        <div className="ReportContainer">
                            <div className="ReportBlackBg">
                                <div className="ReportWhitebg">
                                    <div className="ReportText">
                                        <div>금연 리포트</div>
                                    </div>
                                    <div className="Report">
                                        <div className="Reportbox">
                                            <div>연장한 수명</div>
                                            <div className="extendtimeimg"></div>
                                            <div>{differenceInDays + 1 || 0}일</div>
                                        </div>
                                        <div className="Reportbox">
                                            <div>아낀 돈</div>
                                            <div className="savedmoneyimg"></div>
                                            <div>{savedMoneyExact.toFixed(0) || 0}원</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Home-Footer">
                    <div className="Nav">
                        <Nav />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
