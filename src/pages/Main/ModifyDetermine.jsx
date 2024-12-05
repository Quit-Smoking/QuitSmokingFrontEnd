import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "../../components/TopBar";
import "./modifydetermine.css";
import axios from "axios";

function ModifyDetermine() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [determine, setDetermine] = useState(state.determine || "");

    const handleSave = async () => {
        const token = localStorage.getItem("userToken");

        try {
            // Axios 요청
            await axios.post(
                "http://15.164.231.201:8080/UserStartRecord/changeResolution",
                null, // body가 필요 없으므로 null로 설정
                {
                    params: {
                        token: token,
                        resolution: determine,
                    },
                }
            );

            // 저장 성공 시 홈으로 이동
            navigate("/home");
        } catch (error) {
            console.error("Error saving determine:", error);
            alert("금연 각오 저장에 실패했습니다.");
        }
    };

    return (
        <div className="ModifyDetermine-Container">
            <header>
                <TopBar title="금연 각오 수정" onBack={() => navigate(-1)} />
            </header>
            <main className="ModifyDetermine-Main">
                <div className="ModifyDetermine-TextContainer">
                    <h1 className="ModifyDetermine-Title">금연 다짐을 해볼까요?</h1>
                    <p className="ModifyDetermine-Subtitle">자신만의 금연 다짐을 입력하세요</p>
                </div>
                <div className="ModifyDetermine-InputContainer">
                    <input
                        className="ModifyDetermine-Input"
                        type="text"
                        placeholder="금연 다짐을 입력해주세요"
                        value={determine}
                        onChange={(e) => setDetermine(e.target.value)}
                    />
                </div>
            </main>
            <footer className="ModifyDetermine-Footer">
                <button
                    className={`ModifyDetermine-NextBtn ${determine.trim() ? "active" : ""}`}
                    onClick={handleSave}
                    disabled={!determine.trim()}
                >
                    완료
                </button>
            </footer>
        </div>
    );
}

export default ModifyDetermine;
