import { List, Book, Bell } from "react-bootstrap-icons";

const Header = () => {

	return (
		<>
			<div className="navbar bg-base-100">
				<div className="navbar-start">
					<div className="dropdown">
						<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
							<List className="text-xl font-semibold" />
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
							<li><a>Homepage</a></li>
							<li><a>Portfolio</a></li>
							<li><a>About</a></li>
						</ul>
					</div>
				</div>
				<div className="navbar-center">
					<a className="btn btn-ghost text-xl">SLOS</a>
				</div>
				<div className="navbar-end">
					<button className="btn btn-ghost btn-circle">
						<Book className="text-xl font-semibold" />
					</button>
					<button className="btn btn-ghost btn-circle">
						<div className="indicator">
							<Bell className="text-xl font-semibold" />
							<span className="badge badge-xs badge-primary indicator-item"></span>
						</div>
					</button>
				</div>
			</div>
		</>
	);
};

export { Header }