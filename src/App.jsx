import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Result from "./pages/Result/Result";
import Shop from "./pages/Shop/Shop";
import Diary from "./pages/Diary/Diary";
import Login from "./pages/LogIn/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Result" element={<Result />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/Diary" element={<Diary />}></Route>
      </Routes>
    </Router>
    <Login />
  );
}

export default App;
