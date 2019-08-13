import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

function Footer ({details}){
 
   
        // var details=this.props
        console.log(details)
        // console.log(Object.keys(details).length)
        // // details = details.length > 0?details:null;
        // // console.log(details.address)
        
        return (
            details.siteData?
            <footer className="bck_b_dark">
                <div className="container">
                    <div className="logo">
                        MUSIC
                </div>
                    <div className="wrapper">
                        <div className="left">
                            <h2>Contact Information</h2>
                            <div className="business_nfo">
                                <div className="tag">
                                    <FontAwesomeIcon icon={faCompass} className="icon" />
                                    <div className="nfo">
                                        <div>address</div>
                                            <div>{details.siteData[0].address}</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesomeIcon icon={faPhone} className="icon" />
                                    <div className="nfo">
                                        <div>Phone</div>
                                            <div>{details.siteData[0].phone}</div>
                                    </div>
                                </div>


                                <div className="tag">
                                    <FontAwesomeIcon icon={faClock} className="icon" />
                                    <div className="nfo">
                                        <div>Working Hours</div>
                                            <div>{details.siteData[0].hours}</div>
                                    </div>
                                </div>

                                <div className="tag">
                                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                                    <div className="nfo">
                                        <div>Email</div>
                                            <div>{details.siteData[0].email}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="left">
                            <h2>Be the first to know</h2>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, doloribus impedit aliquam delectus repudiandae quis illo enim ullam minus sapiente. Magni magnam animi sed impedit optio maxime laborum facilis nulla.</p>
                        </div>
                    </div>
                </div>
            </footer>:null
        )
    
   
}

export default Footer;
