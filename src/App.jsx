import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { useEffect, useState } from "react";
import authService from "./appwrite/auth.service";
import linksService from "./appwrite/links.service";
import profileService from "./appwrite/profile.service";
import { ProtectedLayout, RedirectLayout } from "./components/AuthLayout";
import { Loader } from "./components/Loader";
import Links from "./pages/Links";
import Preview from "./pages/Preview";
import { login, logout } from "./store/auth.slice";
import { getLinks } from "./store/links.slice";
import { getProfile } from "./store/profile.slice";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Check if user is logged in
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        user ? dispatch(login({ user })) : dispatch(logout());

        if (user) {
          // get Profile
          profileService
            .getProfile(user?.$id)
            .then((profile) => {
              dispatch(getProfile({ profile }));
            })
            .catch((err) => {
              dispatch(getProfile({ profile: null }));
            });
          // get links
          linksService
            .getLinks(user?.$id)
            .then(({ links }) => {
              dispatch(getLinks({ links: JSON.parse(links) }));
            })
            .catch((error) => {
              dispatch(getLinks({ links: [] }));
            });
        }
      })
      .catch(() => dispatch(logout()))
      .finally(() => setLoading(false));
  }, []);

  // Render loading page
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectLayout>
              <Login />
            </RedirectLayout>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectLayout>
              <Register />
            </RedirectLayout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/profile-details"
          element={
            <ProtectedLayout>
              <EditProfile />
            </ProtectedLayout>
          }
        />
        <Route
          path="/create-link"
          element={
            <ProtectedLayout>
              <Links />
            </ProtectedLayout>
          }
        />
        <Route path="/preview/:userId" element={<Preview />} />
      </Routes>
      <Toaster />
    </>
  );
};
export default App;
