import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home.page";
import Login from "./Pages/Login.page";
import Information from "./Pages/Information.page";
import Register from "./Pages/Register.page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Information" element={<Information />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
