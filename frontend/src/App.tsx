import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailConfirmation from "./pages/EmailConfirmation";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Logout from "./pages/Logout";
import AddItem from "./pages/AddItem";
import UpdateDelete from "./pages/updateDelete";
import SellItem from "./pages/SellItem";

const App=()=> {
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
          <Route path="/updateDelete/:id" element={<UpdateDelete />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/demo" element={<SellItem/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
