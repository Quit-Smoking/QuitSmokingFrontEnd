import './Css/startpage.css'
import logo from '../../assets/logo_letters.svg';
import cloudimg from "../../assets/캐릭터.png"
import circleimg from "../../assets/circleImg.png"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
    const navigate = useNavigate();
    const goSurvey = () => {
        navigate('/startpage/survey');
    }

    return (
        <>
            <div className="Start-Container">
                <div className="Start-Header">
                    <img
                        src={logo} //logo import 해야됨
                        alt="숨쉴래 로고"
                        className="Header-logo"
                    />
                </div>

                <div className="Start-Main">
                    <div className="MainTime">
                        <div></div>
                    </div>
                    <div className="Start-Mainlogo">

                            <img src={circleimg} alt="circleimg" className='circleimg' />
                            <img src={cloudimg} alt="cloudimg" className='cloudimg' />
                    </div>
                    <div className="Mainbutton">
                        <button className='Btn1' onClick={goSurvey}>금연 시작하기</button>
                        <button className='Btn2'>니코틴 의존도 진단하기</button>
                    </div>
                </div>

                <div className="Start-Footer">
                    <div className="Nav">

                    </div>
                </div>

            </div>
        </>
    )
}

export default StartPage;