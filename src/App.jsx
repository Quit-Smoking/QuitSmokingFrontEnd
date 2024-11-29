import Login from "./pages/LogIn/Login";
import StartPage from "./pages/Main/StartPage";
import Survey from "./pages/Main/Survey";
import Home from "./pages/Main/Home";
import Result from "./pages/Result/Result";
import Shop from "./pages/Shop/Shop";
import MissionDetail from "./pages/MissionDetail/MissionDetail";
import Signup from "./pages/Signup/Signup";
import Diary from "./pages/Diary/Diary";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Diary" element={<Diary />} />
      </Routes>
      {/* <Login /> */}
    </>
  );
}

export default App;
