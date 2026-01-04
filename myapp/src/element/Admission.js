import React from "react";
import { useState,useEffect } from "react";
import {useNavigate } from 'react-router-dom';
function Admission(){

    const navigate = useNavigate()
    const [inputname,setname] = useState({})

    /* calculate percentage */
    const [hscpct,sethscpct] = useState()
    const [totalmark,settotalmark] = useState(0)
    const [obtainmark,setobtainmark] = useState(0)

    /* Changing page */
    const [submit, setsubmit] = useState(true);
    const [submitnew, setsubmitnew] = useState(false);
    const [submitnewdetais, setsubmitnewdetais] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function handlechange(e){
        e.preventDefault()
        const {name,value} = e.target
        setname({...inputname,[name]:value})        
    }
    /* calc pct */
    useEffect(()=>{
        var num1 = parseFloat(totalmark) ;
        var num2 = parseFloat(obtainmark);
        sethscpct(((num2*100)/num1).toFixed(2));
    },[totalmark,obtainmark])

    function onChangeTotal(e){
        e.preventDefault()
        settotalmark(e.target.value)
    }
    function onChangeObtain(e){
        e.preventDefault()
        setobtainmark(e.target.value)
    }


    function handlesubmit(e){
        e.preventDefault()
        setsubmit(false)
        setsubmitnew(true)
    }
    
    function handlesubmitnew(){
        setsubmitnew(false)
        setsubmitnewdetais(true)
    }

    /* Add data for new student */
    function handleSubmitData(e){
        e.preventDefault()
        const studentData = {
            name:inputname.name,
            email:inputname.email,
            collageName:inputname.collageName,
            phoneNo:inputname.phoneNo,
            currentSem:inputname.currentSem,
            course:inputname.course,
            hscPercentage: {hscpct},
            baseName:inputname.baseName,
            district:inputname.district,
            taluko:inputname.taluko,
            village:inputname.village,
            address:inputname.address,
        }
        
        const formData = new FormData();
        formData.append('Data',JSON.stringify(studentData))
        formData.append('hscResult',document.getElementById('im1').files[0])
        formData.append('adharCard',document.getElementById('im2').files[0])
        formData.append('collageFeeRecipt',document.getElementById('im3').files[0])
        formData.append('passportPhoto',document.getElementById('im4').files[0])
        console.log(studentData)

        fetch("http://127.0.0.1:8000/collect/",{
            method:"POST",
            headers: {
                
            },
            body: formData
        })
        /* document.getElementById('mainform').reset() */
        navigate('/')
    }
    
    return(
        <>
            {
                (submit) && (
                    <div className="container mt-5 admission admissiontype pb-4">
                    <form style={{margin:'3%'}} className="needs-validation" onSubmit={handlesubmit} name='baseform' >
                        <fieldset>
                            <legend className="mt-3" ><span id="legendtext">Admission Base</span></legend>
                            <div className="row form-group">
                                <div className="col-sm-3">
                                    <label className="mt-3">Admission Base: <span style={{color:'red'}}>*</span></label>
                                    <select name="baseName" className="custom-select mt-3" required onChange={handlechange}>
                                        <option value="" selected disabled hidden>---Select Base Type---</option>
                                        <option value="commerce">Commerce</option>
                                        <option value="science">Science</option>
                                        <option value="arts">Arts</option>
                                    </select>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>
                            </div>    
                            <div className="row mb-2">
                            <div className="col-sm-12">
                                    <input type="submit" className="btn btn-warning" value="Next" required/>
                                </div>
                            </div>
                            
                        </fieldset> 
                    </form>
                    
            </div>
                )
            }

            {
                (submitnew) && (
                    <div className="pt-5 pb-5 container mt-5 admissionform admissiontype">
                        <form className=" admission needs-validation" onSubmit={handlesubmitnew} >
                        <legend className="mb-4" ><span id="legendtext">CARRIER PROGRESS</span></legend>
                            <div className="row mb-3">
                                <div className="col-lg-3">
                                    <div className="mb-2">
                                        <label>HSC Year of Completion <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="number"  max={new Date().getFullYear()} min={new Date().getFullYear() - 9 } className="form-control" placeholder="Enter Passing Year" required/>
                                </div>
                                <div className="col-lg-3">
                                    <div className="mb-2">
                                            <label>HSC Total Marks <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="number" min={0} className="form-control" name="totalMark" placeholder="Enter total mark" onChange={onChangeTotal} required></input>
                                </div>
                                <div className="col-lg-3">
                                    <div className="mb-2">
                                        <label>HSC Obtain Mark <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="number" min={0} /* max={document.getElementsByName('totalMark')} */ className="form-control" name="obtainMark" placeholder="Enter Obtain Mark" onChange={onChangeObtain} required></input>
                                </div>
                                <div className="col-lg-3">
                                    <div className="mb-2">
                                            <label>HSC percentage<span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="number"  className="form-control" name="hscPercentage"  style={{backgroundColor:'#EEEEEE'}}  value={hscpct} id='hscpctid' onChange={handlechange} disabled></input>
                                </div>
                            </div>
                        <div className="mb-3 pt-4" id="contectbtn">
                            <input type="submit" className="btn btn-warning" value="Next" />
                        </div>
                    </form>
                </div>
                )
            }

            {
                (submitnewdetais) &&  (
                    <div className="pt-5 pb-5 container mt-5 admissionform admissiontype">
                        <form className=" admission needs-validation" onSubmit={handleSubmitData} id="mainform">
                        <legend className="mb-4" ><span id="legendtext">BASIC DETAILS</span></legend>
                            <div className="row mb-3">
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label>Full name <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="text" className="form-control" name="name" placeholder="Enter Name" onChange={handlechange} required></input>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                            <label>Email <span style={{color:'red'}}>*</span></label>
                                    </div>
                                        <input type="email" className="form-control" name="email" placeholder="Enter Email" onChange={handlechange} required></input>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-6">
                                    <div className="mb-2 ">
                                        <label>Collage name <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="text" className="form-control" name="collageName" placeholder="Enter Collage Name" onChange={handlechange} required></input>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label>Phone <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="mobile" className="form-control" name="phoneNo" placeholder="Enter Phone" onChange={handlechange} required></input>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-6">
                                    <div className="mb-2 ">
                                        <label>Current sem <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="number" max={8} min={1} className="form-control" name="currentSem" placeholder="Enter sem" onChange={handlechange} required></input>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label>Course Name <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="text" className="form-control" name="course" placeholder="Enter Course" onChange={handlechange} required></input>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-6">
                                    <div className="mb-2 ">
                                        <label>District <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="text"  className="form-control" name="district" placeholder="Enter Your District" onChange={handlechange} required></input>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label>Taluko <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="text" className="form-control" name="taluko" placeholder="Enter Taluko" onChange={handlechange} required></input>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-6">
                                    <div className="mb-2 ">
                                        <label>Village <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="text"  className="form-control" name="village" placeholder="Enter Your Village" onChange={handlechange} required></input>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label>Address <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="text" className="form-control" name="address" placeholder="Enter Your Adress" onChange={handlechange} required></input>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-6">
                                    <div className="mb-2 ">
                                        <label>Upload Adharcard <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="file"  className="form-control" name="adharCard" id="im1" required></input>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label>Upload HSC Result <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="file"  className="form-control" name="hscResult" id="im2"  required ></input>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-6">
                                    <div className="mb-2 ">
                                        <label>Upload Passport Size Photo<span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="file"  className="form-control" name="passportPhoto" id="im4" required></input>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2 ">
                                        <label>Upload Collage fee recipt <span style={{color:'red'}}>*</span></label>
                                    </div>
                                    <input type="file"  className="form-control" name="collageFeeRecipt" id="im3" required></input>
                                </div>
                            </div>
        
                            <div className="mb-3 pt-4" id="contectbtn">
                                <input type="submit" className="btn btn-danger"/>
                                <input type="reset" className="btn btn-warning" placeholder="Reset"/>
                            </div>
                            </form>
                    </div>
                )
            }
        </>
    )
    
}
export default Admission;
