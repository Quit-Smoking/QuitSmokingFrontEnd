import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Result from "./pages/Result/Result";
import Shop from "./pages/Shop/Shop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Result" element={<Result />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;
