import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TeachersPage from "./pages/TeachersPage";
import StudentsPage from "./pages/StudentsPage";
import Dashbort from "./pages/Dashbort";
import AdminLayout from "./components/layout/AdminLayout";
import TeacherStudents from "./pages/TeacherStudents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashbort />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="techers" element={<TeachersPage />} />
          <Route path="categories/:id" element={<TeacherStudents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
