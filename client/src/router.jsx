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
import LessonSummary from "./pages/lesson-summary";
import OnlineSummary from "./pages/online-summary";
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
      path: "/lesson/:lessonCode",
      element: <Lesson />,
    },{
      path: "/lesson-summary/:lessonCode",
      element: <LessonSummary />,
    },
    {
      path: "/sessions/:lessonCode/summary",
      element: <OnlineSummary />,
    },
    {
      path: "*",
      element: <div>Not Found</div>,
    },

  ],
  }
  ]);

export default router;