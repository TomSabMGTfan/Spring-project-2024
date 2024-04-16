import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import './css/Header.css'

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<h3><a href="/#">SantaMonicaTechPioneersClient</a></h3>
			<nav ref={navRef}>
				<a href="/login"><i className='fas fa-user'></i>Log in</a>
				<a href="#Contact"><i className='fas fa-address-book'></i>Contact</a>
				<a href="#Pricing"><i className='fas fa-dollar-sign'></i>Pricing</a>
				<a href="/signup"><i className='fas fa-play'></i>Get started</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;
