import { useContext, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import './css/Header.css'
import {AuthContext} from "../utils/AuthContext"


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
		<h5 className=""> {authUser ?`Logged in as ${authUser.username}` : ''}</h5>
			<nav ref={navRef}>
			{!authUser ? (
				<>
				<div className="logo"><a href="/"><p className="logo-collor">Santa Monica Tech Pioneers</p></a></div>
				<div>
			</div>
				{/* <ul>
					<li><a href=""><i class="fas fa-home"></i>Home</a></li>
					<li><a href=""><i class="fas fa-info-circle"></i>About</a></li>
					<li><a href=""><i class="fas fa-cogs"></i>Services</a></li>
					<li><a href=""><i class="fas fa-log-in"></i>Contacts</a></li>
				</ul> */}
				<ul>
				<li><a href="/"><i class="fas fa-home"></i>Home</a></li>
				<li><a href=""><i class="fas fa-info-circle"></i>About</a></li>
				<li><a href="/login"><i class="fa fa-sign-in"></i>Login</a></li>
				<li className="register-btn"><a href="/signup"><i class="fa fa-pencil-square-o"></i>Register</a></li>
				</ul>
				</>
			) : (
				<>
				
				<div className="logo"><a href="/"><p className="logo-collor">Santa Monica Tech Pioneers</p></a></div>
				<div>
			{/* <h5> {authUser ?` Logged in as ${authUser.username}` : ''}</h5> */}
			</div>
					<ul>
					<li><a href="/"><i class="fas fa-home"></i>Home</a></li>
					<li><a href=""><i class="fas fa-info-circle"></i>About</a></li>
						<li><a href=""><i class="fas fa-envelope"></i>Contacts</a></li>
						<li><a href="dashboard"><i class="fas fa-cogs"></i>Back to project</a></li>
						<li><a href="" onClick={logoutUser}><i class="fas fa-sign-out" ></i>Logout</a></li>
						{/* <button className="header_nav_buttons"style={{background:"none"}} onClick={logoutUser}>Logout</button> */}
					</ul>
				</>
			)}
			{/* <button
						className="nav-btn nav-close-btn"
						onClick={showNavbar}>
						<FaTimes />
					</button> */}
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
