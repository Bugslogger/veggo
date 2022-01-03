// import { Close } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import "../Head/head.css";


const SliderMenu = ({click}) => {
    return (
        <div className="slider-menu-container">
            <div className="slider-menu">
                <ul className="slider-menu-list">
                    <li className="slider-list">
                        <Link onClick={click} to="/">
                            Home
                        </Link>
                    </li>
                    <li className="slider-list">
                        <Link onClick={click} to="/orders">
                            Orders
                        </Link>
                    </li>
                    <li className="slider-list">
                        <Link onClick={click} to="/profile">
                            Profile
                        </Link>
                    </li>
                    <li className="slider-list">
                        <Link onClick={click} to="/about">
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SliderMenu;
