import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailConfirmation from "./pages/EmailConfirmation";
import Dashboard from "./pages/Dashboard";
function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/emailconfirmation" element={<EmailConfirmation/>}/>
        <Route path="/" element={<Dashboard/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
