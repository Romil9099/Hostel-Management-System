import React  from "react";
import { useState,useEffect } from "react";
import axios from 'axios';
import user from '../img/user.jpeg';
import { useNavigate,Link } from "react-router-dom";

function Admin(){
    
    
    const navigate = useNavigate()
    const [studentData, setStudentData] = useState([]);
    const [allStudent, setallStudent] = useState([]);
    const [msgdata, setmsgdata] = useState([]);
    const [replymsg, setreplymsg] = useState('');
    const [notice, setNotice] = useState('');
    const [changeUser,setChangeUser] = useState({})
    const [ad,setad] = useState(true)
    const [st,setst] = useState(false)
    const [renew,setRenewData] = useState([])
    
    /* Effect on button */
    useEffect(() => {
        window.scrollTo(0, 0);
        const button1 = document.getElementById('bt1');
            const button2 = document.getElementById('bt2');
            if(button1){
            button1.addEventListener('click', () => {
                button1.classList.add('active');
                button2.classList.remove('active');
            });
            }
            if(button2){
            button2.addEventListener('click', () => {
                button2.classList.add('active');
                button1.classList.remove('active');
            });
            }
    }, []);
    /* fatch all student */
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/addstudentview/')
        .then(response => setallStudent(response.data))
        .catch(err => console.log(err));
    }, [allStudent]);
    /* fatch new student */
    useEffect(() => {
            axios.get('http://127.0.0.1:8000/student/')
            .then(response => setStudentData(response.data))
            .catch(err => console.log(err));
    }, [studentData]);

    /* fatch all msg */
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/allmessage/')
        .then(response => setmsgdata(response.data))
        .catch(err => console.log(err));
    }, [msgdata]);

    /* fatch renew student */
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/renewstudentview/')
        .then(response => setRenewData(response.data))
        .catch(err => console.log(err));
    }, []);
    
    /* Clear local storage */
    function handleLogout(){
        window.localStorage.clear()
        navigate('/')
    }

    /* save change username and password data */
    function changeUserName(e){
        e.preventDefault()
        const {name,value} = e.target
        setChangeUser({...changeUser,[name]:value})
    }

    /* chage user password */
    function changeSubmitUser(){
        fetch("http://127.0.0.1:8000/updateadmin/",{
            method:"POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(changeUser)
        })
        document.getElementById('changeform').reset()
    }

    /* delete student */
    function deleteData(id){
        
        fetch("http://127.0.0.1:8000/delete/",{
            method:"POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(id)
        })
    }

    /* add student */
    function addStudent(id){
        fetch("http://127.0.0.1:8000/addstudent/",{
            method:"POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(id)
        })
        deleteData(id)
    }

    /* reject message */
    function ignoreMsg(id){
        fetch("http://127.0.0.1:8000/deletemessage/",{
            method:"POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(id)
        })
    }

    function handleReply(e){
        e.preventDefault()
        setreplymsg(e.target.value)
    }
    function handleNotice(e){
        e.preventDefault()
        setNotice(e.target.value)
    }
    function sendNotice(){
        if (notice) {
            fetch("http://127.0.0.1:8000/notice/",{
                method:"POST",
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(notice)
            })
        }
        document.getElementById('noticeForm').reset()
        setNotice("")
    }
    /* send reply */
    function sendMsg(id1,email1){
        if (replymsg) {
            const temp = {
                id:id1,
                email:email1,
                reply:replymsg
            }
            fetch("http://127.0.0.1:8000/replymessage/",{
                method:"POST",
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(temp)
            })
        }
        else{
            ignoreMsg(id1)
        }
        setreplymsg('')

    }

    function deleteRenew(roomno){
        fetch("http://127.0.0.1:8000/deleterenew/",{
            method:"POST",
            headers: {
            },
            body: (roomno)
        })
    }

    function deleteRenew1(roomno){
        fetch("http://127.0.0.1:8000/deleterenew1/",{
            method:"POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: (roomno)
        })
    }

    function addRenew(roomno,id){
        fetch("http://127.0.0.1:8000/saverenew/",{
            method:"POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({'id':id,'roomNo':roomno})
        })
        deleteRenew1(roomno)    
    }

    function admindash(){
        setad(true)
        setst(false)
    }

    function stddash(){
        setad(false)
        setst(true)
    }
    
    if(window.localStorage.getItem('adLogin'))
    {
        return(
        <>
        
        <div>
            <nav className="navbar navbar-expand-lg bg-light  adminnav">
                    <div className="container-fluid">
                    <button className="btn navbar-brand " onClick={handleLogout}><i className="fa fa-hand-o-left" style={{fontSize:'30px'}}></i> Log Out</button>
                        <div className="" id="adminnav">
                            <ul className="navbar-nav">
                                <li className="nav-item mt-3 mr-4">
                                    <button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#listall">All Student</button>
                                </li>
                                <li className="nav-item setting">
                                    <button type="button" style={{fontSize:'30px'}} className="btn" data-toggle="modal" data-target="#change"><i className="fa fa-cog"></i></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        </div>

        {/* All list student */}
            <div id='listall' className="modal fade" role="dialog" >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>            
                        <h2 className="text-center">Student List</h2>
                        <div className="modal-body">
                            <form id="noticeForm">
                                <div>
                                    <div className="">
                                        <p style={{textAlign:'left',paddingLeft:'6px'}} ><strong>Send Notice : </strong></p>
                                    </div>
                                    <div className="">
                                            <textarea style={{border:'1px solid black'}}  rows={5} className="form-control" placeholder="Send Notice" onChange={handleNotice}/>
                                    </div>
                                </div>
                            </form>
                            <div className="row mb-5 text-center">
                                <div className="col-lg-12 mt-2">
                                    <button type="button" className="btn btn-warning" data-dismiss="modal" style={{width:'200px'}} onClick={sendNotice}>Send</button>
                                </div>
                            </div>
                            {
                                allStudent.sort((a,b)=>a.roomNo-b.roomNo||a.bedNo.localeCompare(b.bedNo)).map((value)=>{
                                    return(
                                        <>
                                            <div className="container text-center mt-4" id="requestData">
                                                <div>
                                                    <span>Room No</span><br/>
                                                    {value.roomNo}
                                                </div>
                                                <div>
                                                    <span>Bed No</span><br/>
                                                    {value.bedNo}
                                                </div>
                                                <div>
                                                    <span>Student Password</span><br/>
                                                    {value.std_pass}
                                                </div>
                                                <div>
                                                    <span>Student Name</span><br/>
                                                    {value.name}
                                                </div>
                                                <div>
                                                    <span>Current Sem</span><br/>
                                                    {value.currentSem}
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                </div>
            </div>

        {/* Change Username Password */}
        <div id="change"  className="modal fade changeBox" role="dialog">
            <div className="modal-dialog modal-md">
                <div className="modal-content">
                    <div className="modal-header ">
                        <h2 id="chagetitle">Change User Or Password</h2>
                        <button type="button" className="close" data-dismiss="modal" onClick={()=>{document.getElementById('changeform').reset()}}>&times;</button>
                    </div>
                    <form className="needs-validation" id="changeform" onSubmit={changeSubmitUser}>
                            <div className="modal-body">
                                <p id="changename">User Name :</p>
                                <input type="text" className="form-control mb-2" name="username" onChange={changeUserName}  required/>
                                <p id="changename">Password :</p>
                                <input type="password" className="form-control" name="password" onChange={changeUserName} required/>
                                    <hr className="mt-5"/>
                                <div className="text-center">
                                    <input type="submit" className="btn btn-warning mt-3" style={{width:'200px'}} />
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        </div>

        <div className="mt-2">
            <div className="row  admindetails text-center " >
                    <div className="col-md-4 box1">
                        <img src={user} id="adminimg" style={{borderRadius:'50%',height:'170px',width:'170px'}} alt="Not found"></img>
                    </div>
                    <div className="col-md-8 box2 text-center">
                        <span style={{paddingRight:'20vw'}}>Welcome</span><br/><span className="" style={{color:'#E4E5E5'}}>Admin</span>                        
                    </div>
            </div>
        </div>
        <hr/>

        <div className="setbt">
            <button className="btn btn-dark setbt1 active" id="bt1" onClick={admindash}>Admin Dashbourd</button>
            <button className="btn btn-dark setbt1"  id="bt2" onClick={stddash}>Student Request</button>
        </div>
        {/* Admin Dashbourd display */}
        {
            ( (ad) && (
                <>
                {(studentData.length !== 0) && (
                <div className="container-fluid" id="requestBox">
                <h3 style={{fontWeight:'800'}}>Addmision <span style={{color:'red'}}>Request</span>:</h3>
                <hr/>
                {
                    studentData.map((value) =>{
                        return(
                            <div className="container text-center mt-4" id="requestData">
                                <div>
                                    <span>ID</span><br/>
                                    #{value.id}
                                </div>
                                <div>
                                    <span>Name</span><br/>
                                    {value.name}
                                </div>
                                <div style={{width:'200px'}}>
                                    <span>Percentage</span><br/>
                                    <div class="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                                            style={{width:Math.floor(value.hscPercentage)+'%',fontSize:'20px'}}>{value.hscPercentage}</div>
                                    </div>
                                </div>
                                <div>
                                    <span>View</span><br/>
                                    <button className="btn btn-warning" data-toggle="modal" data-target={`#myModal${value.id}`}>Show Details</button>
                                    <div id={`myModal${value.id}`} className="modal fade" role="dialog" >
                                        <div className="modal-dialog modal-lg">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                </div>            
                                                <h2>Student Details</h2>
                                                <div className="modal-body">
                                                    <div className="row">
                                                        <div className="col-lg-4">
                                                            <img src={value.passportPhoto} height={150} width={150} className=" rounded-circle" alt="Not found"/>
                                                        </div>
                                                        <div className="col-lg-8 mt-4">
                                                            <p><tr><td><strong>Name :</strong></td><td>{value.name}</td></tr></p>
                                                            <p><tr><td><strong>Email :</strong></td><td>{value.email}</td></tr></p>
                                                            <p><tr><td><strong>Phone No :</strong></td><td>{value.phoneNo}</td></tr></p>
                                                            
                                                        </div>
                                                        <hr/>
                                                    </div>
                                                    <div className="row mt-4 container ">
                                                            <div className="col-lg-6">
                                                            <p><tr><td><strong>Base Name:</strong></td><td>{value.baseName}</td></tr></p>
                                                            </div>
                                                            <div className="col-lg-6">
                                                            <p><tr><td><strong>HSC Percentage :</strong></td><td>{value.hscPercentage}</td></tr></p>    
                                                            </div>
                                                            <hr/>
                                                    </div>
                                                    <div className="row mt-4 container ">
                                                            <div className="col-lg-6">
                                                            <p><tr><td><strong>Collage Name:</strong></td><td>{value.collageName}</td></tr></p>
                                                            </div>
                                                            <div className="col-lg-6">
                                                            <p><tr><td><strong>Current Sem :</strong></td><td>{value.currentSem}</td></tr></p>    
                                                            </div>
                                                            <hr/>
                                                    </div>
                                                    <div className="row mt-4 container ">
                                                            <div className="col-lg-6">
                                                            <p><tr><td><strong>Course:</strong></td><td>{value.course}</td></tr></p>
                                                            </div>
                                                            <div className="col-lg-6">
                                                            <p><tr><td><strong>District :</strong></td><td>{value.district}</td></tr></p>
                                                            </div>
                                                            <hr/>
                                                    </div>
                                                    <div className="row mt-4 container ">
                                                            
                                                            <div className="col-lg-6">
                                                            <p><tr><td><strong>Taluko :</strong></td><td>{value.taluko}</td></tr></p>    
                                                            </div>
                                                            <div className="col-lg-6">
                                                            <p><tr><td><strong>Village:</strong></td><td>{value.village}</td></tr></p>
                                                            </div>
                                                            <hr/>
                                                    </div>
                                                    <div className="row mt-4 container ">
                                                            
                                                            <div className="col-lg-6">
                                                            <p><tr><td><strong>Address :</strong></td><td>{value.address}</td></tr></p>    
                                                            </div>
                                                            <hr/>
                                                    </div>
                                                    <div className="row mt-4 container ">
                                                            <div className="col-lg-4">
                                                            <p><tr><td><strong>Adhar Card:</strong></td><td><a href={value.adharCard} className="btn btn-warning" target="_blank" rel="noreferrer">View</a></td></tr></p>
                                                            </div>
                                                            <div className="col-lg-4">
                                                            <p><tr><td><strong>HSC Result:</strong></td><td><a href={value.hscResult} className="btn btn-warning" target="_blank" rel="noreferrer">View</a></td></tr></p>    
                                                            </div>
                                                            <div className="col-lg-4">
                                                            <p><tr><td><strong>Collage Fee Recipt:</strong></td><td><a href={value.collageFeeRecipt} className="btn btn-warning"  target="_blank" rel="noreferrer">View</a></td></tr></p>    
                                                            </div>
                                                            <hr/>
                                                    </div>
                                                </div>
                                                <div className="row mb-5">
                                                    <div className="col-lg-6 mt-2">
                                                        <button type="button" className="btn btn-danger" data-dismiss="modal" style={{width:'200px'}} onClick={()=>{deleteData(value.id)}}> Reject</button>
                                                    </div>
                                                    <div className="col-lg-6  mt-2">
                                                        <button type="button" className="btn btn-success" data-dismiss="modal" style={{width:'200px'}} onClick={()=>{addStudent(value.id)}}>Accept</button>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            )}
            <hr/>
            {(msgdata.length !== 0) && (
            <div className="container-fluid" id="requestBox">
                <h3 style={{fontWeight:'800'}}>Massage <span style={{color:'red'}}>Request</span>:</h3>
                {
                    msgdata.map((value) =>{
                        return(
                        <>
                            <div className="container text-center mt-4" id="requestData">
                                <div>
                                    <span>ID</span><br/>
                                    #{value.id}
                                </div>
                                <div>
                                    <span>Name</span><br/>
                                    {value.name}
                                </div>
                                <div>
                                    <span>Subject</span><br/>
                                    {value.subject}
                                </div>
                                <div>
                                    <button className="btn btn-danger mr-2 mt-3" onClick={()=>{ignoreMsg(value.id)}}  style={{width:'100px'}}>Ignore</button>
                                    <button className="btn btn-warning mt-3 ml-2" data-toggle="modal" data-target={`#hello${value.id}`} style={{width:'120px'}}>View</button>
                                    <div id={`hello${value.id}`} className="modal fade" role="dialog" >
                                        <div className="modal-dialog modal-lg">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                </div>            
                                                <h2 >Message Details</h2>
                                                <div className="modal-body">
                                                    <div className="row mt-4 container ">
                                                            <div className="col-lg-6">
                                                            <p><tr><td><strong>Name : </strong></td><td>{value.name}</td></tr></p>
                                                            </div>
                                                            <div className="col-lg-6">
                                                            <p><tr><td><strong>Subject : </strong></td><td>{value.subject}</td></tr></p>    
                                                            </div>
                                                            <hr/>
                                                    </div>
                                                    <div className="row mt-4 container ">
                                                            <div className="col-lg-12">
                                                                <p><tr><td><strong>Message : </strong></td><td>{value.message}</td></tr></p>    
                                                            </div>
                                                            <hr/>
                                                    </div>
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-lg-2">
                                                                <p style={{textAlign:'left',paddingLeft:'10px'}}><strong>Replay : </strong></p>
                                                            </div>
                                                            <div className="col-lg-10">
                                                                    <textarea rows={3} className="form-control" onChange={handleReply}/>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="row mb-5">
                                                    <div className="col-lg-12  mt-2">
                                                        <button type="button" className="btn btn-warning" data-dismiss="modal" style={{width:'200px'}} onClick={()=>{sendMsg(value.id,value.email)}}>Send</button>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        )
                    })
                }
                <hr/>
            </div>
            )}
                </>
            ))
        }
        {/* Student bourd display */}
        {
            (st) && (
                <>
                {(renew.length !== 0 ) && (
                    <div className="container-fluid" id="requestBox">
                    <h3 style={{fontWeight:'800'}}>Renew <span style={{color:'red'}}>Request</span>:</h3>
                    {
                        renew.map((value) =>{
                            return(
                                <div className="container text-center mt-4" id="requestData">
                                    <div>
                                        <span>Room No</span><br/>
                                        {value.roomNo[0]}
                                    </div>
                                    <div>
                                        <span>Bed No</span><br/>
                                        {value.roomNo[1]}
                                    </div>
                                    <div>
                                        <span>Current Sem</span><br/>
                                        {value.currentSem}
                                    </div>
                                    <div>
                                        <span>View</span><br/>
                                        <button className="btn btn-warning" data-toggle="modal" data-target={`#renew${value.id}`}>Show Details</button>
                                        <div id={`renew${value.id}`} className="modal fade" role="dialog" >
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                    </div>            
                                                    <h2>Student Details</h2>
                                                    <div className="modal-body">
                                                        <div className="row mt-4 container ">
                                                                <div className="col-lg-6">
                                                                <p><tr><td><strong>Phone No:</strong></td><td>{value.phoneNo}</td></tr></p>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                <p><tr><td><strong>Current Sem :</strong></td><td>{value.currentSem}</td></tr></p>    
                                                                </div>
                                                                <hr/>
                                                        </div>
                                                        <div className="row mt-4 container ">
                                                                <div className="col-lg-6">
                                                                <p><tr><td><strong>Last Sem Result:</strong></td><td><a href={value.result} className="btn btn-warning" target="_blank" rel="noreferrer">View</a></td></tr></p>    
                                                                </div>
                                                                <div className="col-lg-6">
                                                                <p><tr><td><strong>Collage Fee Recipt:</strong></td><td><a href={value.collageFeeRecipt} className="btn btn-warning"  target="_blank" rel="noreferrer">View</a></td></tr></p>    
                                                                </div>
                                                                <hr/>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-5">
                                                        <div className="col-lg-6 mt-2">
                                                            <button type="button" className="btn btn-danger" data-dismiss="modal" style={{width:'200px'}} onClick={()=>{deleteRenew(value.roomNo)}}> Reject</button>
                                                        </div>
                                                        <div className="col-lg-6  mt-2">
                                                            <button type="button" className="btn btn-success" data-dismiss="modal" style={{width:'200px'}} onClick={()=>{addRenew(value.roomNo,value.id)}}>Accept</button> 
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                )}
                </>
            )
        }
        </>
    )
}
    else{
        return(
            <>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h1 style={{ fontSize: '72px', color: '#333' }}>404</h1>
                    <p style={{ fontSize: '24px', color: '#777' }}>Page Not Found</p>
                    <Link to="/" style={{ fontSize: '18px', color: '#007BFF' }}>Go to Home</Link>
                </div>
            </>
        )
    }
    
}
export default Admin