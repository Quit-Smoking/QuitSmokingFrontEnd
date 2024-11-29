import "./App.css";
import { Routes, Route } from "react-router-dom";
import Result from "./pages/Result/Result";
import Shop from "./pages/Shop/Shop";
import Diary from "./pages/Diary/Diary";
// import Login from "./pages/LogIn/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/Result" element={<Result />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/Diary" element={<Diary />} />
    </Routes>
    // <Login />
  );
}

export default App;
