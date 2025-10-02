import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

// ✅ Helper layout component
function Layout({ children }) {
  const location = useLocation();


function AppRouter() {
  return (
    <Router>
      <Layout>
        <Routes>
          
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default AppRouter;