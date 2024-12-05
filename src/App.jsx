import Login from "./pages/LogIn/Login";
import StartPage from "./pages/Main/StartPage";
import Survey from "./pages/Main/Survey";
import Home from "./pages/Main/Home";
import Result from "./pages/Result/Result";
import Shop from "./pages/Shop/Shop";
import ModifyDetermine from "./pages/Main/ModifyDetermine";
import StartMission from "./pages/Mission/StartMission";
import Diary from "./pages/Diary/Diary";
import CreateMission from "./pages/Mission/createMission/CreateMission";
import Signup from "./pages/Singup/Signup";
import MissionSelect from "./pages/Mission/createMission/MissionSelect";
import NewMission from "./pages/Mission/NewMission";
import DiagnosisStart from "./pages/Diagnosis/DiagnosisStart";
import Diagnosis from "./pages/Diagnosis/Diagnosis";
import StopSmoking from "./pages/Main/StopSmoking";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ResetPassword from "./pages/ChangePassword/ResetPassword";
import ChangeNickname from "./pages/ChangeNickname/ChangeNickname";

import MissionMain from "./pages/Mission/MissionMain";
import MissionDetail from "./pages/MissionDetail/MissionDetail";

import NewPost from "./pages/Board/NewPost";
import EditPost from "./pages/Board/EditPost";
import Post from "./pages/Board/Post";
import MainBoard from "./pages/Board/MainBoard";

import DeleteAccCheck from "./pages/DeleteAccount/DeleteAccCheck";
import DeleteAcc from "./pages/DeleteAccount/DeleteAcc";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/Result" element={<Result />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/startpage" element={<StartPage />} />
        <Route path="/startpage/survey" element={<Survey />} />
        <Route path="/Home" element={<Home />} />

        <Route path="/createmission" element={<CreateMission />} />
        <Route path="/newMission" element={<NewMission />} />
        <Route path="/startmission" element={<StartMission />} />

        <Route path="/missionSelect" element={<MissionSelect />} />
        <Route path="/missionMain" element={<MissionMain />} />
        <Route path="/missionDetail" element={<MissionDetail />} />

        <Route path="/Signup" element={<Signup />} />
        <Route path="/ChangeNickname" element={<ChangeNickname />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/Login" element={<Login />} />

        <Route path="/MainBoard" element={<MainBoard />} />

        <Route path="/Home/diagnosisstart" element={<DiagnosisStart />} />
        <Route path="/Home/diagnosisstart/diagnosis" element={<Diagnosis />} />

        <Route path="/modifydetermine" element={<ModifyDetermine />} />
        <Route path="/stopsmoking" element={<StopSmoking />} />

        <Route path="/newPost" element={<NewPost />} />

        <Route path="/post" element={<Post />} />
        {/* 게시글 아이디로 이동하기 */}
        <Route path="/post/:id" element={<Post />} />

        <Route path="/editPost" element={<EditPost />} />
        {/* 게시글 수정 페이지 */}
        <Route path="/edit/:id" element={<EditPost />} />

        <Route path="/DeleteAccCheck" element={<DeleteAccCheck />} />
        <Route path="/DeleteAcc" element={<DeleteAcc />} />
      </Routes>
    </>
  );
}

export default App;
