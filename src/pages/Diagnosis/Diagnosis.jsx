import React, { useState } from 'react';
import './diagnosis.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import closeIcon from '../../assets/closeWhite.png'; // 닫기 버튼 이미지 경로

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Diagnosis() {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); // 모달 상태

    const questions = [
        { id: 1, text: '하루에 보통 몇 개비나 피십니까?', options: ['10개비 이하', '11~20개비', '21~30개비', '30개비 이상'] },
        { id: 2, text: '아침에 일어나서 얼마만에 첫 담배를 피십니까?', options: ['1시간 이상', '31~1시간', '6~30분', '5분 이내'] },
        { id: 3, text: '금연구역에서 담배를 참기가 어렵습니까?', options: ['예', '아니요'] },
        { id: 4, text: '하루 중 담배맛이 가장 좋은 때는 언제입니까?', options: ['아침 첫 담배', '그 외의 담배'] },
        { id: 5, text: '오후와 저녁시간보다 오전중에 담배를 더 자주 피우십니까?', options: ['예', '아니요'] },
        { id: 6, text: '몸이 아파 하루 종일 누워있을 때에도 담배를 피우십니까?', options: ['예', '아니요'] },
    ];

    const handleOptionChange = (questionId, answer) => {
        setAnswers((prev) => {
            const updatedAnswers = { ...prev, [questionId]: answer };
            setIsButtonEnabled(Object.keys(updatedAnswers).length === questions.length);
            return updatedAnswers;
        });
    };

    const handleModalOpen = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleModalConfirm = () => {
        navigate('/home'); // 이전 페이지로 이동
    };


    const mapAnswersToServerFormat = (answers) => {
        return {
            numberSmokedPerDayNum: answers[1] === '10개비 이하' ? 1
                : answers[1] === '11~20개비' ? 2
                    : answers[1] === '21~30개비' ? 3
                        : 4,
            firstSmokeTimeNum: answers[2] === '1시간 이상' ? 1
                : answers[2] === '31~1시간' ? 2
                    : answers[2] === '6~30분' ? 3
                        : 4,
            hardToHoldSmokeNum: answers[3] === '예' ? 1 : 2,
            greatestSmokeOnDayNum: answers[4] === '아침 첫 담배' ? 1 : 2,
            afternoonOrDinnerNum: answers[5] === '예' ? 1 : 2,
            youSickSmokeNum: answers[6] === '예' ? 1 : 2,
        };
    };

    const handleSubmit = () => {
        if (isButtonEnabled) {
            const serverPayload = mapAnswersToServerFormat(answers);
            const token = localStorage.getItem('userToken');

            console.log('진단 결과 서버로 전송:', serverPayload);

            axios.post(`${backendUrl}/nicotin_dependencies/add`, serverPayload, {
                params: { token },
            })
                .then((response) => {
                    console.log('서버 응답:', response.data);
                    // 결과 페이지로 이동 또는 추가 로직
                    navigate('/result'); // 결과 페이지로 이동
                })
                .catch((error) => {
                    console.error('진단 결과 전송 실패:', error);
                });
        }
    };




    return (
        <div className="Diagnosis-Container">
            <header className="Diagnosis-Header">
                <h1 className="Diagnosis-Title">니코틴 의존도 진단</h1>
                <img
                    src={closeIcon}
                    alt="닫기 버튼"
                    className="Diagnosis-close-button"
                    onClick={handleModalOpen}
                />
            </header>

            <main className="Diagnosis-Main">
                <p className="Diagnosis-Description">
                    <div>담배를 끊기 어려운 이유는 니코틴에 이미 중독되었기 때문입니다.</div>
                    <div>다음 항목을 니코틴 의존 정도를 점검해 보세요.</div>
                </p>

                <div className="Diagnosis-Questions">
                    {questions.map((question) => (
                        <div key={question.id} className="Diagnosis-Question">
                            <div className="Question-Text">{`Q${question.id}. ${question.text}`}</div>
                            <div className="Question-Options">
                                {question.options.map((option, index) => (
                                    <label key={index} className="Option-Label">
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={option}
                                            onChange={() => handleOptionChange(question.id, option)}
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className={`Submit-Btn ${isButtonEnabled ? 'enabled' : 'disabled'}`}
                    onClick={handleSubmit}
                    disabled={!isButtonEnabled}
                >
                    진단 결과 보기
                </button>
            </main>

            {/* 모달 */}
            {modalVisible && (
                <div className="Detail-modal-overlay" onClick={handleModalClose}>
                    <div
                        className="Detail-modal"
                        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 차단
                    >
                        <div className="Detail-modal-header">
                            <p className="Detail-modal-title">진단을 종료하시겠습니까?</p>
                            <p className="Detail-modal-description">
                                이 작업은 돌이킬 수 없습니다
                            </p>
                        </div>
                        <div className="Detail-modal-footer">
                            <button
                                className="Detail-modal-button cancel"
                                onClick={handleModalClose}
                            >
                                취소
                            </button>
                            <button
                                className="Detail-modal-button confirm"
                                onClick={handleModalConfirm}
                            >
                                종료하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Diagnosis;
