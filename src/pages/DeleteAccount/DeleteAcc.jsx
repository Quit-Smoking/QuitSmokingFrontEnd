import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./DeleteAcc.css";
import CancelIcon from "../../assets/cancel.svg";

function DeleteAcc() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const password = location.state?.password || ""; // 전달된 비밀번호

  const handleCheckboxChange = () => {
    setIsChecked((prevState) => !prevState);
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.delete(
        "http://15.164.231.201:8080/user/delete",
        {
          params: {
            token: token,
            rawPassword: password,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("계정이 삭제되었습니다.");
        navigate("/Login"); // 로그인 페이지로 이동
      }
    } catch (error) {
      console.error("계정 삭제 중 오류가 발생했습니다:", error);
      alert("계정 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleCancelClick = () => {
    navigate("/home");
  };

  return (
    <div className="delete-container">
      <div className="delete-header">
        <h1>회원탈퇴</h1>
        <img
          className="cancel-icon"
          src={CancelIcon}
          alt="cancel"
          onClick={handleCancelClick}
        />
      </div>
      <div className="warning-text">
        <p>
          <p className="warning-icon">⚠️</p> 계정을 삭제하면 금연 기록이 모두
          사라지며, 복구가 불가능합니다.
        </p>
        <div className="confirmation-box">
          <div className="box_text">계정을 삭제하시겠습니까?</div>
          <div className="checkbox-container">
            <input
              type="radio"
              id="delete-checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label className="checkbox_text" htmlFor="delete-checkbox">
              계정을 삭제하겠습니다.
            </label>
          </div>
        </div>
      </div>

      <button
        className={`delete-button ${isChecked ? "enabled" : "disabled"}`}
        disabled={!isChecked}
        onClick={handleDeleteAccount}
      >
        계정 삭제하기
      </button>
    </div>
  );
}

export default DeleteAcc;
