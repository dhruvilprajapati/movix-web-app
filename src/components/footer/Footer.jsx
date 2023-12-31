import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="socialIcons">
                    <span className="icon">
                        <Link to="https://www.facebook.com/people/Prajapati-Dhruvil/pfbid02tPMm4ewCa7xfeVLMbzuiE81QgeQD8VxHmZqrCffsGWVNGWsvdKyLeKBBKXVi2aAil/" target="_blank">
                            <FaFacebookF color="white" />
                        </Link>
                    </span>
                    <span className="icon">
                        <Link to="https://www.instagram.com/" target="_blank">
                            <FaInstagram color="white" />
                        </Link>
                    </span>
                    <span className="icon">
                        <Link to="https://twitter.com/Prajapati_DP_?t=m-WeiL0bxUSxRtE3_aI00g&s=09" target="_blank">
                            <FaTwitter color="white" />
                        </Link>
                    </span>
                    <span className="icon">
                        <Link to="https://www.linkedin.com/in/dhruvil-prajapati-98b803214/" target="_blank">
                            <FaLinkedin color="white" />
                        </Link>
                    </span>
                </div>
                <div className="infoText">
                    @2023 | Dhruvil Prajapati
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;