
import React, { useState } from 'react'
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


export default function Jobs() {
    const navigate = useNavigate();

    const isLoggedin = () => {

        if (localStorage.getItem('email') === null) {
            navigate('/');
        }

    }

    const [jobs, setJobs] = useState([]);
    const fetchalljobs = async () => {
        await fetch('http://localhost:5000/api/jobs/fetchjobs', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setJobs(data))


        // const json = await response.json();
        // // setJobs(json);
        // console.log(json);
    }

    const verifyUser = () => {

        if (localStorage.getItem('userType') === 'Applicant') {
            navigate("/");
        }
    }

    useEffect(() => {
        isLoggedin();
        verifyUser();
        fetchalljobs();
    }, [])

    const deletejob = async (id) => {
        await fetch(`http://localhost:5000/api/jobs/deletejob/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            setTimeout(fetchalljobs, 2000);

        })
    }

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            {/* {jobs.length > 0 && (
                <ul>
                    {jobs.map(job => (
                        <>
                            <li>{job.title}</li>
                            <li>{job.description}</li>
                            <li>{job.salary}</li>
                            <li>{job.jobType}</li>
                            <li>{job.skills}</li>
                            <li>{job.duration}</li>
                            <li>{job.deadline}</li>
                            <li>{job.applicants}</li>
                            <li>{job.position}</li>
                            <br></br>
                            <br></br>
                        </>
                    ))}
                </ul>
            )} */}
            <div className="container">

                <div className="row">
                    <h1 className="text-center mt-5" Style="overflow-y: hidden;">Posted Jobs</h1>
                    <NavLink to="/addnewjob" className='btn btn-primary mt-5' Style="display:inline-block;margin:auto;width:10%;">Add New Job</NavLink>
                </div>

                <link rel="Stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css" integrity="sha256-3sPp8BkKUE7QyPSl6VfBByBroQbKxKG7tsusY2mhbVY=" crossorigin="anonymous" />

                <div className="container">
                    {/* <div className="row">
                        <div className="col-lg-10 mx-auto mb-4">
                            <div className="section-title text-center ">
                                <h3 className="top-c-sep" Style="overflow-y: hidden;">Grow your career with us</h3>
                                <p>Lorem ipsum dolor sit detudzdae amet, rcquisc adipiscing elit. Aenean socada commodo ligaui egets dolor. Nullam quis ante tiam sit ame orci eget erovtiu faucid.</p>
                            </div>
                        </div>
                    </div> */}

                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <div className="career-search mb-60">

                                {/* <form action="#" className="career-form mb-60">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-3 my-3">
                                            <div className="input-group position-relative">
                                                <input type="text" className="form-control" placeholder="Enter Your Keywords" id="keywords" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-3 my-3">
                                            <div className="select-container">
                                                <select className="custom-select">
                                                    <option selected="">Location</option>
                                                    <option value="1" Style="color: black;">Jaipur</option>
                                                    <option value="2" Style="color: black;">Pune</option>
                                                    <option value="3" Style="color: black;">Bangalore</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-3 my-3">
                                            <div className="select-container">
                                                <select className="custom-select">
                                                    <option selected="">Select Job Type</option>
                                                    <option value="1" Style="color: black;">Ui designer</option>
                                                    <option value="2" Style="color: black;">JS developer</option>
                                                    <option value="3" Style="color: black;">Web developer</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-3 my-3">
                                            <button type="button" className="btn btn-lg btn-block btn-light btn-custom" id="contact-submit">
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </form> */}

                                <div className="filter-result">
                                    {/* <p className="mb-30 ff-montserrat">Total Job Openings : 89</p> */}

                                    {jobs.length > 0 && (
                                        <ul>
                                            {jobs.map(job => (
                                                <>

                                                    <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
                                                        <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                                                            {/* <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                                                FD
                                                            </div> */}
                                                            <div className="job-content">
                                                                <h5 className="text-left" Style="overflow:hidden;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{job.title}</h5>
                                                                <ul className="">
                                                                    <li className="mr-md-4">
                                                                        <b>Discription: </b> {job.description}
                                                                    </li>
                                                                    <li className="mr-md-4">
                                                                        <i className=""></i>
                                                                        <b>Salary: </b>{job.salary} &#8377;
                                                                    </li>
                                                                    <li className="mr-md-4">
                                                                        <i className=""></i>
                                                                        <b>Job Type: </b>{job.jobType}
                                                                    </li>
                                                                    <li className="mr-md-4">
                                                                        <i className=""></i>
                                                                        <b>Skills: </b>{job.skills}
                                                                    </li>
                                                                    <li className="mr-md-4">
                                                                        <i className=""></i>
                                                                        <b>Duration: </b>{job.duration}
                                                                    </li>
                                                                    <li className="mr-md-4">
                                                                        <i className=""></i>
                                                                        <b>Deadline: </b>{job.deadline}
                                                                    </li>
                                                                    <li className="mr-md-4">
                                                                        <i className=""></i>
                                                                        <b>Applicants: </b>{job.applicants}
                                                                    </li>
                                                                    <li className="mr-md-4">
                                                                        <i className=""></i>
                                                                        <b>Position: </b>{job.position}
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="job-right my-4 flex-shrink-0" Style="position:relative; right:0px; top:120px;">
                                                            <button className="btn d-block w-100 d-sm-inline-block btn-primary" onClick={() => { deletejob(job._id) }}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                </>

                                            ))}

                                        </ul>
                                    )}


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
