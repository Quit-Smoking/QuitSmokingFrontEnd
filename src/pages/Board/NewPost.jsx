import "./newpost.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewPost() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken'); //! 유저토큰 가져오기

  // 제목과 내용 상태 관리
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const handleCancel = () => {
    if (window.confirm('작성된 내용이 모두 없어집니다. 계속하시겠습니까?')) {
      navigate(-1); // 이전 페이지로 이동
    }
  }

  // YYYY-MM-DD 형식의 날짜 불러오기
  function getFormattedDate() {
    const today = new Date();
  
    // 날짜 정보 가져오기
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const date = today.getDate().toString().padStart(2, "0");
  
    // yyyy-mm-dd 형식으로 반환
    return `${year}-${month}-${date}`;
  }
  
  // 테스트
  console.log(getFormattedDate()); // 예: 2024-12-05
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userToken) {
      console.log('토큰이 없음');
      return;
    }

    try {
      const response = await axios.post('http://15.164.231.201:8080/post/add', {
        body: {
          "token": {userToken},
          "title": postTitle,
          "content": postContent,
          "createdAt": getFormattedDate(),
        }
      })
      console.log('게시글 성공적으로 전송:', response.data);
      console.log('게시판 페이지로 이동')
      navigate('/missionMain'); //! 게시판 페이지로 이동
    } catch (error) {
      console.error('게시글 서버로 보내는 중 에러 발생', error);
    }
  };

  return (
    <form className="new-post-container" onSubmit={handleSubmit}>
      <div className="new-post-banner">
        <button type="button" className="new-post-cancel-button" onClick={handleCancel}>취소</button>
        <p className="new-post-title">글쓰기</p>
        <button type="submit" className="new-post-submit-button">완료</button>
      </div>
      <div className="new-post-content">
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          placeholder="제목"
          className="new-post-title"
          value={postTitle} // 상태와 연결
          onChange={(e) => setPostTitle(e.target.value)} // 상태 업데이트
        />
        <textarea
          id="postContent"
          name="content"
          rows="30"
          placeholder="내용을 입력하세요"
          className="new-post-text"
          value={postContent} // 상태와 연결
          onChange={(e) => setPostContent(e.target.value)} // 상태 업데이트
        />
      </div>
    </form>
  );
}

export default NewPost;
