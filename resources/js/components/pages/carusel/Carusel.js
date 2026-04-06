import React from "react";
import "./Carusel.scss";

import borek from "../../../assets/logos/borek.png";
import munda from "../../../assets/logos/munda.png";
import nfon from "../../../assets/logos/nfon.png";
import outsorcy from "../../../assets/logos/outsorcy.png";
import shd from "../../../assets/logos/shd.png";
import speex from "../../../assets/logos/speex.png";
import telkos from "../../../assets/logos/telkos.png";

const logos = [
    { src: borek, alt: "Borek", width: 100, height: 100 },
    { src: munda, alt: "Munda", width: 160, height: 120 },
    { src: nfon, alt: "NFON", width: 140, height: 100 },
    { src: outsorcy, alt: "Outsorcy", width: 120, height: 100 },
    { src: shd, alt: "Shkolla Digjtiale", width: 130, height: 100 },
    { src: speex, alt: "Speeex", width: 130, height: 100 },
    { src: telkos, alt: "Telkos", width: 130, height: 100 },
];
  
const Carusel = () => {
    return (
        <div data-aos="slide-up">
            <div className="trusted-by" >
                <h2 className="trusted-by-text">Trusted By:</h2>
                <div className="underline"></div>
            </div>
            <div className="slider">
                <div className="slide-track">
                {[...logos, ...logos].map((logo, index) => (
                    <div className="slide" key={index}>
                    <img
                        src={logo.src}
                        alt={logo.alt}
                        style={{ width: `${logo.width}px`, height: `${logo.height}px` }}
                    />
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default Carusel;
