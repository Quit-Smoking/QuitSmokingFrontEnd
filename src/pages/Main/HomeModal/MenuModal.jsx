import React from "react";
import "./MenuModal.css";

const MenuModal = ({ nickname, email, determine, navigate, onClose, resolution, differenceInDays }) => {
    const handleModifyDetermine = () => {
        navigate("/modifydetermine", { state: { determine } }); // 금연 각오 데이터를 state로 전달

    };
    const handleStopSmoking = () => {
        navigate("/stopsmoking", { state: { resolution, differenceInDays } });
    };
    const handleChangePassword = () => {
        navigate("/changepassword");
    };
    const handleChangeNickname = () => {
        navigate("/changenickname");
    }
    const handleDeleteAccount = () => {
        navigate("/DeleteAccCheck");
    }

    return (
        <div className="menu-modal-overlay" onClick={onClose}>
            <div className="menu-modal" onClick={(e) => e.stopPropagation()}>
                <div className="menu-header">{nickname} 님</div>
                <div className="menu-body">
                    <div className="menu-section">
                        <span className="menu-title">계정</span>
                        <div className="menu-item">아이디 : {email}</div>
                        <div className="menu-item" onClick={handleChangePassword}>비밀번호 변경</div>
                        <div className="menu-item" onClick={handleChangeNickname}>닉네임 변경</div>
                    </div>
                    <div className="menu-section">
                        <span className="menu-title">금연 시계</span>
                        <div className="menu-item" onClick={handleModifyDetermine}>
                            금연 각오 수정
                        </div>
                        <div className="menu-item" onClick={handleStopSmoking}>금연 중단</div>
                    </div>
                    <div className="menu-section">
                        <span className="menu-title">금연 게시판</span>
                        <div className="menu-item">작성한 글</div>
                        <div className="menu-item">댓글 단 글</div>
                    </div>
                    <div className="menu-section">
                        <span className="menu-title">기타</span>
                        <div className="menu-item" onClick={() => navigate('/home/diagnosisstart')}>
                            니코틴 의존도 진단
                        </div>
                        <div className="menu-item" onClick={handleDeleteAccount}>회원탈퇴</div>
                        <div className="menu-item">로그아웃</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuModal;