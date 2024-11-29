import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './MissionDetail.css';

function MissionDetail() {
    
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // 드롭다운 토글 함수
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    // 모달 열기
    const openModal = () => {
        setModalVisible(true);
        setDropdownVisible(false); // 드롭다운 닫기
    };

    // 모달 닫기
    const closeModal = () => {
        setModalVisible(false);
    };

    // 모달 확인 버튼 클릭
    const handleConfirm = () => {
        console.log("미션 중단하기 버튼 클릭!");
        setModalVisible(false);
    };

    return (
        <>
            {/* Modal */}
            {modalVisible && (
                <div className="Detail-modal-overlay" onClick={closeModal}>
                    <div
                        className="Detail-modal"
                        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 차단
                    >
                        <div className="Detail-modal-header">
                            <p className="Detail-modal-title">미션을 중단하시겠습니까?</p>
                            <p className="Detail-modal-description">
                                이 작업은 돌이킬 수 없습니다
                            </p>
                        </div>
                        <div className="Detail-modal-footer">
                            <button
                                className="Detail-modal-button cancel"
                                onClick={closeModal}
                            >
                                취소
                            </button>
                            <button
                                className="Detail-modal-button confirm"
                                onClick={handleConfirm}
                            > 중단하기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="Detail-container">
                {/* Header */}
                <header className="Detail-header">
                    <div className="Detail-header-top">
                        <button className="Detail-arrow-button">←</button>
                        <div className="Detail-menu-container">
                            <button className="Detail-menu-button" onClick={toggleDropdown}>
                                ⋮
                            </button>
                            {dropdownVisible && (
                                <div className="Detail-menu-dropdown">
                                    <button className="Detail-mission-cancel" onClick={openModal}>
                                        미션 중단
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="header-title">하루에 물 2L 마시기</div>
                    <div className="header-subtitle">월, 수, 금 / 4주 도전</div>
                </header>

                {/* Main */}
                <main className="Detail-main">
                    <div className="Detail-record-title">나의 기록</div>
                    <div className="Detail-empty-message">미션을 인증해주세요!</div>
                </main>

                {/* Footer */}
                <footer className="Detail-footer">
                    {/* NavBar 추가 */}
                    <div className="navbar"></div>
                </footer>
            </div>
        </>
    );
}

export default MissionDetail;
