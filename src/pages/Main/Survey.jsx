import { useNavigate } from "react-router-dom";
import './survey.css';
import { useState } from "react";
import axios from 'axios';
import TopBar from '../../components/TopBar';

function Survey() {
    const navigate = useNavigate();

    const [page, setPage] = useState(0); // 현재 페이지 상태
    const pagePlus = () => setPage((prev) => Math.min(prev + 1, pages.length - 1));
    const pageMinus = () => setPage((prev) => Math.max(prev - 1, 0));

    const [howMany, setHowMany] = useState("");
    const [motive, setMotive] = useState("건강한 나의 삶을 위해!");
    const [activeNextbtn, setActiveNextbtn] = useState(false);
    const [selectedBox, setSelectedBox] = useState(null);

    const boxList = ["건강", "경제적 이유", "가족/연인", "주변의 권유", "사회적 시선", "기타"];

    const handleHowManyChange = (e) => setHowMany(e.target.value);
    const handleBoxClick = (index) => {
        setSelectedBox(index);
        setActiveNextbtn(true);
    };

    const sendData = async () => {
        const requestData = {
            token: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxd2VyMTIzNEBuYXZlci5jb20iLCJpYXQiOjE3MzMzNzQwNDAsImV4cCI6MTczMzQxMDA0MH0.u_Q-tJu4kzZztYjK-Y3fNk3Xt2Kez3EM-Ge2l-k9UHY
`,
            resolution: motive,
            motive: boxList[selectedBox],
            startDate: new Date().toISOString().split('T')[0],
            numbersSmoked: parseInt(howMany, 10) || 0,
        };

        console.log(requestData);
        try {
            await axios.post('http://15.164.231.201:8080/UserStartRecord/add', requestData, {
                headers: { 'Content-Type': 'application/json' },
            });

            localStorage.removeItem("isModalShown"); // 모달 재설정을 위해 로컬스토리지 초기화
            navigate('/Home');
        } catch (error) {
            console.error('Error sending data:', error);
            alert('데이터 전송에 실패했습니다.');
        }
    };

    const pages = [
        <div className="Survey-Container" key="page0">
            <header>
                <TopBar title="금연 시작하기" onBack={() => navigate(-1)} />
            </header>
            <main className="Survey-Main">
                <div className="Survey-TextContainer">
                    <h1 className="Survey-Title"><div>하루에 담배를</div> <div>몇 개비 피우셨나요?</div></h1>
                    <p className="Survey-Subtitle">흡연 개수를 입력해주세요</p>
                </div>
                <div className="Survey-InputContainer">
                    <input
                        className="Survey-Input"
                        type="number"
                        placeholder="숫자를 입력하세요"
                        value={howMany}
                        onChange={handleHowManyChange}
                    />
                </div>
            </main>
            <footer className="Survey-Footer">
                <button
                    className={`Survey-NextBtnSingle ${howMany ? "active" : ""}`}
                    onClick={() => howMany && pagePlus()}
                    disabled={!howMany}
                >
                    다음
                </button>
            </footer>
        </div>,

        // Page1
        <div className="Survey-Container" key="page1">
            <header>
                <TopBar title="금연 동기 설정" onBack={pageMinus} />
            </header>
            <main className="Survey-Main">
                <div className="Survey-TextContainer">
                    <h1 className="Survey-Title">금연 동기 설정</h1>
                    <p className="Survey-Subtitle">원하는 항목을 선택해주세요</p>
                </div>
                <div className="Survey-GridContainer">
                    {boxList.map((text, index) => (
                        <div
                            key={index}
                            className={`Survey-GridBox ${selectedBox === index ? "selected" : ""}`}
                            onClick={() => handleBoxClick(index)}
                        >
                            {text}
                        </div>
                    ))}
                </div>
            </main>
            <footer className="Survey-Footer">
                <div className="Survey-BtnPair">
                    <button
                        className="Survey-PrevBtn active"
                        onClick={pageMinus}
                    >
                        이전
                    </button>
                    <button
                        className={`Survey-NextBtn ${selectedBox !== null ? "active" : ""}`}
                        onClick={() => selectedBox !== null && pagePlus()}
                        disabled={selectedBox === null}
                    >
                        다음
                    </button>
                </div>
            </footer>
        </div>,


        // Page2 수정
        <div className="Survey-Container" key="page2">
            <header>
                <TopBar title="금연 시작하기" onBack={pageMinus} />
            </header>
            <main className="Survey-Main">
                <div className="Survey-TextContainer">
                    <h1 className="Survey-Title">금연 다짐을 해볼까요?</h1>
                    <p className="Survey-Subtitle">자신만의 금연 다짐을 입력하세요</p>
                </div>
                <div className="Survey-InputContainer">
                    <input
                        className="Survey-Input"
                        type="text"
                        placeholder="금연 다짐을 입력해주세요"
                        value={motive}
                        onChange={(e) => setMotive(e.target.value)}
                    />
                </div>
            </main>
            <footer className="Survey-Footer">
                <div className="Survey-BtnPair">
                    <button
                        className="Survey-PrevBtn active"
                        onClick={pageMinus}
                    >
                        이전
                    </button>
                    <button
                        className={`Survey-NextBtn ${motive.trim() ? "active" : ""}`}
                        onClick={sendData}
                        disabled={!motive.trim()}
                    >
                        완료
                    </button>
                </div>
            </footer>
        </div>,
    ];

    return <>{pages[page]}</>;
}

export default Survey;
