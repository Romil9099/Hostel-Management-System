import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import advideo from "../img/advideo.mp4"
import ad1 from '../img/ad1.png'
import ad2 from '../img/ad2.png';
/* import ad3 from '../img/ad3.png'; */
import ad4 from '../img/ad4.png';
import found1 from '../img/found1.png';
import found2 from '../img/found2.png';
import found3 from '../img/found3.png';
import found4 from '../img/found4.png';
function  Home(){
    const [student,setstudent] = useState(0)
    const [st1,setst1] = useState(9000)
    const [st2,setst2] = useState(0)
    useEffect(() => {
        const carousel = document.querySelector('#adimages');
        new window.bootstrap.Carousel(carousel, {
            interval: 3000,
            ride: 'carousel'
        });
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(()=>{
        if(student<600){
            setstudent(student+1)
        }
        if(st1<10000){
            setst1(st1+1)
        }
        if(st2<20){
            setst2(st2+1)
        }
    },[st1,st2,student])
    return(
        <>    
        
        {/* carousel  */}
        
        <div className="container-fluid" >
            <div className="carousel slide" id="adimages" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-indicators">
                    <button type="button" className="active" data-bs-target="#adimages" data-bs-slide-to="0"
                        style={{backgroundColor: 'lightgrey',borderRadius: '50%',width: '10px',height: '10px',}}>
                    </button>
                    <button type="button"  data-bs-target="#adimages" data-bs-slide-to="1" 
                        style={{backgroundColor: 'lightgrey',borderRadius: '50%',width: '10px',height: '10px',}}>
                    </button>
                    <button type="button" data-bs-target="#adimages" data-bs-slide-to="2"
                        style={{backgroundColor: 'lightgrey',borderRadius: '50%',width: '10px',height: '10px',}}>
                    </button>
                    
                </div>
                <div className="carousel-inner" >
                    <div className="carousel-item active">
                        <img src={ad1} alt="Not found" />
                    </div>
                    <div className="carousel-item">
                        <img src={ad2}alt="Not found"/>
                    </div>
                    <div className="carousel-item">
                        <img src={ad4} alt="Not found"/>
                    </div>
                    
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#adimages" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#adimages" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    <br /><br /><br /><br />
        
    
        {/* Video */}
        
    <div className="abouttext container-fluid row">
        <div className="col-md-12 col-lg-6 col-xl-6" id="facilitiesbox" style={{marginTop:'-4%'}}>
                <span className="fw-bold p-1" id="vdtxt">ABOUT US</span><br/><br/>
                <span className="p-1 text-dark-emphasis" id="vdtxt1">Join us at Shree Annapurnadham charitable trust (Adalaj), where every student's success is our priority.</span>

        <div id="aboutline"></div>
        <div id="aboutlinetext"><h5>In our society residing in Annapurnadham, when students used to come to Ahmedabad for studies, they didn't have any accommodation facilities, they couldn't afford to study, the major concern for them was accommodation, .</h5><br/>
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

        {/* Hostel Facilities */}
        <div className="row" id="facilitiesbox">
            <div className="col-md-12 text-center">
                <h2 id="facilities">Hostel 
                    <span id="facilities1">  Facilities</span>
                </h2>
                <div id="facilitiesline"></div>  
                <hr className="title-underline"></hr>
            </div>
            
        </div>

        <div className="text-center">
            <div className="row" id='facilitiesboxicon'>
                <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 text-center">
                    <i className="fa fa-home"></i>
                    <h4>Large Room</h4>
                </div>            
                <div className=" col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 text-center">
                <i className='fa fa-fire-extinguisher'></i>
                    <h4>Fire Safety</h4>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 text-center">
                    <i className='fa fa-desktop'></i>
                    <h4>Reading Library</h4>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 text-center">
                    <i className='fa fa-camera'></i>
                    <h4>CCTV Camera</h4>
                </div>
            </div>
        </div>
            <hr className="mt-5"/>
        <div className="row" id="found" >
                <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 text-center">
                    <img src={found1} alt="Not found"/>
                    <h3>2020</h3>
                    <h4>Founded</h4>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 text-center" >
                    <img src={found2} alt="Not found"/>
                    <h3>{student}</h3>
                    <h4>Students</h4>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 text-center">
                    <img src={found3} alt="Not found"/>
                    <h3>{st1}+</h3>
                    <h4>Alumni Students</h4>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 text-center">
                    <img src={found4} alt="Not found"/>
                    <h3>{st2}+</h3>
                    <h4>Near School & College</h4>
                </div>
        </div>

        
        </>
    )
}
export default Home