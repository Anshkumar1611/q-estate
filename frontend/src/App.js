import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LandingPage, Explore } from "./components";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/listings" element={<Explore />} />
      </Routes>
    </div>
  );
}

export default App;
