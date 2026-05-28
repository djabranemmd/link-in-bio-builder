import { Routes, Route } from "react-router-dom";
import Builder from "./pages/Builder";
import PublicProfile from "./pages/PublicPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Builder />} />
      <Route path="/:username" element={<PublicProfile />} />
    </Routes>
  );
}

export default App;