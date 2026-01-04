import React, { useState ,useEffect} from "react";
import adlogo from '../img/adlogo.png'
import { Link, useNavigate } from 'react-router-dom';
import axios  from "axios";

function Navbar(){
    
    const navigate = useNavigate()
    const [user,setuser] = useState({})
    const [userpwd,setuserpwd] = useState([])
    const [alert1, setAlert] = useState(false);
    const [stduser, setstduser] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/userstudent/')
        .then(response => setstduser(response.data))
        .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/useradmin/')
        .then(response => setuserpwd(response.data))
        .catch(err => console.log(err));
    }, []);

    function handlechange(e){
        e.preventDefault()
        const {name,value} = e.target
        setuser({...user,[name]:value})
        setAlert(false) 
    }    
    function handleSubmit(e){
        e.preventDefault();
        if (user.username === userpwd[0].userName && user.password === userpwd[0].passWord) {
            window.localStorage.setItem('adLogin', true);
            navigate('/Admin')
            window.location.reload();
        } 
        else{
            if(stduser !== ''){
                stduser.forEach(value => {
                    if(user.username === value.userName && user.password === value.passWord){
                        localStorage.setItem('stdid',user.username)
                        localStorage.setItem('stdpass',user.password)
                        localStorage.setItem('stdlogin',true)
                        navigate('/Student')
                        window.location.reload()
                    }
                    else{
                        setAlert(true)
                    }
                });
            }
            else{
                setAlert(true)
            }
        }
    }
    return(
        <> 
            <button onClick={()=>{window.scrollTo({top:0})}}  id="scrolltotop" className="text-center" ><i className="fa fa-angle-up" style={{color:'white',fontSize:'40px',fontWeight:'bold'}}></i></button>
            <div className="container-fluid">
            <nav className="navbar navbar-expand-md bg-light fixed-top">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" style={{fontSize: '30px'}}><img src={adlogo} className="rounded-circle" id="adlogo" alt="not found"/>  <span id="adtxt"> Annapurna<b style={{color: '#3c3c3c'}}>Dham</b></span></Link>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#response">
                    <span className="navbar-toggler-icon" id="toggler-button"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="response">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/About" className="nav-link ">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Contect" className="nav-link ">Contect Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Admission" className="nav-link ">Admission</Link>
                            </li>
                            <li className="nav-item">
                                <button type="button" className="nav-link" data-toggle="modal" data-target="#myModal" id="userid"><i className="fa fa-user"></i></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        
        <div id="myModal"  className="modal fade loginmo" role="dialog">
            <div className="modal-dialog modal-md">
                <div className="modal-content loginmo1">
                    <div className="modal-header ">
                        <h2 id="modalt">Login</h2>
                        <button type="button" className="close" data-dismiss="modal" onClick={()=>{document.getElementById('userfile').reset()}}>&times;</button>
                    </div>
                    <form className="needs-validation" onSubmit={handleSubmit} id="userfile">
                            <div className="modal-body modalfile">
                                {(alert1) && (
                                    <div className="alert alert-danger ml-5 mr-5" style={{height:'30px'}}>
                                        <p style={{marginTop:'-3%',fontSize:'16px'}}><strong>Invalid.... </strong> Enter Valid Username or Password</p>
                                        {document.getElementById('userfile').reset()}
                                    </div>
                                )}
                                <p>User Name</p>
                                <input type="text" className="form-control mb-2" name="username" onChange={handlechange} required/>
                                <p>Password </p>
                                <input type="password" className="form-control" name="password" required onChange={handlechange}/>
                                    <hr className="mt-5"/>
                                <div className="modalbt">
                                    <input type="submit" className="btn btn-warning mt-3" />
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        </div>
        <br /><br /> 
        </>
    )
}
export default Navbar;
