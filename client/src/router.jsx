import {
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/home";

const router = createBrowserRouter([
  {
  element: <Layout />,
  children:[
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <div>About</div>,
    }
  ],
  }
  ]);

export default router;