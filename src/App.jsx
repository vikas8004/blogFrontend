import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";

import { LandingPage } from "./components/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Home = lazy(() => import("./components/pages/Home"));
const NewStory = lazy(() => import("./components/pages/NewStory"));
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./features/authFeature";
axios.defaults.withCredentials = true;

import { useSelector } from "react-redux";
import { baseUrl } from "./utils/constants";
const SingleBlog = lazy(() => import("./components/pages/SingleBlog"));
import { singleBlogLoader } from "./utils/singleBlogLoader.js";
import Layout from "./components/LayOut.jsx";
import Loader from "./components/Loader.jsx";
const Profile = lazy(() => import("./components/pages/Profile.jsx"));

const authRouters = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/new-story", element: <NewStory /> },
      { path: "/blog/:id", element: <SingleBlog />, loader: singleBlogLoader },
      { path: "/:name", element: <Profile /> },
    ],
  },
]);
const unAuthRouters = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
]);

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log(auth);
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/islogin`)
      .then((res) => {
        // console.log(res.data);
        dispatch(login({ user: res.data.user, token: res.data.accessToken }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {auth.isLoggedIn ? (
        <>
          {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-story" element={<NewStory />} />
            <Route
              path={`/blog/:id`}
              element={<SingleBlog />}
              loader={singleBlogLoader}
            />
          </Routes> */}
          <Suspense fallback={<Loader />}>
            <RouterProvider router={authRouters}></RouterProvider>
          </Suspense>
        </>
      ) : (
        // <Routes>
        //   <Route path="/" element={<LandingPage />} />
        // </Routes>
        <RouterProvider router={unAuthRouters} />
      )}
    </>
  );
}

export default App;
