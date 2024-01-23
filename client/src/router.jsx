import {
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/home";
import Host from "./pages/host";
import Join from "./pages/join";

const router = createBrowserRouter([
  {
  element: <Layout />,
  children:[
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/join",
      element: <Join />,
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