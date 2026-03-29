import React from "react";
import {
    FaArrowRight,
} from "react-icons/fa6";
import "./Categories.scss";
import categories from "./data";

const Categories = () => {
    return (
        <section className="category-section">
            <header className="category-section-header">
                <h2 id="category-section-title" className="category-section-title">
                    Popular category
                </h2>
                <a href="/categories" className="category-section-link">
                    View All <FaArrowRight className="category-section-link-icon" aria-hidden />
                </a>
            </header>

            <div className="category-grid">
                {categories.map(({ slug, title, positions, Icon }) => (
                    <a
                        key={slug}
                        href={`/categories/${slug}`}
                        className="category-tile"
                    >
                        <span className="category-tile-icon-box">
                            <Icon className="category-tile-icon" />
                        </span>
                        <span className="category-tile-content">
                            <span className="category-tile-title">{title}</span>
                            <span className="category-tile-count">
                                {positions} Open position
                            </span>
                        </span>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Categories;
