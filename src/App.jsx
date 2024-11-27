import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Result from "./pages/Result/Result";
import Shop from "./pages/Shop/Shop";
import NewMission from "./pages/Mission/NewMission";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/Result" element={<Result />} />
    //     <Route path="/shop" element={<Shop />} />
    //   </Routes>
    // </Router>
    <NewMission />
  );
}

export default App;
