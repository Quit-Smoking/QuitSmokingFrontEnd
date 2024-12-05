import "./post.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import profile from "../../assets/post/profile.svg";
import comment from "../../assets/post/comment.svg";
import heart from "../../assets/post/heart.svg";
// import color_heart from "../../assets/post/color_heart.svg";
// import cursor from "../../assets/post/cursor.svg";

function Post() {
  const navigate = useNavigate();
  const { id } = useParams(); //! 게시글 아이디 params로 가져오기
  console.log("useParams:", useParams());
  const postId = parseInt(id, 10); // id를 정수로 변환
  console.log("게시글 id:", postId, typeof postId);
  const userToken = localStorage.getItem('userToken'); //! 유저토큰 가져오기

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCommentMenuId, setOpenCommentMenuId] = useState(null); // 열려 있는 댓글 메뉴 ID
  const [comments, setComments] = useState(null);
  const [nickname, setNickname] = useState("");
  const [post, setPost] = useState(null);
  const [commentContent, setCommentContent] = useState(""); // 입력 중인 댓글 내용

  // 게시글 메뉴 토글
  const toggleMenu = (e) => {
    console.log("메뉴 버튼 클릭");
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
    console.log("메뉴 상태 변경:", !isMenuOpen);
  };

  // 댓글 메뉴 토글
  const toggleCommentMenu = (e, commentId) => {
    console.log("댓글 메뉴 버튼 클릭");
    e.stopPropagation();
    setOpenCommentMenuId((prevId) => (prevId === commentId ? null : commentId));
    console.log("댓글 메뉴 상태 변경:", !openCommentMenuId);
  }

  // 게시글 수정
  const handleEdit = () => {
    console.log('글 수정 페이지로 이동');
    navigate(`/editPost/${postId}`); //! id 사용해서 이동하기
    setIsMenuOpen(false);
  };
  // 댓글 삭제
  const handleCommentEdit = () => {
    console.log('댓글 수정 페이지로 이동');
    navigate(`/home`); //! id 사용해서 댓글 수정 페이지이동하기
    setOpenCommentMenuId(false);
  };

  // 게시글 삭제
  const handleDelete = async () => {
    if (window.confirm('해당 글을 삭제하시겠습니까?')) {
      if (!userToken) {
        console.log('토큰이 없음');
        alert('유저를 찾을 수 없습니다.')
        return;
      }

      try {
        const response = await axios.delete('http://15.164.231.201:8080/post/delete', {
          params: {
            "token": userToken,
            "id": postId,
          }
        })

        if (response.status !== 200) {
          throw new Error('게시글 삭제 중 서버 200 아님', response.status);
        }

        if (response.status === 200) {
          console.log('게시글 성공적 삭제:', response.data);
          console.log('게시판 페이지로 이동');
          navigate('/missionMain'); //! 게시판페이지로 이동
        }
      } catch (error) {
        console.error('게시글 삭제 중 에러 발생', error);
      }
    }
  };
  // 댓글 삭제
  const handleCommentDelete = async (commentId) => {
    const commentIdInt = parseInt(commentId, 10);
    if (window.confirm("해당 댓글을 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(
          "http://15.164.231.201:8080/comment/delete",
          {
            params: { 
              token: userToken,
              id: commentIdInt
            },
          }
        );
        if (response.status === 200) {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentIdInt)
          );
          alert("댓글이 삭제되었습니다.");
          console.log('댓글 삭제 response', response.data);
        } else {
          alert("댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.")
        }
      } catch (error) {
        console.error("댓글 삭제 중 에러 발생:", error);
      }
    }
    setOpenCommentMenuId(null);
  };
  const handleAddComment = async () => {
    if (!commentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://15.164.231.201:8080/comment/add",
        {
          token: userToken,
          postId: postId,
          parentCommentId: null, // 대댓글이 아니라면 null
          content: commentContent,
        }
      );

      if (response.status === 200) {
        alert("댓글이 성공적으로 추가되었습니다.");
        setComments((prevComments) => [...prevComments, response.data]); // 새 댓글 추가
        setCommentContent(""); // 입력 필드 초기화
      } else {
        throw new Error("댓글 추가 중 오류 발생");
      }
    } catch (error) {
      console.error("댓글 추가 중 에러 발생:", error);
      alert("댓글 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // const closeMenu = (e) => {
  //   if (!e.target.closest(".post-menu")) {
  //     setIsMenuOpen(false); // 메뉴 외부 클릭 시 닫기
  //   }
  // };
  // const closeCommentMenu = (e) => {
  //   if (!e.target.closest(".post-comment-menu")) {
  //     setIsMenuOpen(false); // 댓글 메뉴 외부 클릭 시 닫기
  //   }
  // };

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".post-menu")) {
        setIsMenuOpen(false);
      }
      if (!e.target.closest(".post-comment-menu")) {
        setOpenCommentMenuId(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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

  // 게시글 내용, 댓글 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get("http://15.164.231.201:8080/post/findByPostId", {
          params: {
            id: postId,
          }
        });

        if (response.status !== 200) {
          throw new Error(`Error fetching post: ${response.status}, ${postId}`);
        };
        if (!response.data) {
          throw new Error("Post data is 비어있거나 null");
        }

        setPost(response.data);
      } catch (error) {
        console.error(`post ${postId} fetch 중 에러: ${error}`);
      }
    }
    const fetchNickname = async () => {
      try {
        const response = await axios.get("http://15.164.231.201:8080/user/getNickname", {
          params: {
            token: userToken,
          }
        });

        if (response.status !== 200) {
          throw new Error(`닉네임 fetch 중 200아님: ${response.status}, ${postId}`);
        };
        if (!response.data) {
          throw new Error("닉네임 없거나 null");
        }

        setNickname(response.data);
      } catch (error) {
        console.error(`닉네임 fetch 중 에러: ${error}`);
      }
    }
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://15.164.231.201:8080/comment/findByPostId", {
          params: {
            postId: postId,
          }
        });

        if (response.status !== 200) {
          throw new Error(`댓글 가져오다가 오류: ${response.status}, ${postId}`);
        };
        if (!response.data) {
          throw new Error("댓글 없거나 null");
        }

        console.log("Fetched comments:", response.data);
        setComments(response.data);
      } catch (error) {
        console.error(`post ${postId}에 대한 댓글fetch 중 에러: ${error}`);
      }
    }

    fetchPost();
    fetchNickname();
    fetchComments();
  }, [postId, userToken])

  //? 간략화버전
  // useEffect(() => {
  //   const fetchPostData = async () => {
  //     try {
  //       const postResponse = await axios.get(
  //         "http://15.164.231.201:8080/post/findByPostId",
  //         { params: { id } }
  //       );
  //       const nicknameResponse = await axios.get(
  //         "http://15.164.231.201:8080/user/getNickname",
  //         { params: { token: userToken } }
  //       );
  //       const commentsResponse = await axios.get(
  //         "http://15.164.231.201:8080/comment/findByPostId",
  //         { params: { postId: id } }
  //       );

  //       if (
  //         postResponse.status === 200 &&
  //         nicknameResponse.status === 200 &&
  //         commentsResponse.status === 200
  //       ) {
  //         setPost(postResponse.data);
  //         setNickname(nicknameResponse.data);
  //         setComments(commentsResponse.data);
  //       }
  //     } catch (error) {
  //       console.error("데이터 가져오는 중 에러 발생:", error);
  //     }
  //   };

  //   fetchPostData();
  // }, [id, userToken]);

  return (
    <div className="post-container">
      {!post ? (
        <p style={{ margin: 0, textAlign: "center" }}>새 글을 작성해보세요!</p>
      ) : ( 
        <>
          <div className="post-top-bar">
            <button className="post-back-button" onClick={() => navigate(-1)}>
              ←
            </button>
            <p className="post-top-bar-title">금연게시판</p>
          </div>
          <div className="post-banner">
            <div className="post-banner-top">
              <p className="post-title">{post.title}</p>
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
                <p className="post-profile-name">{nickname}</p>
              </div>
              <p className="post-profile-time">{post.createdAt}</p>
            </div>
          </div>
          <div className="post-content">
            <p className="post-text">{post.content}</p>
            <div className="post-reaction">
              <div className="post-comment-box">
                <img
                  src={comment}
                  alt="comment icon"
                  className="comment-icon"
                />
                <p className="post-comment-num">{post.numberOfComments}</p>
              </div>
              <div className="post-heart-box">
                <img
                  src={heart}
                  alt="heart icon"
                  className="heart-icon"
                />
                <p className="post-heart-num">{post.numberOfLikes}</p>
              </div>
            </div>
            <div className="post-comment-container">
              {comments.length === 0 ? (
                <p>첫 댓글을 달아주세요!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="post-comment">
                    <div className="post-comment-banner">
                      <p>{comment.nickname}</p>
                      <button onClick={(e) => toggleCommentMenu(e, comment.id)}>
                        ⋮
                      </button>
                    </div>
                      {openCommentMenuId === comment.id && (
                        <div className="post-comment-menu">
                          <button onClick={handleCommentEdit}>수정</button>
                          <button onClick={() => handleCommentDelete(comment.id)}>
                            삭제
                          </button>
                        </div>
                      )}
                    <p className="post-comment-content">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>)}
      {/* 댓글 입력창 */}
      <div className={`comment-input-container ${isKeyboardOpen ? "keyboard-open" : ""}`}>
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          className="comment-input"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <button className="comment-submit" onClick={handleAddComment}>➤</button>
      </div>
    </div>
  );
}

export default Post;
