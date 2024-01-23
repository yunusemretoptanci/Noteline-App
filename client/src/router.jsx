import {
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/about",
      element: <div>About</div>,
    }
  ]);

export default router;