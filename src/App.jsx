import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Result from "./pages/Result/Result";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/LogIn/Login";
import StartPage from "./pages/Main/StartPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Result" element={<Result />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/startpage" element={<StartPage />} />
        </Routes>
      </Router>
      <Login />
    </>
  );
}

export default App;
