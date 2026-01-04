import React from "react";
import adfooter from '../../src/img/adfooter.png'
import {Link} from 'react-router-dom'

function Footer(){
    return(
        <>
        <hr className="mt-5"/>
            <div className="container mt-5 pt-5">
            <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3" id="footerlogo">
                    <div className="text-center">
                        <img src={adfooter} alt="not found"/>
                    </div>
                    <div className="text-center">
                        <a href="https://maps.app.goo.gl/XX1h9nFtEGSHh8dT9" className="btn">View On Map</a>
                    </div>
                    <div className="text-center">
                    <ul type='none' id="#address" className="mt-4">
                        <li>Swaminarayan Farm,
                            <br/>
                            Adalaj-Coba road,
                            <br/>
                            Block-138,382421
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                    <div className="text-center">
                        <h3>Contect Info</h3>
                        <ul type='none'>
                        <li>
                            <a href="tel:+916352828905" className="">
                                <i className="fa fa-phone" >+91 6352828905 (Hostel Office)</i>
                            </a>
                        </li>
                        <li>
                            <a href="tel:+919904841843" className="">
                                <i className="fa fa-phone" >+91 9904841843 (Hostel Office)</i>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:romilrupareliya12345@gmail.com" className="">
                                <i className="fa fa-envelope" >  annapurnadham12@gmail.com</i>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:romilrupareliya12345@gmail.com" className="">
                                <i className="fa fa-envelope">  adpatel@gmail.com</i>
                            </a>
                        </li>
                        </ul>
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <div className="text-center">
                        <h3>Links</h3>
                        <ul type='none'>
                        <li>
                            <Link to="/admission" className="">
                                <i className="fa fa-hand-o-right" >   Admission</i>
                            </Link>
                        </li>
                        <li>
                            <Link to='/' className="">
                                <i className="fa fa-hand-o-right" >   Downloads</i>
                            </Link>
                        </li>
                        <li>
                            <Link to='/' className="">
                                <i className="fa fa-hand-o-right" >   Other Admission</i>
                            </Link>
                        </li>
                        <li>
                            <Link to='/' className="">
                                <i className="fa fa-hand-o-right" >   News</i>
                            </Link>
                        </li>
                        </ul>
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                    <div className="text-center">
                        <h3>Opening Hourse</h3>
                        <hr/>
                        <ul type='none'>
                            <li className="time" ><span className="float-start flip">Monday - Saturday</span>
                                <div className="float-end flip">10.00 am -<br/> 6.00 pm</div>
                            </li>
                            <hr/>
                            <li className="time"><span className="float-start flip">Sunday</span>
                                <div className="float-end flip">Closed</div>
                            </li>
                            <hr></hr>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Footer;