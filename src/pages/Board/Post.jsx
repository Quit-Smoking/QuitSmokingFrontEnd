import "./post.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import profile from "../../assets/post/profile.svg";
import comment from "../../assets/post/comment.svg";
import heart from "../../assets/post/heart.svg";
// import color_heart from "../../assets/post/color_heart.svg";
// import cursor from "../../assets/post/cursor.svg";

function Post() {
  const navigate = useNavigate();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isComments, setComments] = useState(null);

  const toggleMenu = (e) => {
    console.log("메뉴 버튼 클릭");
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
    console.log("메뉴 상태 변경:", !isMenuOpen);
  };

  const handleEdit = () => {
    alert("글 수정 기능");
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    alert("글 삭제 기능");
    setIsMenuOpen(false);
  };

  const closeMenu = (e) => {
    // if (e.target.closest(".menu-button")) return; // 메뉴 버튼 클릭 시 무시
    // setIsMenuOpen(false); // 메뉴 외부 클릭 시 닫기
    if (!e.target.closest(".post-menu")) {
      setIsMenuOpen(false); // 메뉴 외부 클릭 시 닫기
    }
  };

  useEffect(() => {
    // 키보드 이벤트 감지
    const handleKeyboardOpen = () => setIsKeyboardOpen(true);
    const handleKeyboardClose = () => setIsKeyboardOpen(false);

    window.addEventListener("focusin", handleKeyboardOpen); // Input 클릭 시
    window.addEventListener("focusout", handleKeyboardClose); // Input 외 클릭 시

    return () => {
      window.removeEventListener("focusin", handleKeyboardOpen);
      window.removeEventListener("focusout", handleKeyboardClose);
    };
  }, []);

  return (
    <div className="post-container" onClick={closeMenu}>
      <div className="post-top-bar">
        <button className="post-back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <p className="post-top-bar-title">금연게시판</p>
      </div>
      <div className="post-banner">
        <div className="post-banner-top">
          <p className="post-title">글 제목</p>
          <button onClick={toggleMenu}>&#8942;</button>
          {isMenuOpen && (
            <div className="post-menu">
              <button className="post-edit" onClick={handleEdit}>수정</button>
              <button className="post-delete" onClick={handleDelete}>삭제</button>
            </div>
          )}
        </div>
        <div className="post-banner-bottom">
          <div className="post-profile">
            <img
              src={profile}
              alt="default profile image"
              className="post-profile-image"
            />
            <p className="post-profile-name">닉네임 불러오기!!</p>
          </div>
          <p className="post-profile-time">시간 불러오기</p>
        </div>
      </div>
      <div className="post-content">
        <p className="post-text">위 코드를 각 댓글과 게시글에서 재사용하려면 컴포넌트화하여 PostOptions를 각각의 댓글/게시글에서 렌더링할 수 있습니다. 필요에 따라 props를 전달하여 handleEdit과 handleDelete의 동작을 조정할 수 있습니다. 😊</p>
        <div className="post-reaction">
          <div className="post-comment-box">
            <img
              src={comment}
              alt="comment icon"
              className="comment-icon"
            />
            <p className="post-comment-num">숫자</p>
          </div>
          <div className="post-heart-box">
            <img
              src={heart}
              alt="heart icon"
              className="heart-icon"
            />
            <p className="post-heart-num">숫자</p>
          </div>
        </div>
        <div className="post-comment">
          {!isComments ? '첫 댓글을 달아주세요' : <>{isComments}</>}
        </div>
      </div>
      {/* 댓글 입력창 */}
      <div className={`comment-input-container ${isKeyboardOpen ? "keyboard-open" : ""}`}>
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          className="comment-input"
        />
        <button className="comment-submit">➤</button>
      </div>
    </div>
  );
}

export default Post;
