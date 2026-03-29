import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FooterData, SocialMedia } from './data';
// import SelectLanguage from '../SelectLanguage/SelectLanguage';
import './footer.scss'

const Footer = (props) => {

    return(
        <div className='shared-footer'>

            <div className="main-row">

                <div className="first-col">
                    <div className="top">
                        <a href='/' className='logo-container'>
                            <div className="logo"></div>
                        </a>
                        <h5><FormattedMessage id='footer-paragraph1' defaultMessage='Find the best job for you.' /></h5>
                        <p><FormattedMessage id='PHONE' defaultMessage='PHONE' />: +383 48 777 888</p>
                        <p><FormattedMessage id='EMAIL' defaultMessage='EMAIL' />:  beehired@gmail.com</p>
                    </div>
                    <div className="links1">
                        {SocialMedia.map((props, index) => {
                            return(
                                <a
                                    key={`${props.to}-${index}`}
                                    href={props.to}
                                    aria-label={`Social link ${index + 1}`}
                                >
                                    {props.icon}
                                </a>
                            )
                        })}
                    </div>
                </div>
                
                <div className='all-footer-links'>
                    {FooterData.map((props, categoryIndex) => {
                        return(
                            <div className="footer-list" key={`footer-category-${categoryIndex}`}>
                                <h6>{props.category}</h6>
                                <div className="links">
                                    {props.links.map((l, linkIndex) => {
                                        return (
                                            <a
                                                key={`${l.to}-${linkIndex}`}
                                                href={l.to}
                                                className="footer-item"
                                            >
                                                {l.link}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="last-row">

                <p><FormattedMessage id='footer-paragraph2' defaultMessage='© 2026 BEE HIRED  | ALL RIGHTS RESERVED' /></p>
     
                {/* <SelectLanguage
                    setLanguage={props.setLanguage}
                    language={props.language}
                /> */}
            </div>
        </div>
    )
};

export default Footer;
