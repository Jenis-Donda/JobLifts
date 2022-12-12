import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

export default function Signup() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({name: "", email: "", password : "", confirm_password : "", dob : "", about: "", type: ""})
    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(document.getElementById('type').value);
        // setCredentials({type: document.getElementById('type').value})

        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },

            body: JSON.stringify({name : credentials.name, email: credentials.email, password: credentials.password, confirm_password: credentials.confirm_password, dob: credentials.dob, about: credentials.about, type: document.getElementById('type').value})
            // body: JSON.stringify({email: credentials.email, password:credentials.password})

        });

        const json = await response.json();
        // console.log(json);
        // console.log(credentials.type);

         localStorage.setItem('token', json.success);
        localStorage.setItem('userType', json.userType);
        localStorage.setItem('email', json.email);

        if(json.success){
            navigate("/home");  
        }
        else{
            // alert("You are Not Registered");
            alert(json.error);
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <>
       <div className="container-fluid h-custom my-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        {/* <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="" />
                        </div> */}
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form method='POST' onSubmit={handleSubmit}>
              
                                <h2 className='text-center' Style="overflow:hidden;">Register Yourself</h2>

                                {/* <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div> */}
                                 <div className="form-outline mb-4 mt-3">
                                    <input type="name" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Enter a Name" onChange={onChange} name='name'/>
                                    {/* <label className="form-label" htmlFor="form3Example3">Email address</label> */}
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" onChange={onChange} name='email'/>
                                    {/* <label className="form-label" htmlFor="form3Example3">Email address</label> */}
                                </div>


                                <div className="form-outline mb-3">
                                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter password" onChange={onChange} name='password'/>
                                    {/* <label className="form-label" htmlFor="form3Example4">Password</label> */}
                                </div>

                                <div className="form-outline mb-3">
                                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter Confirm password" onChange={onChange} name='confirm_password'/>
                                    {/* <label className="form-label" htmlFor="form3Example4">Password</label> */}
                                </div>
                                <div className="form-outline mb-3">
                                    <input type="date" id="form3Example4" className="form-control form-control-lg"
                                        onChange={onChange} name='dob'/>
                                    {/* <label className="form-label" htmlFor="form3Example4">Password</label> */}
                                </div>
                                <div className="form-outline mb-3">
                                    <textarea id="form3Example4" className="form-control form-control-lg"
                                        placeholder="About Yourself" onChange={onChange} name='about'/>
                                    {/* <label className="form-label" htmlFor="form3Example4">Password</label> */}
                                </div>

                                <div className="form-outline mb-3">
                                    <select name="type" id="type" className="form-control form-control-lg">
                                        <option value="Recruiter">Recruiter</option>
                                        <option value="Applicant">Applicant</option>
                                    </select>
                                    <small className="form-label" htmlFor="form3Example4">Are You Applicant or Recruiter?</small>
                                </div>

                                {/* <div className="d-flex justify-content-between align-items-center">

                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    
                                </div> */}

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg"
                                        Style="padding-left: 2.5rem; padding-right: 2.5rem;">Register</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <NavLink to="/"
                                        className="link-danger">Sign in</NavLink></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
    </>
  )
}
