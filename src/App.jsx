import { Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

import DashboardHome from "./features/dashboard/pages/DashboardHome";

import SuccessPage from "./pages/Success";
import CancelPage from "./pages/Cancel";

import CourseList from "./features/course/pages/CourseList";
import CourseDetails from "./features/course/pages/CourseDetails";

import ExamList from "./features/exam/pages/ExamList";
import ExerciseList from "./features/exercise/pages/ExerciseList";
import Matiere from "./pages/Matiere";
import ExamPage from "./pages/ExamPage";
import OrientationPage from "./pages/OrientationPage";
import EtudesPage from "./pages/EtudesPage";
import Contact from "./pages/Contact";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Explorer from "./pages/Explorer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  const location = useLocation();

  const hideNavbarRoutes = ["/success", "/cancel"];

  const hideNavbar = hideNavbarRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex min-h-screen bg-black text-white">
      <ToastContainer position="bottom-right"
        autoClose={3000} />
      <div className="flex-1 flex flex-col">
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/exercises" element={<ExerciseList />} />
          <Route path="/matiere" element={<Matiere />} />
          <Route path="/exams" element={<ExamPage />} />
          <Route path="/orientation" element={<OrientationPage />} />
          <Route path="/etudes" element={<EtudesPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Routes>
      </div>
    </div>
  );
}