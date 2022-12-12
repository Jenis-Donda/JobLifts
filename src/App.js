// import { useState } from 'react';
import './App.css';
import './index.css';
import './style.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signin from './components/Signin';
import Signup from './components/signup';

import Profile from './components/Profile';
import Cart from './components/Cart';
import RecruiterProfile from './components/RecruiterProfile';
import AddJob from './components/AddJob';
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Jobs from './components/Jobs';
import Content from './components/Content';


function App() {
  // const [mode, setDarkMode] = useState('light');

  // const [userType, setuserType] = useState(localStorage.getItem('userType'));
  // console.log(userType);


  return (
    <>


      <BrowserRouter>

        {
          localStorage.getItem('email') !== null? (<Navbar title="JobLifts" />) : (<p></p>)
        }

        
        <Routes>


          <Route exact path="/home" element={<Content />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path='/' element={<Signin />} />

          <Route path='/addnewjob' element= {<AddJob />}/>
          <Route path='/fetchjobs' element={<Jobs />} />
          {localStorage.getItem('userType') === "Applicant" && <Route path="/profile" element={<Profile />} />}
          {localStorage.getItem('userType') === "Recruiter" && <Route path='/profile' element={<RecruiterProfile />} />}
          {/* <Route path='/profile' element={localStorage.getItem('userType') === 'Applicant' ? <Profile /> : <RecruiterProfile />} /> */}

          <Route path='/cart' element={<Cart />} />
        </Routes>

      </BrowserRouter>


      <Footer />
    </>
  );
}

export default App;
