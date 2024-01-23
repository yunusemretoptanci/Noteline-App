import {
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/home";
import Host from "./pages/host";

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
    },
    {
      path: "/host",
      element: <Host />,
    },
    {
      path: "*",
      element: <div>Not Found</div>,
    },
  ],
  }
  ]);

export default router;