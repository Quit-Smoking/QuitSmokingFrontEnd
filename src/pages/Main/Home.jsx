
import React, { useState } from 'react';
import logo from '../../assets/logo_letters.svg';
import cloudimg from "../../assets/캐릭터.png"
import circleimg from "../../assets/circleImg.png"
import sun from "../../assets/Sun.png"
import Modal from 'react-modal';
import "./Css/Home.css";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const closeModal = () => {setIsModalOpen(false);};
    Modal.setAppElement('#root');

    return (
        <>
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal"
                        onClick={(e) => e.stopPropagation()} // 이벤트 전파 차단
                    >
                        <img
                            src={sun} // 스타 이미지 URL 변경 가능
                            className="modal-image"
                        />
                        <h2>시작이 반이다!</h2>
                        <p>금연 시작하기</p>
                    </div>
                </div>
            )}

            <div className="Home-Container">
                <div className="Home-Header">
                    <img
                        src={logo} //logo import 해야됨
                        alt="숨쉴래 로고"
                        className="Header-logo"
                    />
                </div>
                <div className="Start-Main">
                    <div className="Start-MainMotive">
                        <div>건강한 나의 삶을 위해!</div>
                    </div>
                    <div className="Home-Mainlogo">
                        <img src={circleimg} alt="circleimg" className='circleimg' />
                        <img src={cloudimg} alt="cloudimg" className='cloudimg' />
                    </div>
                    <div className="Home-MainTime">
                        <div>0D 00:00:00</div>
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
                                            <div>연장한 시간</div>
                                            <div className="extendtimeimg"></div>
                                            <div>0일</div>
                                        </div>
                                        <div className="Reportbox">
                                            <div>아낀돈</div>
                                            <div className="savedmoneyimg"></div>
                                            <div>4500원</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Home-Footer">
                    <div className="Nav">

                    </div>
                </div>

            </div>

        </>
    );
};

export default Home;
