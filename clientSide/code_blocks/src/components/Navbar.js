import React, { useEffect } from 'react'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GlobalUserContext } from '../screens/AuthContext';
import {useContext} from 'react';
const NavigationBar = () => {
    const naviagte = useNavigate();
    const [globalUser , setGlobalUser] = useContext(GlobalUserContext);
    
    const handleSignOut = () => {
        localStorage.removeItem("authToken");
        setGlobalUser({userId:"",loggedIn:false});
        console.log("Logged Out");
        naviagte('/logIn');

    }

    useEffect(()=>{
        // check if sign in
        if(localStorage.getItem("authToken") !== null && globalUser.loggedIn === false){
            globalUser.userId = localStorage.getItem('userId');
            console.log( localStorage.getItem('userId'));
            globalUser.loggedIn = true;
        }
        // console.log("reset global user state: ",globalUser);
    },[]);

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="navbar-brand fs-3 fw-bold" to="/">Secure-Cert</Link>

        <div className="collapse fs-5 navbar-collapse justify-content-between " id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active d-flex">
                    <Link className="nav-link" to="/">Home </Link>
                    {/* <Link className="nav-link" to="/about">About </Link>
                    <Link className="nav-link" to="/">Features </Link> */}
                    {localStorage.getItem("authToken") !== null && (
                        <>
                    <Link className="nav-link" to="/issue">Issue </Link>
                    <Link className="nav-link" to="/account">Account </Link>
                    <Link className="nav-link" to="/contact">Contact </Link>
                        </>
                    )}
                    
                   
                </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 m-2">
                {localStorage.getItem("authToken") !== null ? 
                <div className="btn btn-outline-success my-2 my-sm-0 m-2" onClick={handleSignOut}>LogOut</div>:
            <Link className="btn btn-outline-success my-2 my-sm-0 m-2" to='/LogIn'>LogIn</Link>
        }

             
            </form>
        </div>


    </nav>
</>
  )
}

export default NavigationBar