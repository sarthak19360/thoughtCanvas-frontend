import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import BlogContainer from "./components/BlogContainer";
import BlogPost from "./components/BlogPost";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Header />
        <Body />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <BlogContainer />,
      },
      {
        path: "/following",
        element: <BlogContainer />,
      },
      {
        path: "/post",
        element: <BlogPost />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="mx-auto">
      <RouterProvider router={AppRouter}>
        <Header />
        <Body />
      </RouterProvider>
    </div>
  );
};

export default App;
