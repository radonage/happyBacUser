import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import DashboardHome from "./features/dashboard/pages/DashboardHome";

import SuccessPage from "./pages/Success";
import CancelPage from "./pages/Cancel";

import CourseList from "./features/course/pages/CourseList";
import CourseDetails from "./features/course/pages/CourseDetails";

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
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">

      {/* ================= TOAST ================= */}
      <ToastContainer position="bottom-right" autoClose={3000} />

      {/* ================= NAVBAR (RESERVED SPACE) ================= */}
      {!hideNavbar && (
        <div className="h-[8vh] shrink-0">
          <Navbar />
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 overflow-hidden">

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