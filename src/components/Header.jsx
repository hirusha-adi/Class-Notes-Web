import { List, Book, LightningCharge } from "react-bootstrap-icons";
import { isTeacher, isUserLoggedIn, logout } from "../lib/backend";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <List className="text-xl font-semibold" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/theory"}>Theory Notes</NavLink>
              </li>
              <li>
                <NavLink to={"/revision"}>Reivision Notes</NavLink>
              </li>
              <li>
                {isUserLoggedIn ? (
                  <div onClick={logout} className="font-bold italic">
                    Logout
                  </div>
                ) : (
                  <NavLink to={"/login"} className="font-bold italic">
                    Login
                  </NavLink>
                )}
              </li>
              {isUserLoggedIn && isTeacher && (
                <>
                  <li className="menu-title">
                    <span className="divider m-0 my-0 pointer-events-none"></span>
                  </li>
                  <li>
                    <NavLink to={"/admin"}>Admin Panel</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link to={"/"} className="btn btn-ghost text-xl">
            Class Notes
          </Link>
        </div>
        <div className="navbar-end">
          <NavLink to={"/theory"} className="btn btn-ghost btn-circle">
            <Book className="text-xl font-semibold" />
          </NavLink>
          <NavLink to={"/revision"} className="btn btn-ghost btn-circle">
            <LightningCharge className="text-xl font-semibold" />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export { Header };
