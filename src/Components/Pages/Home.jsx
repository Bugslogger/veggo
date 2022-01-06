import React, { useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ArrowBackIos } from "@mui/icons-material";
import HeaderSection from "../HeaderSection/HeaderSection";
import { Arrray } from "../../data";
import ImageSlider, { Indicator } from "../Comp";
import HomePageItem from "./HomePageItem";

const styles = {
  home: {
    width: "100%",
    height: "100%",
  },
};

const Home = () => {
  const slide = useRef("");

  const slideOnclick = (e) => {
    if (e.target.id === "left") {
      (slide.current.scrollLeft -= 200)
    } else if (e.target.id === "right") {
      (slide.current.scrollLeft += 200)
    }
  };

  return (
    <div style={styles.home} className="home-container">
      <div className="app-header-section">
        <HeaderSection />
      </div>
      <div className="app-relative-container">
        <Indicator />
        <h2 className="sub-heading">Order Your Veggies</h2>
        <div ref={slide} className="h3-slider-container">
          <div onClick={slideOnclick}
              id="left" className="ind-left-arrow">
            <ArrowBackIos
              onClick={slideOnclick}
              id="left"
              sx={{
                color: "#48A14D",
                paddingLeft: "4px",
              }}
            />
          </div>
          {Arrray.map((data, index) => {
            return (
              <ImageSlider key={index} image={data.image} name={data.name} />
            );
          })}
          <div onClick={slideOnclick}
              id="right" className="ind-right-arrow">
            <ArrowForwardIosIcon
              onClick={slideOnclick}
              id="right"
              sx={{
                color: "#48A14D",
              }}
            />
          </div>
        </div>
      </div>

      <HomePageItem />
    </div>
  );
};

export default Home;
