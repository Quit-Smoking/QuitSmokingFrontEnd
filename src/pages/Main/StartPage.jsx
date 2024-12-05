import './startpage.css';
import logo from '../../assets/logo_letters.svg';
import cloudimg from "../../assets/캐릭터.png";
import circleimg from "../../assets/circleImg.png";
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/nav';

function StartPage() {
    const navigate = useNavigate();

    const goSurvey = () => {
        navigate('/startpage/survey');
    };

    return (
        <div className="Start-Container">
            <header className="Start-Header">
                <img
                    src={logo}
                    alt="숨쉴래 로고"
                    className="Header-logo"
                />
            </header>

            <main className="Start-Main">
                <div className="MainTime">
                    <div></div>
                </div>
                <div className="Start-Mainlogo">
                    <img src={circleimg} alt="circleimg" className='start-circleimg' />
                    <img src={cloudimg} alt="cloudimg" className='start-cloudimg' />
                </div>
                <div className="Mainbutton">
                    <button className='Btn1' onClick={goSurvey}>금연 시작하기</button>
                </div>
            </main>

            <footer className="Start-Footer">
                <Nav />
            </footer>
        </div>
    );
}

export default StartPage;
