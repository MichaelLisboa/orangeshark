import React from "react";
import Contact from "../Contact";
import PageStyles from "../UI/PageStyles";
import useRouter from "../../lib/UseRouter";
import Footer from "../Footer";

import "./About.css";

const About = props => {
        const { location } = useRouter();
        return (
            <section style={location.pathname !== '/' && location.pathname !== '/solution' ? PageStyles : null} className="uk-section uk-section-secondary uk-padding-remove-bottom">
                <div className="uk-container uk-margin-medium-top">
                    <h2 className="uk-text-center section-title-primary">Schedule a Demo</h2>
                    <p className="uk-align-center uk-text-center uk-width-1-2@s uk-margin-large-bottom">
                        An intelligent search solution will transform your aftermarket parts business. Schedule a demo to see how an AI-Powered
                        search solution deployed by MC+A can revolutionize your business.
                    </p>
                    <div className="uk-grid uk-grid-large" data-uk-grid >
                        <div className="uk-width-1-3@m">
                            <h4>Why MC+A?</h4>
                            <p>MC+A is a leading independent consultancy focused on delivering solutions that provide users with personalized
                                recommendations and insights. Based in Chicago, IL MC+A has over 10 years of technical expertise delivering solutions
                                focused on improved business outcomes through search (NLP), data processing, Machine Learning (ML) and analytics.</p>
                            <a href="https://twitter.com/mcplusa" className="uk-icon-button uk-margin-small-right" target="_blank" data-uk-icon="twitter" />
                            <a href="https://www.facebook.com/mcplusa/" className="uk-icon-button uk-margin-small-right" target="_blank" data-uk-icon="facebook" />
                            <a href="https://www.linkedin.com/company/mc-a" className="uk-icon-button uk-margin-small-right" target="_blank" data-uk-icon="linkedin" />
                        </div>
                        <div className="uk-width-2-3@m">
                            <Contact />
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        )
    }

export default About;
