import React, { useState, useEffect, lazy, Suspense } from "react";
import { Navbar } from "./components/Navbar";
import AuthContext from "./authContext";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import "./App.css";
const DashboardLayout = lazy(() =>
  import("./components/dashboard/DashboardLayout")
);
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
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
    // element: <Profile />,
    element: <div>Profile</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/dashboard/blogs",
        element: (
          <Suspense fallback={<div>Lodding...</div>}>
            <div>/dashboard/blogs</div>
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
    ],
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
