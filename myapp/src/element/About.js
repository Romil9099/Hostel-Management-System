import React from "react";
import advideo from "../img/advideo.mp4"
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import g1 from "../img/g1.jpg"
import g2 from "../img/g2.jpg"
import g3 from "../img/g3.jpg"
import g4 from "../img/g4.jpg"
import g5 from "../img/g5.jpg"
import g6 from "../img/g6.jpg"
import g7 from "../img/g7.jpg"
import g8 from "../img/g8.jpg"
import g9 from "../img/g9.jpg"
import g10 from "../img/g10.jpg"
import g11 from "../img/g11.jpg"
import g12 from "../img/g12.jpg"
import g13 from "../img/g13.jpg"
import g14 from "../img/g14.jpg"
import g15 from "../img/g15.jpg"
import g16 from "../img/g16.jpg"
import g17 from "../img/g17.jpg"
import g18 from "../img/g18.jpg"
import g19 from "../img/g19.jpg"
import g20 from "../img/g20.jpg"
import g21 from "../img/g21.jpg"
import g22 from "../img/g22.jpg"


function About(){
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <>
            <div className="container-fluid" id="aboutcountainer">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2 className="title">About </h2>
                        <div className="aboutlinkbox">
                        <Link to="/" id='aboutlink' >Home</Link>
                            <i className="fa fa-angle-right" style={{color:'white',fontSize:'2vw',fontWeight:'bolder'}}>  </i>
                        <Link to="#" id='aboutlink' >About</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid" id="back">
                <div className="row align-items-center mt-5 container">
                    <div className="col-md-12" id="aboutptag">
                        <h3 className="mt-0 mt-sm-30 mb-0" id="aboutwelcome">Welcome To</h3>
                        <h2 className="mt-0" id="aboutwelcome1">Shree Annapurnadham adalaj charitable trust,(382421)</h2>
                        <p>In our society residing in Saurashtra, when students used to come to Ahmedabad for studies, they didn't have any accommodation facilities, they couldn't afford to study, the major concern for them was accommodation, so with the thought that these students should get facilities and progress in their studies, a hostel was organized.</p>
                        <p>For this, it was necessary to form a trust, acquire land, and also require financial contributions. At times, it's not possible to manage everything alone.</p>
                       <p>Capable donors were approached for donations to establish the trust, and the trust registration certificate was obtained in the year 2005 by filing with the government.</p>
                        <p>In 2006, donors received donations, and in the year 2006, 10 bigha land was purchased, which is worth 25000 times.</p>
                        <p>For the construction of the community hall, this work was started by keeping small-scale workers in mind, along with this, 16 weddings were also organized, in which political dignitaries, community leaders, elders, and officials were also present, even during the pandemic like Corona, service activities have been carried out.</p>
                    </div>
                </div>
            </div>
            <div className="abouttext container-fluid row">
                <div className="col-md-12 col-lg-6 col-xl-6" id="facilitiesbox" style={{marginTop:'-4%'}}>
                        <span className="fw-bold p-1" id="vdtxt">ABOUT US</span><br/><br/>
                        <span className="p-1 text-dark-emphasis" id="vdtxt1">Join us at Shree Annapurnadham charitable trust (Adalaj), where every student's success is our priority.</span>

                <div id="aboutline"></div>
                <div id="aboutlinetext"><h5>In our society residing in Annapurnadham, when students used to come to Ahmedabad for studies, they didn't have any accommodation facilities, they couldn't afford to study, the major concern for them was accommodation, so with the thought that these students should get facilities and progress in their studies, a hostel was organized.</h5><br/>
                </div>
                <p id="aboutlinetext1">For this, it was necessary to form a trust, acquire land, and also require financial contributions</p>
                <Link to="/About" id='knowmore' className="btn btn-sm  mb-md-40">Know More</Link>
                </div>    
                <div  id="video" className="col-md-12 col-lg-6 col-xl-6 mt-3" >
                        <div id="">
                            <video autoPlay loop muted  id="sourceVideo" >
                                <source src={advideo}  type="video/mp4"/> 
                            </video>
                        </div>
                </div>
            </div>
            <div className="container" id="facilitiesbox">
                <span className="fw-bold p-1" id="vdtxt" style={{fontSize:'3vw',color:'black'}}>GALLERY</span><br/><br/>
                <div id="aboutline"></div>
            </div>
            <div className="container-fluid">
                    <div className="gallery">
                        
                        <img src={g1} alt="Not found"/>
                        <img src={g2} alt="Not found"/>
                        <img src={g3} alt="Not found"/>
                        <img src={g4} alt="Not found"/>
                        <img src={g5} alt="Not found"/>
                        <img src={g6} alt="Not found"/>
                        <img src={g7} alt="Not found"/>
                        <img src={g8} alt="Not found"/>
                        <img src={g9} alt="Not found"/>
                        <img src={g10} alt="Not found"/>
                        <img src={g11} alt="Not found"/>
                        <img src={g12} alt="Not found"/>
                        <img src={g13} alt="Not found"/>
                        <img src={g14} alt="Not found"/>
                        <img src={g15} alt="Not found"/>
                        <img src={g16} alt="Not found"/>
                        <img src={g17} alt="Not found"/>
                        <img src={g18} alt="Not found"/>
                        <img src={g19} alt="Not found"/>
                        <img src={g20} alt="Not found"/>
                        <img src={g21} alt="Not found"/>
                        <img src={g22} alt="Not found"/>
                    </div>
            </div>

            
        </>
    )

}
export default About 