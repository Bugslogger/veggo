import React from 'react';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ArrowBackIos } from "@mui/icons-material";
import HeaderSection from '../HeaderSection/HeaderSection';
import { Arrray } from '../../data';
import ImageSlider, {Indicator} from '../Comp';
import HomePageItem from './HomePageItem';

const styles = {
    home: {
        width: "100%",
        height: "100%"
    }
} 

const Home = () => {
    return (
        <div style={styles.home} className='home-container'>
             <div className="app-header-section">
        <HeaderSection />
      </div>
      <div className="app-relative-container">
        <Indicator />
        <h2 className="sub-heading">Order Your Veggies</h2>
        <div className="h3-slider-container">
          <div className="ind-left-arrow">
            <ArrowBackIos
              sx={{
                color: "#48A14D",
                paddingLeft: "4px",
              }}
            />
          </div>
          {Arrray.map((data, index) => {
            return <ImageSlider key={index} image={data.image} name={data.name} />;
          })}
          <div className="ind-right-arrow">
            <ArrowForwardIosIcon
              sx={{
                color: "#48A14D",
              }}
            />
          </div>
        </div>
      </div>

      <HomePageItem/>
        </div>
    )
}

export default Home;
