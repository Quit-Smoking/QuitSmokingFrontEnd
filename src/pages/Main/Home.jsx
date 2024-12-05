import React, { useState, useEffect } from "react";
import logo from "../../assets/logo_letters.svg";
import homecloud from "../../assets/HomeChar.png";
import shadow from "../../assets/shadowblue.png";
import sun from "../../assets/Sun.png";
import menuIcon from "../../assets/Menu.png";
import axios from "axios";
import Nav from "../../components/nav";
import InfoModal from "./HomeModal/InfoModal";
import MenuModal from "./HomeModal/MenuModal";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 모달 상태

  const closeModal = () => {
    setIsModalOpen(false);
    localStorage.setItem("isModalShown", "true");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // 메뉴 모달 토글
  const closeMenuModal = () => setIsMenuOpen(false); // 메뉴 모달 닫기

  const fetchData = async () => {
    const token = localStorage.getItem("userToken");

    try {
      const [recordResponse, nicknameResponse, emailResponse] =
        await Promise.all([
          axios.get(
            "http://15.164.231.201:8080/UserStartRecord/findUserStartRecord",
            { params: { token } }
          ),
          axios.get("http://15.164.231.201:8080/user/getNickname", {
            params: { token },
          }),
          axios.get("http://15.164.231.201:8080/user/getEmail", {
            params: { token },
          }),
        ]);
      setData({
        ...recordResponse.data,
        nickname: nicknameResponse.data,
        email: emailResponse.data,
      });
    } catch (err) {
      setError("API 요청에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const modalShown = localStorage.getItem("isModalShown");
    if (!modalShown) setIsModalOpen(true);
  }, []);

  if (isLoading) return <div></div>;
  if (error) return <div>{error}</div>;

  const nowDate = new Date();
  const startDate = new Date(data.startDate);
  const differenceInDays = Math.floor(
    (nowDate - startDate) / (1000 * 60 * 60 * 24)
  );
  const savedMoneyExact = data.numbersSmoked * differenceInDays * (4500 / 20);

  return (
    <>
      {isModalOpen && (
        <InfoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="시작이 반이다!"
          description="금연 시작하기"
          image={sun}
        />
      )}
      {isMenuOpen && (
        <MenuModal
          nickname={data.nickname}
          email={data.email}
          determine={data.resolution} // 금연 각오 전달
          onClose={closeMenuModal}
          navigate={navigate}
          resolution={data.resolution}
          differenceInDays={differenceInDays}
        />
      )}
      <div className="Home-Container">
        <div className="Home-Header">
          <img src={logo} alt="숨쉴래 로고" className="Header-logo" />
          <img
            src={menuIcon}
            alt="메뉴 아이콘"
            className="menu-icon"
            onClick={toggleMenu} // 메뉴 버튼 클릭 시 모달 열기
          />
        </div>
        <div className="Start-Main">
          <div className="Start-MainMotive">
            <div>{data.resolution || "건강한 나의 삶을 위해!"}</div>
          </div>

          <div className="Home-Mainlogo">
            <div className="homecloud">
              <img src={homecloud} alt="홈 클라우드" />
            </div>
            <div>
              <img src={shadow} className="shadow" alt="그림자" />
            </div>
          </div>

          <div className="Home-MainTime">
            <div>
              {data.startDate
                ? `D+${differenceInDays}`
                : "날짜를 불러오는 중..."}
            </div>
            <div>금연 중</div>
          </div>
          <div className="Home-MainReport">
            <div className="ReportContainer">
              <div className="ReportBlackBg">
                <div className="ReportWhitebg">
                  <div className="ReportText">
                    <div>금연 리포트</div>
                  </div>
                  <div className="Report">
                    <div className="Reportbox">
                      <div>연장한 수명</div>
                      <div className="extendtimeimg"></div>
                      <div>{differenceInDays + 1 || 0}일</div>
                    </div>
                    <div className="Reportbox">
                      <div>아낀 돈</div>
                      <div className="savedmoneyimg"></div>
                      <div>{savedMoneyExact || 0}원</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Home-Footer">
          <Nav />
        </div>
      </div>
    </>
  );
};

export default Home;
