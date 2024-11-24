import { useNavigate } from "react-router-dom";
import './Css/survey.css'
import arrow from '../../assets/Arrow.png'
import { useState, useRef, useEffect } from "react";

function Survey() {
    const navigate = useNavigate();
    const goStartpage = () => { navigate(-1); }
    const [page, setPage] = useState(0); //0page 부터 시작
    const pagePlus = () => { setPage(page + 1); }
    const pageMinus = () => { if (page >= 1) setPage(page - 1); }

    const inputRef = useRef(null);
    const [howMany, setHowMany] = useState("");
    const [motive, setMotive] = useState("건강한 나의 삶을 위해!"); // 입력된 텍스트 상태
    const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
    const handleFocus = () => { setIsEditing(true); }; // 편집 모드 활성화
    const handleBlur = () => { setIsEditing(false); }; // 편집 모드 비활성화
    const MotiveChange = (e) => { setMotive(e.target.value); }; // 동기부여 업데이트
    const HowManyChange = (e) => { setHowMany(e.target.value); }; // 몇개비 업데이트
    //박스가 클릭 됐는지 안됐는지
    const [activeNextbtn, setactiveNextbtn] = useState(false);
    //어떤 박스를 클릭했는지
    const [selectedBox, setSelectedBox] = useState(null);
    //박스를 클릭했을때
    const boxclick = (index) => { setSelectedBox(index); setactiveNextbtn(true); }
    //box list
    const boxList = ["건강", "경제적 이유", "가족/연인", "주변의 권유", "사회적 시선", "기타"];


    function Page0() {
        return (
            <div className="Survey-HowManyContainer">
                <div className="Survey-Page">
                    <div className="Input">
                        {isEditing ?
                            (
                                // 편집 중일 때는 input으로 표시
                                <input ref={inputRef} className="editable-input" type="number" value={howMany} onChange={HowManyChange} onBlur={handleBlur}
                                    autoFocus />
                            ) :
                            (
                                // 편집 중이 아닐 때는 텍스트로 표시
                                <div className="editable-text" onClick={handleFocus}>
                                    {howMany || "몇 개비 피셨나요?"} {/* 입력값 없을 시 기본 문구 */}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        )
    }

    function Page1() {
        return (
            <div div className="Survey-GridContainer">
                <div className="Grid-box">
                    {boxList.map((text, index) => (
                        <div key={index} className={`box ${selectedBox === index ? "BoxSelected" : ""}`} onClick={() => boxclick(index)}>{text}</div>))}
                </div>
            </div>
        )
    }
    function Page2() {
        return (
            <div className="Survey-PageContainer">
                <div className="Survey-Page">
                    <div className="SelectMotive">
                        <div className="SelectMotive-box box BoxSelected">
                            {boxList[selectedBox]}
                        </div>
                    </div>
                    <div className="Input">
                        {isEditing ?
                            (
                                // 편집 중일 때는 input으로 표시
                                <input ref={inputRef} className="editable-input" type="text" value={motive} onChange={MotiveChange} onBlur={handleBlur} // 포커스를 벗어나면 편집 모드 종료 
                                    autoFocus />
                            ) :
                            (
                                // 편집 중이 아닐 때는 텍스트로 표시
                                // 클릭 시 편집 모드로 변경
                                <div className="editable-text" onClick={handleFocus} > {motive} </div>
                            )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="Survey-Container">
                <div className="Survey-Header">
                    <div>
                        <span className="arrow" onClick={goStartpage}><img src={arrow} alt="" /></span>
                        <div className="Headertext">금연 시작하기</div>
                    </div>
                </div>
                <div className="Survey-Main">
                    <div className="Survey-Maintext">
                        <div>
                            {
                                {
                                    0:
                                        <>
                                            <div>하루에 담배를</div>
                                            <div>몇 개비 피우셨나요?</div>
                                        </>,
                                    1:
                                        <>
                                            <div>금연 동기가</div>
                                            <div>무엇인가요?</div>
                                        </>,
                                    2:
                                        <>
                                            <div>금연 다짐을</div>
                                            <div>해볼까요?</div>
                                        </>
                                }[page]
                            }
                        </div>
                    </div>

                    {
                        {
                            //몇 개비 폈는지
                            0: <Page0 />,
                            //금연 동기 선택
                            1: <Page1 />,
                            //금연 동기 선택 이후
                            2: <Page2 />
                        }[page]
                    }

                </div>
                <div className="Survey-Footer">
                    <div className={`Footer-Grid-box ${page === 0 ? "firstNextbtn" : ""}`}>
                        {
                            page != 0 ? <div className="box previous" onClick={() => pageMinus()}>이전</div> : null
                        }
                        {
                            {
                                0:
                                    (<div className={`box  deactiveNextbtn ${howMany ? "activeNextbtn" : ""}`} onClick={() => pagePlus()}>다음</div>),
                                1:
                                    (<div className={`box deactiveNextbtn ${activeNextbtn ? "activeNextbtn" : ""}`} onClick={() => pagePlus()}>다음</div>),
                                2:
                                    (
                                        <div className="box activeNextbtn">완료</div>
                                    )
                            }[page]
                        }
                    </div>
                </div>
            </div >

        </>
    )
}


export default Survey;