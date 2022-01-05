// import { Close } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Head/head.css";
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const SliderMenu = ({click}) => {

    const [ShowLink, setShowLink] = useState(false);

    useEffect(() => {
        onAuthStateChanged(getAuth(), (user)=>{
            if(user){
                setShowLink(true);
            } else {
                setShowLink(false);
            }
        })
    }, [])

    return (
        <div className="slider-menu-container">
            <div className="slider-menu">
                <ul className="slider-menu-list">
                    <li onClick={click} className="slider-list">
                        <Link  to="/">
                            Home
                        </Link>
                    </li>
                   {ShowLink ?<> <li className="slider-list">
                        <Link onClick={click} to="/orders">
                            Orders
                        </Link>
                    </li>
                    <li onClick={click} className="slider-list">
                        <Link  to="/profile">
                            Profile
                        </Link>
                    </li> </>: null}
                    <li className="slider-list">
                        <Link onClick={click} to="/about">
                            About
                        </Link>
                    </li>
                   {!ShowLink ? <li className="slider-list">
                        <Link onClick={click} to="/login">
                            Login
                        </Link>
                    </li>:null}
                </ul>
            </div>
        </div>
    )
}

export default SliderMenu;
