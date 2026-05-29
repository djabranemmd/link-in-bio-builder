import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Builder from "./pages/Builder";
import PublicPage from "./pages/PublicPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<Builder />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/:username"
            element={
              <PublicPage />
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;