import { Search } from '@mui/icons-material';
import React from 'react';
import DataList from './dataList';
import "./sectionheader.css";
import cover from '../../images/cover.jpg';
const HeaderSection = () => {
    return (
        <div className="header-section-container">
            <div className="hs-image-container">
                <img src={cover} className="cover-image" alt="cover" />
            </div>
            <div className="hs-search-text-container">
                <div className="hs-search-box-container">
                    <h2 style={{
                        letterSpacing: "0.4em",
                        margin: "5px 0 10px 0",
                        fontSize: "3.5em"
                    }} className="h3-title">Capsikon</h2>
                    <h3 className="h3-title">Fresh Vegitables, Healthy Vegitables</h3>
                    <div className="search-bar-wrapper">
                        <DataList />
                        <div className="searchIcon">
                            <Search
                                sx={
                                    {
                                        border: "none",
                                        fontSize: "2.2rem",
                                        color: "rgba(128,128,128,0.5)"
                                    }
                                }
                            /></div>
                        <input className="search-input" type="text" onChange={(e) => console.log(e.target.value)} name="search" placeholder="Eat healthy and Fresh Vegitables" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderSection;
