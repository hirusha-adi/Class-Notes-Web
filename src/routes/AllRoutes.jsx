import { Route, Routes, Navigate } from "react-router-dom";

import { isUserLoggedIn, isTeacher } from "../lib/backend";
import {
  // Main
  Home,
  Notes,

  // Auth
  Login,

  // Admin
  AdminStatistics,
  AdminUsersStudentsAll,
  AdminUsersStudentsNew,
  AdminUsersTeachers,
  AdminNotesAll,
  AdminNotesNew,
  AdminNotesAccess,

  // Others
  PageNotFound,
} from "../pages";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        {/* Main (for General Public) */}
        <Route path="/" element={<Home />} />
        <Route
          path="/theory"
          element={
            isUserLoggedIn ? (
              <Notes noteType="theory" />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/revision"
          element={
            isUserLoggedIn ? (
              <Notes noteType="revision" />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
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
          path="/admin/users/students/all"
          element={
            isUserLoggedIn && isTeacher ? (
              <AdminUsersStudentsAll />
            ) : (
              <Navigate to="/404" />
            )
          }
        />
        <Route
          path="/admin/users/students/new"
          element={
            isUserLoggedIn && isTeacher ? (
              <AdminUsersStudentsNew />
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
        {/* Notes */}
        <Route
          path="/admin/notes/all"
          element={
            isUserLoggedIn && isTeacher ? (
              <AdminNotesAll />
            ) : (
              <Navigate to="/404" />
            )
          }
        />
        <Route
          path="/admin/notes/new"
          element={
            isUserLoggedIn && isTeacher ? (
              <AdminNotesNew />
            ) : (
              <Navigate to="/404" />
            )
          }
        />
        <Route
          path="/admin/notes/access"
          element={
            isUserLoggedIn && isTeacher ? (
              <AdminNotesAccess />
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
