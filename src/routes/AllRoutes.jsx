import { Route, Routes, Navigate } from "react-router-dom";

import { isUserLoggedIn, isTeacher } from "../lib/backend";
import {
  // Main
  Home,

  // Auth
  Login,

  // Admin
  AdminStatistics,
  AdminUsersStudents,
  AdminUsersTeachers,

  // Others
  PageNotFound,
} from "../pages";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        {/* Main (for General Public) */}
        <Route path="/" element={<Home />} />
        <Route path="/theory" element={<Home />} />
        <Route path="/revision" element={<Home />} />

        {/* Auth */}
        {/* ------------------------- */}
        <Route
          path="/login"
          element={
            isUserLoggedIn ? <Navigate to={"/admin/statistics"} /> : <Login />
          }
        />
        {/* ------------------------- */}

        {/* Admin Pages */}
        {/* ------------------------- */}
        {/* Statistics (default page after login) */}
        <Route
          path="/admin"
          element={
            isUserLoggedIn && isTeacher ? (
              <Navigate to={"/admin/statistics"} />
            ) : (
              <Navigate to="/404" />
            )
          }
        />
        <Route
          path="/admin/statistics"
          element={
            isUserLoggedIn && isTeacher ? (
              <AdminStatistics />
            ) : (
              <Navigate to="/404" />
            )
          }
        />
        {/* Users */}
        <Route
          path="/admin/users/students"
          element={
            isUserLoggedIn && isTeacher ? (
              <AdminUsersStudents />
            ) : (
              <Navigate to="/404" />
            )
          }
        />
        <Route
          path="/admin/users/teachers"
          element={
            isUserLoggedIn && isTeacher ? (
              <AdminUsersTeachers />
            ) : (
              <Navigate to="/404" />
            )
          }
        />

        {/* ------------------------- */}

        {/* Errors */}
        {/* ------------------------- */}
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<PageNotFound />} />
        {/* ------------------------- */}
      </Routes>
    </>
  );
};

export { AllRoutes };
