import React from "react";
import { FaArrowRight } from "react-icons/fa";
import "./banner.scss";

const avatarUrls = [
    "https://i.pravatar.cc/80?img=47",
    "https://i.pravatar.cc/80?img=32",
    "https://i.pravatar.cc/80?img=68",
];

const Banner = () => {
    return (
        <section className="banner">
            <div className="banner-grid" />
                <div className="banner-inner">
                    <div className="banner-main">
                        <div className="proof">
                            <div className="proof-faces">
                                {avatarUrls.map((src) => (
                                    <img
                                        key={src}
                                        src={src}
                                        alt=""
                                        className="proof-face"
                                        width={40}
                                        height={40}
                                        loading="lazy"
                                    />
                                ))}
                            </div>
                            <span className="proof-note">1k+ student reviews</span>
                        </div>

                        <h1 className="banner-headline">
                            Build <span className="banner-headline-skills">skills</span>
                            <br />
                            New opportunities.
                        </h1>

                        <p className="banner-lede">
                            Bee Hired helps you discover new job opportunities, build real-world skills,
                            and move confidently toward the next step in your career.
                        </p>

                        <a href="/" className="banner-btn">
                            <span>Explore the job market</span>
                            <span className="btn-arrow">
                                <FaArrowRight />
                            </span>
                        </a>
                    </div>
                </div>
        </section>
    );
};

export default Banner;
