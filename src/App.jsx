import "./App.css";
import { Routes, Route } from "react-router-dom";
import Result from "./pages/Result/Result";
import Shop from "./pages/Shop/Shop";

import MissionDetail from "./pages/MissionDetail/MissionDetail";
import Diary from "./pages/Diary/Diary";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
      </Routes>
    {/* <Login /> */}
    </>

  );
}

export default App;
