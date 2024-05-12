import { AuthContext } from "../utils/AuthContext"
import { useContext, useEffect, useRef } from "react";
import { Link } from 'react-router-dom'
import './css/homepage.css';
import img1 from "../assets/Background8.png";

export const Home = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <>
            <div className="container">
                <div className="content">
                    <h1>Start </h1>
                    <h1>Team Work</h1>
                    <p>Collaborative effort of a group to achieve a common goal or <br></br>to
                        complete a task in an effective and efficient way !</p>
                    {!user && <Link to="/signup" className="pgr-btn">Join now</Link>}
                </div>

                <div className="homepage-picture">
                    <img src={img1} alt="labas" className="feature-img" />
                </div>

            </div>
        </>
    )
}