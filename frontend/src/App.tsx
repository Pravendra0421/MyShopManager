import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import ProtectedRoute from "./pages/ProtectedRoute";
import Loader from "./common/Loader";
import Profile from "./pages/Profile/Profile";
import UpdateProfile from "./pages/Profile/UpdateProfile";
// Lazy Load Components
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const EmailConfirmation = lazy(() => import("./pages/EmailConfirmation"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Logout = lazy(() => import("./pages/Logout"));
const AddItem = lazy(() => import("./pages/AddItem"));
const UpdateDelete = lazy(() => import("./pages/updateDelete"));
const SellItem = lazy(() => import("./pages/SellItem"));
const ForgotPassword=lazy(()=>import("./pages/ForgotPassword"));
const ResetPassword=lazy(()=>import("./pages/ResetPassword"));

const App = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasVisited", "true"); // Save flag in sessionStorage
      }, 3000); // Reduced to 3 seconds for better UX

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <Router>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/emailconfirmation" element={<EmailConfirmation />} />
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
              <Route path="/reset-password" element={<ResetPassword/>}/>

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/additem" element={<AddItem />} />
                <Route path="/updateDelete/:id" element={<UpdateDelete />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/demo" element={<SellItem />} />
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/updateProfile" element={<UpdateProfile/>}/>
              </Route>
            </Routes>
          </Suspense>
        </Router>
      )}
    </>
  );
};

export default App;
