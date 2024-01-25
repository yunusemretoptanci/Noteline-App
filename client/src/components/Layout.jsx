import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <header className="flex w-full fixed items-center justify-center py-3 mb-4 z-50 bg-white">
        <h1 className="text-dark text-decoration-none text-3xl font-medium text-stone-700 ">
          <Link to="/">NOTELINE</Link>
        </h1>
      </header>
      <Outlet />
    </>
  );
}
