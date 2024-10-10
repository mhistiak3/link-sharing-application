import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import EditProfile from "./pages/EditProfile";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import authService from "./appwrite/auth.service";
import { Loader } from "./components/Loader";
import { login, logout } from "./store/auth.slice";
import { ProtectedLayout, RedirectLayout } from "./components/AuthLayout";
import profileService from "./appwrite/profile.service";
import { getProfile } from "./store/profile.slice";
import Links from "./pages/Links";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Check if user is logged in
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        user ? dispatch(login({ user })) : dispatch(logout());
        console.log(user.$id);
        console.log(user);
        
         if (user) {
           profileService
             .getProfile(user?.$id)
             .then((profile) => {
          
               dispatch(getProfile({ profile }));
             })
             .catch((err) => {
               dispatch(getProfile({ profile: null }));
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
      </Routes>
      <Toaster />
    </>
  );
};
export default App;
