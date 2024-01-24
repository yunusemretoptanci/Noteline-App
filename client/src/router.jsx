import {
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/home";
import Host from "./pages/host";
import Join from "./pages/join";

import SessionCreate from "./pages/session-create";
import CreatedSessionPreview from "./pages/created-session-preview";

import Lesson from "./pages/lesson";
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
      path: "/session-create",
      element: <SessionCreate />,
    },
    {
      path: "/created-session-preview",
      element: <CreatedSessionPreview />,
    },
    {
      path: "/lesson",
      element: <Lesson />,
    },
    {
      path: "*",
      element: <div>Not Found</div>,
    },

  ],
  }
  ]);

export default router;