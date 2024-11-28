
import Login from "./pages/LogIn/Login";
import StartPage from "./pages/Main/StartPage";
import Survey from "./pages/Main/Survey";
import Home from "./pages/Main/Home";
import Result from "./pages/Result/Result";
import Shop from "./pages/Shop/Shop";

// import Diary from "./pages/Diary/Diary";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Result" element={<Result />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/startpage" element={<StartPage />} />
          <Route path="/startpage/survey" element={<Survey />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
      <Login />
    </>
  );
}

export default App;
