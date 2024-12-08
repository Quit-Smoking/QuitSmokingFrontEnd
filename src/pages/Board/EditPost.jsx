import "./newpost.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams(); //! 게시글 아이디 params로 가져오기
  const userToken = localStorage.getItem('userToken'); //! 유저토큰 가져오기
  const [post, setPost] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const handleCancel = () => {
    if (window.confirm('수정한 내용이 모두 없어집니다. 계속하시겠습니까?')) {
      navigate(-1); // 이전 페이지로 이동
    }
  }

  // 게시글 내용 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get("https://quitsmoking.co.kr/post/findByPostId", {
          params: {
            id: id,
          }
        });

        if (response !== 200) {
          throw new Error(`post ${id} fetch 중 서버 200 아님`);
        };

        const postData = response.data;
        setPost(postData); // 전체 데이터를 저장
        setPostTitle(postData.title); // 제목 설정
        setPostContent(postData.content); // 내용 설정
      } catch (error) {
        console.error(`post ${id} fetch 중 에러: ${error}`);
      }
    }

    fetchPost();
  }, [id])

  // 수정한 게시글 서버에 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userToken) {
      console.log('토큰이 없음');
      return;
    }

    try {
      const response = await axios.post('https://quitsmoking.co.kr/post/update', {
        params: {
          "token": {userToken},
        },
        body: {
          "id": id,
          "title": postTitle,
          "content": postContent,
        }
      })
      console.log('게시글 성공적으로 수정:', response.data);
      console.log('게시판 페이지로 이동')
      alert("게시글이 성공적으로 수정되었습니다!");
      navigate(`/post/${id}`); //! 그 게시글로 이동
    } catch (error) {
      console.error('수정한 게시글 서버로 보내는 중 에러 발생', error);
      alert("게시글 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form className="new-post-container" onSubmit={handleSubmit}>
      <div className="new-post-banner">
        <button type="button" className="new-post-cancel-button" onClick={handleCancel}>취소</button>
        <p className="new-post-title">글 수정하기</p>
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

export default EditPost;
