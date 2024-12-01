import React, { Suspense, useState } from 'react';
import logo from '../../assets/logo_letters.svg';
import homecloud from "../../assets/home캐릭터.png";
import shadow from "../../assets/그림자.png";
import axios from 'axios';
import sun from "../../assets/Sun.png";
import Modal from 'react-modal';
import Nav from "../../components/nav";
import "./Css/Home.css";

// Data fetching logic
const fetchData = async () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqa2cwNjkxQG5hdmVyLmNvbSIsImlhdCI6MTczMzAzMjA5NSwiZXhwIjoxNzMzMDY4MDk1fQ.vlHXvA09n-DwqUIyo7V4r3g6nLnUQ5n6KM4A83xwGyY';
    const response = await axios.get('/UserStartRecord/findUserRecord', {
        params: { token }, // Pass token as query parameter
    });
    return response.data;
};

let dataCache = null;

// Data fetcher function for Suspense
const dataFetcher = () => {
    if (!dataCache) {
        const promise = fetchData().then((data) => {
            dataCache = data;
        });
        throw promise;
    }

    console.log(dataCache);
    return dataCache;
};

// Data Display Component
const DataDisplay = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const closeModal = () => setIsModalOpen(false);
    Modal.setAppElement('#root'); // Accessibility requirement for Modal

    const data = dataFetcher();

    // 현재 날짜
    const nowDate = new Date();
    // 시작 날짜를 Date 객체로 변환
    const startDate = new Date(data.startDate);
    // 날짜 차이를 일 단위로 변환
    const differenceInDays = Math.floor((nowDate - startDate) / (1000 * 60 * 60 * 24));

    // 하루 흡연량
    const dailyCigarettes = data.numbersSmoked;
    // 절약 비용 계산 (소수점 포함)
    const savedMoneyExact = dailyCigarettes * differenceInDays * (4500 / 20); // 20개비 = 한 갑



    return (
        <>

                {/* 해당 모달은 완료를 눌렀을때만 실행*/}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <img src={sun} className="modal-image" alt="Sun" />
                        <h2>시작이 반이다!</h2>
                        <p>금연 시작하기</p>
                    </div>
                </div>
            )}
            <div className="Home-Container">
                <div className="Home-Header">
                    <img src={logo} alt="숨쉴래 로고" className="Header-logo" />
                </div>
                <div className="Start-Main">
                    <div className="Start-MainMotive">
                        <div>{data.motive || "건강한 나의 삶을 위해!"}</div>
                    </div>
                    <div className="Home-Mainlogo">
                        <div className="homecloud">
                            <img src={homecloud}></img>
                        </div>
                        <div>
                            <img src={shadow}className="shadow" />
                        </div>
                    </div>
                    <div className="Home-MainTime">
                        <div>
                            {data.startDate ? `D+${differenceInDays}` : "날짜를 불러오는 중..."}
                        </div>
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
                                            <div>{data.date || 0}일</div>
                                        </div>
                                        <div className="Reportbox">
                                            <div>아낀 돈</div>
                                            <div className="savedmoneyimg"></div>
                                            <div>{savedMoneyExact || 0}원</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Home-Footer">
                    <div className="Nav">
                        <Nav></Nav>

                    </div>
                </div>
            </div>
        </>
    );
};

// Main Home Component
const Home = () => {
    return (
        <>
            <Suspense fallback={<div></div>}>
                <DataDisplay />
            </Suspense>
        </>
    );
};

export default Home;
