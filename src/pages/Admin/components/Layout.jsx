import PropTypes from "prop-types";
import {
  LayoutSidebar,
  PieChart,
  People,
  Person,
  PersonAdd,
  PersonCircle,
  Stickies,
  Book,
} from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

const Layout = ({ locationBreadcrumbs, pageTitle, children }) => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* start: page content */}
        <div className="drawer-content">
          {/* start: top bar */}
          <div className="flex flex-row justify-between items-center flex-nowrap gap-4 bg-white px-4 md:px-6 py-2">
            {/* left side */}
            <div className="md:hidden">
              <label
                className="text-gray-800 btn rounded-xl btn-ghost"
                htmlFor="my-drawer-2"
              >
                <LayoutSidebar className="text-xl" /> Show Sidebar
              </label>
            </div>
            {/* right side */}
            <div className="flex items-center">
              <div className="breadcrumbs text-sm">
                <ul>
                  {locationBreadcrumbs.map((breadcrumb, index) => (
                    <li key={index}>{breadcrumb}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* end: top bar */}
          <div className="px-2 md:px-5">
            <div className="mt-6 font-bold text-3xl text-center md:text-left">
              {pageTitle}
            </div>
            <div className="pt-8">{children}</div>
          </div>
        </div>
        {/* end: page content */}

        {/* start: side drawer */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu menu-sm bg-base-200 rounded-box min-h-full w-80 p-4">
            <h2 className="menu-title text-lg text-gray-600">
              Admin Dashboard
            </h2>
            <li>
              <NavLink to={"/admin/statistics"}>
                <PieChart className="text-md" />
                Statistics
              </NavLink>
            </li>
            <li>
              <details open>
                <summary>
                  <People className="text-md" /> Users
                </summary>
                <ul>
                  <li>
                    <details open>
                      <summary>
                        <PersonCircle className="text-md" /> Students
                      </summary>
                      <ul>
                        <li>
                          <NavLink to={"/admin/users/students/all"}>
                            <Person className="text-md" />
                            All
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={"/admin/users/students/new"}>
                            <PersonAdd className="text-md" />
                            New
                          </NavLink>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <NavLink to={"/admin/users/teachers"}>
                      <PieChart className="text-md" />
                      Teachers
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary>
                  <Book className="text-md" /> Notes
                </summary>
                <ul>
                  <li>
                    <NavLink to={"/admin/notes/all"}>
                      <Stickies className="text-md" />
                      All
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink to={"/admin/users/students/new"}>
                      <PersonAdd className="text-md" />
                      Edit
                    </NavLink>
                  </li> */}
                </ul>
              </details>
            </li>
          </ul>
        </div>
        {/* end: side drawer */}
      </div>
    </>
  );
};

Layout.propTypes = {
  locationBreadcrumbs: PropTypes.arrayOf(PropTypes.string).isRequired,
  pageTitle: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { Layout };
