import React from "react";
import { NavLink } from "react-router-dom";

const TopNav = () => {
	return (
		<div>
			<section>
				<nav className="navbar navbar-expand-md navbar-dark fixed-top site-header">
					<div className="container">
						<NavLink to="/" className="navbar-brand">
							O.K.I
						</NavLink>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarsExample07"
							aria-controls="navbarsExample07"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon" />
						</button>
						<div className="collapse navbar-collapse" id="navbarsExample07">
							<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<NavLink
										to="/landing"
										className="nav-link"
										aria-current="page"
									>
										Landing
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/*" className="nav-link">
										Link
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/*" className="nav-link disabled">
										Disabled
									</NavLink>
								</li>
								<li className="nav-item dropdown">
									<div>
										<NavLink
											to="/*"
											className="nav-link dropdown-toggle"
											data-bs-toggle="dropdown"
										>
											Dropdown
										</NavLink>
										<ul className="dropdown-menu" aria-labelledby="dropdown07">
											<li>
												<NavLink to="/*" className="dropdown-item">
													Another action
												</NavLink>
											</li>
											<li>
												<NavLink to="/*" className="dropdown-item">
													Something else here
												</NavLink>
											</li>
										</ul>
									</div>
								</li>
							</ul>
							<div>
								<div className="d-flex align-items-center">
									<div className="mx-2">
										<div className="dropdown text-end">
											<NavLink
												to="/*"
												className="d-block link-dark text-decoration-none dropdown-toggle"
												id="dropdownUser1"
												data-bs-toggle="dropdown"
												aria-expanded="false"
											>
												<img
													src="https://github.com/mdo.png"
													alt="mdo"
													width={32}
													height={32}
													className="rounded-circle"
												/>
											</NavLink>
											<ul
												className="dropdown-menu text-small"
												aria-labelledby="dropdownUser1"
											>
												<li>
													<NavLink to="/*" className="dropdown-item">
														New project...
													</NavLink>
												</li>
												<li>
													<NavLink to="/*" className="dropdown-item">
														Settings
													</NavLink>
												</li>
												<li>
													<NavLink to="/*" className="dropdown-item">
														Profile
													</NavLink>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li>
												<li>
													<div
														style={{ cursor: "pointer" }}
														className="dropdown-item"
													>
														Sign out
													</div>
												</li>
											</ul>
										</div>
									</div>
									<div>
										<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
											<li>
												<NavLink to="/signup" className="nav-link">
													SignUp
												</NavLink>
											</li>
											<li>
												<NavLink to="/signin" className="nav-link">
													Sign in
												</NavLink>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</section>
			<br />
			<br />
			<br />
		</div>
	);
};

export default TopNav;
