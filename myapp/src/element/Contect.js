import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function Contect(){
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [msg,setmsg] = useState({})
    function handleChage(e){
        e.preventDefault()
        const {name,value} = e.target
        setmsg({...msg,[name]:value})  
    }
    
    function handleSubmit(e){
        e.preventDefault()
        const obj = {
            name:msg.name,
            email:msg.email,
            subject:msg.subject,
            phoneno:msg.phoneno,
            message:msg.message
        }
        fetch("http://127.0.0.1:8000/usermsg/",{
            method:"POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(obj)
        })
        document.getElementById('msgform').reset()
        alert('Your Message is send')
    }

    return(
        <>
            <div className="container-fluid" id="aboutcountainer">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2 className="title">Contect </h2>
                        <div className="aboutlinkbox">
                        <Link to="/" id='aboutlink' >Home</Link>
                            <i className="fa fa-angle-right" style={{color:'white',fontSize:'2vw',fontWeight:'bolder'}}>  </i>
                        <Link to="#" id='aboutlink' >Contect Us</Link>
                        </div>
                    </div>
                </div>
            </div>
 
            <div className="row mt-5">
                <div className="col-lg-6" id="contectmap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.146916782228!2d72.5909904!3d23.164837399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c29dd85881f79%3A0xed00ee592f6e556b!2sShree%20Annapurna%20Dham!5e0!3m2!1sen!2sin!4v1724322396956!5m2!1sen!2sin" width="600" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Website"></iframe>
                </div>
                <div className="col-lg-6" id="contectlabel">
                    <h2 id="contecttitle">Send Us a Message</h2>
                    <form className="needs-validatioin" id='msgform' onSubmit={handleSubmit}>
                    <div className="row mb-3"> 
                        <div className="col-sm-6">
                            <div className="mb-2">
                                <label>Name *</label>
                            </div>
                            <input type="text" className="form-control" name="name" placeholder="Enter Your Name" onChange={handleChage} required></input>
                        </div>
                        <div className="col-sm-6">
                        <div className="mb-2">
                                <label>Email *</label>
                            </div>
                            <input type="email" className="form-control" name="email" placeholder="Enter Your Email"  onChange={handleChage} required></input>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className="mb-2 ">
                                <label>Subject *</label>
                            </div>
                            <input type="text" className="form-control" name="subject" placeholder="Enter Your Subject" onChange={handleChage} required></input>
                        </div>
                        <div className="col-sm-6">
                        <div className="mb-2">
                                <label>Phone *</label>
                            </div>
                            <input type="mobile" className="form-control" name="phoneno" placeholder="Enter Your Phone"  onChange={handleChage} required></input>
                        </div>
                    </div>
                    <div className="mb-2">
                        <label>Message</label>
                        <textarea name="message" className="form-control" rows='5' placeholder="Enter Your Message"  onChange={handleChage} required></textarea>
                    </div>
                    <div className="mb-3" id="contectbtn">
                        <input type="submit" className="btn btn-danger" placeholder="Send a message"/>
                        <input type="reset" className="btn btn-warning" placeholder="Reset"/>
                    </div>
                    </form>
                </div>
            </div>
 
            <div className="socialmedia mt-5">
                    <div className="socialicondiv">
                    <div className="icon"><i className="fa fa-instagram"><a href="https://www.instagram.com/annapurnadham_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label=""></a></i></div>
                    <div className="icon"><i className="fa fa-facebook-official"><a href="https://www.facebook.com/jayannapurna?mibextid=ZbWKwL" aria-label=""></a></i></div>
                    <div className="icon"><i className="fa fa-youtube-play"><a href="https://youtube.com/@shreeannapurnadham?si=el5dfiHKr8ZyjbwO" aria-label=""></a></i></div>
                    <div className="icon"><i className="fa fa-phone"><a href="tel:+916352828905" aria-label=""></a></i></div>
                    <div className="icon"><i className="fa fa-map-marker"><a href="https://maps.app.goo.gl/x38cwh4p63C3WEMN6" aria-label=""></a></i></div>
                    </div>
            </div>
        </>
    )
}
export default Contect