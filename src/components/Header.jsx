import { List, BoxArrowRight, Book, Gear, Key } from "react-bootstrap-icons";
import { isUserLoggedIn, logout } from "../lib/backend";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <NavLink
              to={"/login"}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <List className="text-xl font-semibold" />
            </NavLink>
          </div>
        </div>
        <div className="navbar-center">
          <Link to={"/"} className="btn btn-ghost text-xl">
            Class Notes
          </Link>
        </div>
        <div className="navbar-end">
          <NavLink to={"/"} className="btn btn-ghost btn-circle">
            <Book className="text-xl font-semibold" />
          </NavLink>
          {isUserLoggedIn ? (
            <div className="btn btn-ghost btn-circle" onClick={logout}>
              <BoxArrowRight className="text-xl font-semibold" />
            </div>
          ) : (
            <NavLink to={"/login"} className="btn btn-ghost btn-circle">
              <Key className="text-xl font-semibold -rotate-45" />
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export { Header };
