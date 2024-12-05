import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MainBoard.css";
import Nav from "../../components/nav";
import comment from "../../assets/post/comment.svg";
import heart from "../../assets/post/heart.svg";
import write from "../../assets/write.svg";
import bell from "../../assets/bell.svg";

function MainBoard() {
  const [posts, setPosts] = useState([]); // 게시글 데이터를 저장할 상태
  const navigate = useNavigate();

  // API로 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://15.164.231.201:8080/post/bringAllPosts"
        );
        setPosts(response.data); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleEditClick = () => {
    navigate("/newPost");
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const truncateText = (text, limit) => {
    if (!text || typeof text !== "string") {
      return ""; // text가 null, undefined, 또는 문자열이 아니면 빈 문자열 반환
    }
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div className="full_container">
      <div className="main-board-container">
        {/* Header */}
        <header className="main-board-header">
          <h1>금연게시판</h1>
          <img src={bell} alt="bell" />
        </header>

        {/* 게시글 목록 */}
        <div className="board-list">
          {posts.map((post) => (
            <div
              key={post.id}
              className="board-item"
              onClick={() => handlePostClick(post.id)}
            >
              <h3 className="board-title">{truncateText(post.title, 24)}</h3>
              <p className="board-content">{truncateText(post.content, 21)}</p>
              <div className="board-footer">
                <span className="board-nickname">{`작성자: ${post.userId}`}</span>
                <div className="board-icons">
                  <span>
                    <img src={comment} alt="comment" /> {post.numberOfComments}
                  </span>
                  <span>
                    <img src={heart} alt="heart" /> {post.numberOfLikes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 연필 아이콘 */}
        <div className="edit-icon" onClick={handleEditClick}>
          <img src={write} alt="write" />
        </div>

        {/* Navigation Bar */}
      </div>
      <div className="nav">
        <Nav />
      </div>
    </div>
  );
}

export default MainBoard;
