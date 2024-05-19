import { useContext, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import './css/Header.css'
import { AuthContext } from "../utils/AuthContext"
import { Link } from "react-router-dom";

function Navbar() {

	const { user: authUser, logoutUser } = useContext(AuthContext);

	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<>
			<header>
				<h5 className=""> {authUser ? `Logged in as ${authUser.username}` : ''}</h5>
				<nav ref={navRef}>
					{!authUser ? (
						<>
							<div className="logo"><Link to="/"><p className="logo-collor">Santa Monica Tech Pioneers</p></Link></div>
							<div>
							</div>
							<ul>
								<li><Link to="/"><i className="fas fa-home"></i>Home</Link></li>
								<li><Link to="/about"><i className="fas fa-info-circle"></i>About</Link></li>
								<li><Link to="/login"><i className="fa fa-sign-in"></i>Login</Link></li>
								<li className="register-btn"><Link to="/signup"><i className="fa fa-pencil-square-o"></i>Register</Link></li>
							</ul>
						</>
					) : (
						<>

							<div className="logo"><Link to="/"><p className="logo-collor">Santa Monica Tech Pioneers</p></Link></div>
							<ul>
								<li><Link to="/"><i className="fas fa-home"></i>Home</Link></li>
								<li><Link to=""><i className="fas fa-info-circle"></i>About</Link></li>
								<li><Link to=""><i className="fas fa-envelope"></i>Contacts</Link></li>
								<li><Link to="/dashboard"><i className="fas fa-cogs"></i>Back to project</Link></li>
								<li><Link to="" onClick={logoutUser}><i className="fas fa-sign-out" ></i>Logout</Link></li>
							</ul>
						</>
					)}
				</nav>
			</header>





			{/* <header>
					
					<h5> {authUser ?` Logged in as ${authUser.username}` : ''}</h5>
					<h3><a href="/#">Santa Monica Tech Pioneers</a></h3>
		
					<nav ref={navRef} >
						{!authUser ? (
							<>
							<a href="/login"><i className='header_nav_buttons'></i>Log in</a>
							<a href="/signup"><i className="header_nav_buttons"style={{color:"red"}}>Get started</i></a>
							</>
						 ) : (
							<>
							<a href="#Contact"><i className="header_nav_buttons">Contact</i></a>
							<a href="dashboard"><i className="header_nav_buttons"></i>Back to Projects</a>
							<>
								<button className="header_nav_buttons"style={{background:"none"}} onClick={logoutUser}>Logout</button>
							</>
							</>
		
						)}
						<button
						className="nav-btn nav-close-btn"
						onClick={showNavbar}>
						<FaTimes />
					</button>
					</nav>
				
				</header> */}

		</>
	);
}

export default Navbar;
