import "./newpost.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewPost() {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (window.confirm('작성된 내용이 모두 없어집니다. 계속하시겠습니까?')) {
      navigate(-1); // 이전 페이지로 이동
    }
  }

  return (
    <form className="new-post-container">
      <div className="new-post-banner">
        <button type="button" className="new-post-cancel-button" onClick={handleCancel}>취소</button>
        <p className="new-post-title">글쓰기</p>
        <button type="submit" className="new-post-submit-button">완료</button>
      </div>
      <div className="new-post-content">
        <input type="text" name="postTitle" id="postTitle" placeholder="제목" className="new-post-title" />
        <textarea id="postContent" name="content" rows="30" placeholder="내용을 입력하세요"  className="new-post-text" />
      </div>
    </form>
  );
}

export default NewPost;
