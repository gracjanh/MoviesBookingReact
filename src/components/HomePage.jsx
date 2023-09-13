import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images, sliderSettings } from "../../data";
import { AppContext } from "../context";

const HomePage = () => {
    const {} = useContext(AppContext);

    return (
        <div className="movies-container">
            <Slider {...sliderSettings}>
                {images.map((image, i) => (
                    <Link to={`/${image.name}`} key={i}>
                        <div className="img-container">
                            <img className="img-poster" src={image.url} />
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default HomePage;
