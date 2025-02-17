import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailConfirmation from "./pages/EmailConfirmation";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Logout from "./pages/Logout";
import AddItem from "./pages/AddItem";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/emailconfirmation" element={<EmailConfirmation />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/additem" element={<AddItem/>}/>
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
