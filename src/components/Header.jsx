import { BoxArrowRight, Book, Gear } from "react-bootstrap-icons";
import { isUserLoggedIn, logout } from "../lib/backend";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link
            to={"/login"}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <Gear className="text-xl font-semibold" />
          </Link>
        </div>
        <div className="navbar-center">
          <Link to={"/"} className="btn btn-ghost text-xl">
            Class Notes
          </Link>
        </div>
        <div className="navbar-end">
          <Link to={"/"} className="btn btn-ghost btn-circle">
            <Book className="text-xl font-semibold" />
          </Link>
          {isUserLoggedIn && (
            <div className="btn btn-ghost btn-circle" onClick={logout}>
              <BoxArrowRight className="text-xl font-semibold" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { Header };
