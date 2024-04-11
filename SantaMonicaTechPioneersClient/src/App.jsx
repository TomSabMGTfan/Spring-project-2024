import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import PrivateRoute from "./routes/privateRoutes";
import { AuthContext } from "./utils/AuthContext";

import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";

function App() {
  const { user: authUser, logoutUser } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Router>
        <nav>
          <ul>
            {!authUser ? (
              <>
                
              </>
            ) : (
              <li>
                <button onClick={logoutUser}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={["user"]}>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
