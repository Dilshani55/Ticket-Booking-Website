import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";  
import Admin from "../pages/Admin";
import PaymentSuccess from "../pages/PaymentSuccess";
import MovieDetail from "../pages/MovieDetail";
import SeatSelection from "../pages/SeatSelection";
import Checkout from "../pages/Checkout";
import Theatres from "../pages/Theatres";
import AdminTheatres from "../pages/AdminTheatres";

// ✅ Helper layout component
function Layout({ children }) {
  const location = useLocation();

  // Hide Nav/Footer on auth pages
  const hideLayout = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

function AppRouter() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Movies */}
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />  
          <Route path="/seat-selection/:id" element={<SeatSelection />} /> 
          <Route path="/checkout/:id" element={<Checkout />} />    

          {/* Theatres */}
          <Route path="/theatres" element={<Theatres />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Admin */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/theatres" element={<AdminTheatres />} />

          {/* Payments */}
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default AppRouter;