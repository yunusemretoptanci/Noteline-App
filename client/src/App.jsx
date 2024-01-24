import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from "./router";
import useUserId from "./hooks/useUserId";

function App() {
useUserId();
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
