import React, { useState, useEffect, lazy, Suspense } from "react";
import { Navbar } from "./components/Navbar";
import AuthContext from "./authContext";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Profile from "./components/Profile";
import "./App.css";
const MyBlogs = lazy(() => import("./components/dashboard/MyBlogs"));
const AddBlogs = lazy(() => import("./components/dashboard/AddBlogs"));
// import logo from "./logo.svg";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/my-blogs",
    element: <MyBlogs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create-blogs",
    element: <AddBlogs />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const [userDetails, setUserDeatils] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user && user.username) {
      setUserDeatils(user);
      setAuthenticated(true);
    }
  }, []);

  return (
    <div id="header">
      <AuthContext.Provider
        value={{ authenticated, setAuthenticated, userDetails, setUserDeatils }}
      >
        <Navbar />
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
