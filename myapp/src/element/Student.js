import React, { useEffect, useState } from "react";
import { useNavigate,Link} from 'react-router-dom';
import axios from 'axios'
import adlogo from '../img/adfooter.png'
import stdlogo from '../img/stdlogo.avif'
import jsPDF from "jspdf";
import "jspdf-autotable";
function Student(){

        const navigate = useNavigate()
        const [link1,setlink1] = useState(true)
        const [link2,setlink2] = useState(false)
        const [link3,setlink3] = useState(false)
        const [renew,setrenew] = useState({})
        const [stduser,setstduser] = useState([])
        const [allst,setallst] = useState([])
        const [bed1,setBed1] = useState('')
        const [room1,setRoom1] = useState('')
        const [ic,setic] = useState([])

        var adlo = localStorage.getItem('stdlogin')
        var stdid = localStorage.getItem('stdid')

        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);

        /* fatch data for studet icard */
        useEffect(() => {
            axios.get('http://127.0.0.1:8000/addstudentview/')
            .then(response => setic(response.data))
            .catch(err => console.log(err));
            const button1 = document.getElementById('b1');
            const button2 = document.getElementById('b2');
            const button3 = document.getElementById('b3');
            if(button1){
            button1.addEventListener('click', () => {
                button1.classList.add('active');
                button2.classList.remove('active');
                button3.classList.remove('active');
            });}
            if(button2){
            button2.addEventListener('click', () => {
                button2.classList.add('active');
                button1.classList.remove('active');
                button3.classList.remove('active');
            });}
            if(button3){
            button3.addEventListener('click', () => {
                button3.classList.add('active');
                button1.classList.remove('active');
                button2.classList.remove('active');
            });}
        },[]);

        /* fatch data for student username */
        useEffect(() => {
            axios.get('http://127.0.0.1:8000/userstudent/')
            .then(response => {
                setstduser(response.data)
            })
            .catch(err => console.log(err));
        }, []);

        /* fatch data  for all student */
        useEffect(() => {
            axios.get('http://127.0.0.1:8000/addstudentview/')
            .then(response => {
                var temp =response.data
                var k = temp.filter((val)=>{
                    if((val.roomNo === stdid[0]) && (val.bedNo === stdid[1])){
                        return true   
                    }
                    else{
                        return false
                    }
                })
                setallst(k)
            })
            .catch(err => console.log(err));
        }, [stdid]);


        function logstd(){
            window.localStorage.clear()
            navigate('/')
        }

        function part1(){
            setlink1(true)
            setlink2(false)
            setlink3(false)
        }
        function part2(){
            setlink1(false)
            setlink2(true)
            setlink3(false)
        }
        function part3(){
            let no = '';
            let bed = '';
            for (let i of stdid) {
                if (/\d/.test(i)) { 
                    no += i;
                } 
                else if (/[a-zA-Z]/.test(i)) { 
                    bed += i;
                }
            }
            setBed1(bed)
            setRoom1(no)
            setlink1(false)
            setlink2(false)
            setlink3(true)
        }
        function downloadCard(){
            const doc = new jsPDF();
            const content = document.getElementById('stdicard');
            doc.html(content, {
                callback: function (doc) {
                    doc.save(`${room1}${bed1}-Icard.pdf`);
                }, 
                x: 15,
                y: 40,
                width: 180,
                windowWidth:550,
            });                 
        }
        function deleteNoti(id){
            fetch("http://127.0.0.1:8000/deletenoti/",{
                method:"POST",
                headers: {
                    
                },
                body: JSON.stringify(id)
            })
            window.location.reload()
        }
        function renewChange(e){
            e.preventDefault()
            const {name,value} = e.target
            setrenew({...renew,[name]:value})
        }
        function renewSubmit(e){
            e.preventDefault()
            const stdData = {
                id:allst[0].id,
                roomNo:{stdid}, 
                phone:renew.oldPhone,
                email:renew.oldEmail,
                currentSem:renew.oldSem
            }
            
            const formData = new FormData();
            formData.append('data',JSON.stringify(stdData))
            formData.append('oldFee',document.getElementById('im1').files[0])
            formData.append('lastSemResult',document.getElementById('im2').files[0])

            fetch("http://127.0.0.1:8000/renewstudent/",{
                method:"POST",
                headers: {
                },
                body: formData
            })
            console.log()
            /* document.getElementById('renewform').reset()*/
            alert('Renew application submited')
            setlink1(true)
            setlink2(false)
            setlink3(false)
            window.location.reload()
        }
        
        if(adlo){
            return(
                <>
                    <div className="container11">
                        <div className="navbar-left ">
                            <div className="container mt-4 ">
                                <div><img src={stdlogo} id="stdlogo" alt="Not found" /></div>
                                <h1 className="font-weight-bold mt-4 hello">Hello {stdid}</h1>
                            </div>
                            <ul className="all_btn mt-5">
                                <li><button className="btn active" id="b1"  onClick={part1}>Notifications</button></li>
                                <li><button className="btn" id="b2"   onClick={part2}>Renew</button></li>
                                <li><button className="btn" id="b3"  onClick={part3}>Icard</button></li>
                            </ul>
                        </div>
                        {
                            (link1) && (
                            <div className="scrollable">
                                <div>
                                    <nav className="navbar navbar-expand-lg bg-light" style={{padding:'0px'}}>
                                            <div className="container-fluid  t" id="response">
                                                <button  className="btn logbt" style={{fontSize:'20px'}} onClick={logstd}> Log Out <i className="fa fa-hand-o-right" style={{fontSize:'30px'}}></i></button>
                                            </div>
                                    </nav> 
                                </div>
                            <div className="notifica mt-4 content-right">        
                            { 
                                stduser.filter((value)=>(value.userName===stdid)).reverse().map((num)=> {
                                    return(
                                        <>
                                            
                
                                            <div className="notibox mt-2" id="msg">                                                
                                                <button className="btn close  mt-4 bt-noti" onClick={()=>{deleteNoti(num.id)}}>X</button>
                                                <span className="notibox">Topic: </span><span className="notibox1" style={{color:'blue'}}>{num.statusType}</span><br/>
                                                <span className="notibox">Status:</span><span className="notibox1" style={{color:'red'}}> {num.status}  </span>
                                                    {   num.status === 'Approved' &&
                                                        (<i className="fa fa-thumbs-up" style={{fontSize:'20px',color:'green',padding:'0px'}}></i>)
                                                    }<br/>
                                                <span className="notibox">Time: </span><span className="notibox1">{num.Time}     </span><span className="notibox">  Date: </span><span className="notibox1">{num.Date}</span><br/>
                                            </div>
                                        </>
                                    )
                                }) 
                            }  
                            </div>
                            </div>
                            )
                        }
                        {
                            (link2) && (
                                <div className=" scrollable  ">
                                    <div>
                                    <nav className="navbar navbar-expand-lg bg-light" style={{padding:'0px'}}>
                                            <div className="container-fluid  t" id="response">
                                                <button  className="btn logbt" style={{fontSize:'20px'}} onClick={logstd}> Log Out <i className="fa fa-hand-o-right" style={{fontSize:'30px'}}></i></button>
                                            </div>
                                    </nav>
                                    </div>
                                <div className="pt-4  container  admissionform admissiontype" >
                                    <form className="admission needs-validation " id="renewform" onSubmit={renewSubmit} >
                                        <legend className="mb-4" ><span id="legendtext">BASIC DETAILS</span></legend>
                                        <div className="row mb-3">
                                            <div className="col-sm-6">
                                                <div className="mb-2">
                                                    <label>Room No <span style={{color:'red'}}>*</span></label>
                                                </div>
                                                <select name="roomNo" className="custom-select"  required>
                                                    <option value={stdid[0]} selected disabled >{stdid[0]}</option>
                                                </select>
                                            </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label>Bed No <span style={{color:'red'}}>*</span></label>
                                            </div>
                                            <select name="bedNo" className="custom-select"  required>
                                                <option value={stdid[1]} selected disabled >{stdid[1]}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-6">
                                            <div className="mb-2 ">
                                                <label>name <span style={{color:'red'}}>*</span></label>
                                            </div>
                                            <select name="name" className="custom-select"  required>
                                                <option value={allst[0].name} selected disabled >{allst[0].name}</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-6">
                                        <div className="mb-2">
                                                <label>Phone <span style={{color:'red'}}>*</span></label>
                                            </div>
                                            <input type="tel"  className="form-control" name="oldPhone" placeholder="Enter phone " onChange={renewChange} required></input>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label>Email <span style={{color:'red'}}>*</span></label>
                                            </div>
                                            <input type="email" className="form-control" name="oldEmail" placeholder="Enter your email" onChange={renewChange} required></input>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2 ">
                                                <label>Current sem <span style={{color:'red'}}>*</span></label>
                                            </div>
                                            <input type="number" max={8} min={1}  className="form-control" name="oldSem" placeholder="Enter your sem" onChange={renewChange} required></input>
                                        </div>
                                    </div>
                
                                    <div className="row mb-3">
                                        <div className="col-sm-6">
                                            <div className="mb-2 ">
                                                <label>Upload Collage fee recipt <span style={{color:'red'}}>*</span></label>
                                            </div>
                                            <input type="file"  className="form-control" id="im1" name="oldCollagefees" required></input>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2 ">
                                                <label>Upload last sem marksheet <span style={{color:'red'}}>*</span></label>
                                            </div>
                                            <input type="file"  className="form-control" name="oldlastsem" id="im2" required></input>
                                        </div>
                                    </div>
                
                                    <div className="pt-4" id="contectbtn">
                                        <input type="submit" className="btn btn-danger" />
                                        <input type="reset" className="btn btn-warning" placeholder="Reset"/>
                                    </div>
                                    </form>
                            </div>
                                </div>
                            )
                        }
                        {
                            (link3) && (
                                <>
                                    <div className="scrollable " >
                                        <div>
                                            <nav className="navbar navbar-expand-lg bg-light" style={{padding:'0px'}}>
                                                <div className="container-fluid" id="response">
                                                    <button className="btn btn-success dowbtn mb-2" onClick={downloadCard} >Download</button>
                                                    <button  className="btn logbt" style={{fontSize:'20px'}} onClick={logstd}> Log Out <i className="fa fa-hand-o-right" style={{fontSize:'30px'}}></i></button>
                                                </div>
                                            </nav>
                                        </div>
                                        {
                                            
                                            ic.filter((value)=>(value.roomNo===room1 && value.bedNo===bed1)).map((num)=> {
                                                return(
                                                    <>
                                                    <div className="card-container bodyicard" id='stdicard'>
                                                    <div className="card">
                                                        <div className="card-header">                                                            
                                                            <h2 ><img src={adlogo} className="icardlogo" alt="Not found"/>Shree Annapurnadham Kumar Chhatralaya</h2>
                                                            <p>Block no-138 Swaminarayan farm adalaj-coba-road gandhinager-382421 Mo-6352828905</p>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="card-info">
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <img src={num.passportPhoto} alt="Profile" className="profile-image"/>        
                                                                    </div>
                                                                    <div className="col-md-8">
                                                                        <p><strong>Name : </strong>{num.name}</p>
                                                                        <p><strong>Phone : </strong>{num.phoneNo}</p>
                                                                        <p><strong>Email : </strong>{num.email}</p>
                                                                    </div>
                                                                </div>
                                                                <hr/>
                                                                <p><strong>Room : </strong>{room1}-{bed1}</p>
                                                                <p><strong>Collage : </strong>{num.collageName}</p>
                                                                <p><strong>Edu : </strong>{num.course}</p>
                                                                <p><strong>Address : </strong>{num.address}</p>
                                                            </div>
                                                        </div>
                                                        <div className="card-footer">
                                                            <p style={{margin:'0px'}}>2024-2026</p>
                                                            <p style={{margin:'0px'}}>annapurnadham12@gmail.com</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            )
                        }
                    </div>
                </>
            )
        }
        else{
            return(
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1 style={{ fontSize: '72px', color: '#333' }}>404</h1>
                <p style={{ fontSize: '24px', color: '#777' }}>Page Not Found</p>
                <Link to="/" style={{ fontSize: '18px', color: '#007BFF' }}>Go to Home</Link>
            </div>
            )
        }
}

export default Student


