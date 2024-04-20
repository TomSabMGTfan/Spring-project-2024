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
		<header>
			<h3><a href="/#">SantaMonicaTechPioneers</a></h3>
			{/* <nav ref={navRef}>
				<a href="/login"><i className='fas fa-user'></i>Log in</a>
				<a href="#Contact"><i className='fas fa-address-book'></i>Contact</a>
				<a href="#Pricing"><i className='fas fa-dollar-sign'></i>Pricing</a>
				<a href="/signup"><i className='fas fa-play'></i>Get started</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav> */}
			<nav ref={navRef} >
				{!authUser ? (
					<>
					<a href="/login"><i className='header_nav_buttons'></i>Log in</a>
					<a href="/signup"><i className="header_nav_buttons"style={{color:"red"}}>Get started</i></a>
					</>
 				) : (
					<>
					<a href="#Contact"><i className="header_nav_buttons">Contact</i></a>
					<a href="#Pricing"><i className="header_nav_buttons">Pricing</i></a>
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
		
		</header>
	);
}

export default Navbar;
