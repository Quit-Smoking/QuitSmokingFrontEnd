import { useNavigate } from "react-router-dom";
import './Css/survey.css';
import arrow from '../../assets/Arrow.png';
import { useState, useRef } from "react";

function Survey() {
    const navigate = useNavigate();

    const goHome = () => navigate('/Home');
    const goStartpage = () => navigate(-1);
    const [page, setPage] = useState(0); // 현재 페이지 상태
    const pagePlus = () => setPage((prev) => Math.min(prev + 1, pages.length - 1));
    const pageMinus = () => setPage((prev) => Math.max(prev - 1, 0));


    const howManyref = useRef(null);
    const motiveref = useRef(null);
    const [howMany, setHowMany] = useState("");
    const [motive, setMotive] = useState("건강한 나의 삶을 위해!");
    const [isEditing, setIsEditing] = useState(false);
    const [activeNextbtn, setActiveNextbtn] = useState(false);
    const [selectedBox, setSelectedBox] = useState(null);

    const boxList = ["건강", "경제적 이유", "가족/연인", "주변의 권유", "사회적 시선", "기타"];

    // Handlers
    const handleFocus = () => setIsEditing(true);
    const handleBlur = () => setIsEditing(false);
    const handleHowManyChange = (e) => setHowMany(e.target.value);
    const handleMotiveChange = (e) => setMotive(e.target.value);
    const handleBoxClick = (index) => {
        setSelectedBox(index);
        setActiveNextbtn(true);
    };

    // Pages List
    const pages = [
        // Page0
        <div className="Survey-HowManyContainer" key="page0">
            <div className="Survey-Page Page0InputCenter">
                <div className="Input">
                    {isEditing ? (
                        <input
                            ref={howManyref}
                            className="editable-input"
                            type="number"
                            value={howMany}
                            onChange={handleHowManyChange}
                            onBlur={handleBlur}
                            autoFocus
                        />
                    ) : (
                        <div className="editable-text" onClick={handleFocus}>
                            {howMany || "몇 개비 피우셨나요?"}
                        </div>
                    )}
                </div>
            </div>
        </div>,

        // Page1
        <div className="Survey-GridContainer" key="page1">
            <div className="Grid-box">
                {boxList.map((text, index) => (
                    <div
                        key={index}
                        className={`box ${selectedBox === index ? "BoxSelected" : ""}`}
                        onClick={() => handleBoxClick(index)}
                    >
                        {text}
                    </div>
                ))}
            </div>
        </div>,

        // Page2
        <div className="Survey-PageContainer" key="page2">
            <div className="Survey-Page">
                <div className="SelectMotive">
                    <div className="SelectMotive-box box BoxSelected">
                        {boxList[selectedBox]}
                    </div>
                </div>
                <div className="Input">
                    {isEditing ? (
                        <input
                            ref={motiveref}
                            className="editable-input"
                            type="text"
                            value={motive}
                            onChange={handleMotiveChange}
                            onBlur={handleBlur}
                            autoFocus
                        />
                    ) : (
                        <div className="editable-text" onClick={handleFocus}>
                            {motive || "금연 다짐을 입력해주세요"}
                        </div>
                    )}
                </div>
            </div>
        </div>,
    ];

    return (
        <div className="Survey-Container">
            {/* Header */}
            <div className="Survey-Header">
                <div>
                    <span className="arrow" onClick={goStartpage}>
                        <img src={arrow} alt="" />
                    </span>
                    <div className="Headertext">금연 시작하기</div>
                </div>
            </div>

            {/* Main Content */}
            <div className="Survey-Main">
                <div className="Survey-Maintext">
                    {page === 0 && (
                        <>
                            <div>하루에 담배를</div>
                            <div>몇 개비 피우셨나요?</div>
                        </>
                    )}
                    {page === 1 && (
                        <>
                            <div>금연 동기가</div>
                            <div>무엇인가요?</div>
                        </>
                    )}
                    {page === 2 && (
                        <>
                            <div>금연 다짐을</div>
                            <div>해볼까요?</div>
                        </>
                    )}
                </div>

                {/* Render Current Page */}
                {pages[page]}
            </div>

            {/* Footer */}
            <div className="Survey-Footer">
                <div className={`Footer-Grid-box ${page === 0 ? "firstNextbtn" : ""}`}>
                    {page > 0 && (
                        <div className="box previousbtn" onClick={pageMinus}>
                            이전
                        </div>
                    )}
                    {page === 0 && (
                        <div
                            className={`box deactiveNextbtn ${
                                howMany ? "activeNextbtn" : ""
                            }`}
                            onClick={() => howMany && pagePlus()}
                        >
                            다음
                        </div>
                    )}
                    {page === 1 && (
                        <div
                            className={`box deactiveNextbtn ${
                                activeNextbtn ? "activeNextbtn" : ""
                            }`}
                            onClick={() => activeNextbtn && pagePlus()}
                        >
                            다음
                        </div>
                    )}
                    {page === 2 && (
                        <div className="box activeNextbtn" onClick={goHome}>
                            완료
                        </div>
                    )}
                </div>

            </div>
        </div>
    );

}

export default Survey;
