// This is Content File
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [status, setStatus] = useState({});

    const isLoggedin = () => {

        if (localStorage.getItem('email') === null) {
            navigate('/');
        }

    }

    const fetchallcart = async () => {

        await fetch('http://localhost:5000/api/cart/fetchAllCarts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then((data) => setJobs(data))
    }


    //const [ApplyButtonColor, SetApplyButtonColor] = useState("btn-primary");
    // const [ApplyButttonText, SetApplyButtonText] = useState("Apply Now");
    const [jobid, SetJobId] = useState("");

    const ApplyJobs = async (id) => {


        await fetch(`http://localhost:5000/api/application/applyjob/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setTimeout(() => { SetJobId(id) }, 1500);

        //console.log(jobid);
    }


    const checkStatus = async () => {

        const response = await fetch(`http://localhost:5000/api/application/FindStatus`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        setStatus(json);
    }

    const DeleteCart = async (id, jobid) => {

        const response = await fetch(`http://localhost:5000/api/cart/deleteCart/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setTimeout(() => { SetJobId(jobid) }, 500);

    }
    useEffect(() => {
        isLoggedin();
        checkStatus();
        fetchallcart();
    }, [jobid])

    return (
        <div className="container">

            <h1 className="text-center mt-5" Style="overflow-y: hidden;">Featured Jobs</h1>

            <link rel="Stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css" integrity="sha256-3sPp8BkKUE7QyPSl6VfBByBroQbKxKG7tsusY2mhbVY=" crossorigin="anonymous" />

            <div className="container">
                <div className="row">
                    <div className="col-lg-10 mx-auto mb-4">
                        <div className="section-title text-center ">
                            <h3 className="top-c-sep" Style="overflow-y: hidden;">Grow your career with us</h3>
                            {/* <p>Lorem ipsum dolor sit detudzdae amet, rcquisc adipiscing elit. Aenean socada commodo ligaui egets dolor. Nullam quis ante tiam sit ame orci eget erovtiu faucid.</p> */}
                        </div>
                    </div>
                </div>

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
                                        {jobs.map(cart => (
                                            <>

                                                <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
                                                    <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                                                        {/* <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                                                FD
                                                            </div> */}
                                                        <div className="job-content">
                                                            <h5 className="text-left" Style="overflow:hidden;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cart.title}</h5>
                                                            <ul className="">
                                                                <li className="mr-md-4">
                                                                    <b>Discription: </b> {cart.description}
                                                                </li>
                                                                <li className="mr-md-4">
                                                                    <i className=""></i>
                                                                    <b>Salary: </b>{cart.salary} &#8377;
                                                                </li>
                                                                <li className="mr-md-4">
                                                                    <i className=""></i>
                                                                    <b>Job Type: </b>{cart.jobType}
                                                                </li>
                                                                <li className="mr-md-4">
                                                                    <i className=""></i>
                                                                    <b>Skills: </b>{cart.skills}
                                                                </li>
                                                                <li className="mr-md-4">
                                                                    <i className=""></i>
                                                                    <b>Duration: </b>{cart.duration}
                                                                </li>

                                                                {/* <li className="mr-md-4">
                                                                    <i className=""></i>
                                                                    <b>Deadline: </b>{job.deadline}
                                                                </li> */}

                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className="job-right my-4 flex-shrink-0" Style="position:relative; right:0px; top:90px;">

                                                        {(
                                                            () => {
                                                                if (cart.jobid in status) {
                                                                    //console.log(status);
                                                                    return (<>
                                                                        {
                                                                            status[cart.jobid] === "Rejected" ?
                                                                                (<b className="job-right my-4 flex-shrink-0 text-danger">{status[cart.jobid]}</b>)
                                                                                : (<b className="job-right my-4 flex-shrink-0 text-success">{status[cart.jobid]}</b>)
                                                                        }
                                                                        {/* <b className="job-right my-4 flex-shrink-0 text-success">{status[cart.jobid]}</b> */}
                                                                        <button class="btn btn-primary fa fa-trash-o mx-5" aria-hidden="true" onClick={() => { DeleteCart(cart._id, cart.jobid) }}></button>
                                                                    </>)
                                                                }
                                                                else {
                                                                    return (
                                                                        <>

                                                                            <button className='btn btn-primary d-sm-inline-block' onClick={() => { ApplyJobs(cart.jobid) }}>Apply Now</button>
                                                                            <button class="btn btn-primary fa fa-trash-o mx-5" aria-hidden="true" onClick={() => { DeleteCart(cart._id, cart.jobid) }}></button>
                                                                        </>)
                                                                }
                                                            }
                                                        )()}
                                                    </div>

                                                    {/* <div className="job-right my-4 flex-shrink-0" Style="position:relative; right:0px; top:120px;">
                                                        <button className={`btn d-block w-100 d-sm-inline-block ${ApplyButtonColor}`} onClick={() => { ApplyJobs(job._id) }}>
                                                            {(
                                                                () => {
                                                                    
                                                                }
                                                            )()}
                                                        </button>
                                                    </div> */}
                                                </div>

                                            </>
                                        ))}
                                    </ul>

                                )}


                            </div>
                        </div>


                        <nav aria-label="Page navigation">
                            <ul className="pagination pagination-reset justify-content-center">
                                <li className="page-item disabled">
                                    <a className="page-link" href="/" tabindex="-1" aria-disabled="true">
                                        <i className="zmdi zmdi-long-arrow-left"></i>
                                    </a>
                                </li>
                                <li className="page-item"><a className="page-link" href="/">1</a></li>
                                <li className="page-item d-none d-md-inline-block"><a className="page-link" href="/">2</a></li>
                                <li className="page-item d-none d-md-inline-block"><a className="page-link" href="/">3</a></li>
                                <li className="page-item"><a className="page-link" href="/">...</a></li>
                                <li className="page-item"><a className="page-link" href="/">8</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="/">
                                        <i className="zmdi zmdi-long-arrow-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>

            </div>
        </div>
    )
}
