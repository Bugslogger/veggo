// import { Close } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import "../Head/head.css";


const SliderMenu = ({click}) => {
    return (
        <div className="slider-menu-container">
            <div className="slider-menu">
                <ul className="slider-menu-list">
                    <li onClick={click} className="slider-list">
                        <Link  to="/">
                            Home
                        </Link>
                    </li>
                    <li className="slider-list">
                        <Link onClick={click} to="/orders">
                            Orders
                        </Link>
                    </li>
                    <li onClick={click} className="slider-list">
                        <Link  to="/profile">
                            Profile
                        </Link>
                    </li>
                    <li className="slider-list">
                        <Link onClick={click} to="/about">
                            About
                        </Link>
                    </li>
                    <li className="slider-list">
                        <Link onClick={click} to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SliderMenu;
