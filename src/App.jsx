
import Login from "./pages/LogIn/Login";
import StartPage from "./pages/Main/StartPage";
import Survey from "./pages/Main/Survey";

import Home from "./pages/Main/Home";
import Result from "./pages/Result/Result";
import Shop from "./pages/Shop/Shop";
import MissionDetail from "./pages/MissionDetail/MissionDetail";

import StartMission from "./pages/Mission/StartMission";
// import Diary from "./pages/Diary/Diary";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateMission from "./pages/Mission/createMission/CreateMission";

import Signup from "./pages/Singup/Signup";

import MissionMain from "./pages/Mission/MissionMain";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Result" element={<Result />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/startpage" element={<StartPage />} />
        <Route path="/startpage/survey" element={<Survey />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/missionDetail" element={<MissionDetail />} />
          
        <Route path="/createmission" element={<CreateMission />} />
        <Route path="/createMission/startmission" element={<StartMission />} />

        <Route path="/Singup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />

      </Routes>
    </>
  );
}

export default App;