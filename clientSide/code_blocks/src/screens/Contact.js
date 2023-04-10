import React from 'react'
import { useState , useEffect } from 'react';
import NavigationBar from '../components/Navbar'
import Footer from '../components/Footer'
import heroBanner from '../images/issue.jpg';
import  '../styles/home.css';
import  '../styles/issue.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Contact = () => {

    let [contactDetails , setContactDetails] = useState({name:"",email :"", message:""});

    const showToastMessage = (name) => {
        toast.success(`We will contact you soon ${name}!`, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    // useEffect(() => {
    //     console.log('certificateDetails has been updated:', contactDetails);
    //   }, [contactDetails]);

    const inputChange = async (e) => {
        e.preventDefault();
        await setContactDetails({...contactDetails , [e.target.name] : e.target.value});
    }

    const submitForm = (e) => {
        e.preventDefault();
        const data = {contactDetails : contactDetails};
        fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(data)
        }).then(response => response.json().then(data => { 
            console.log(data);
            showToastMessage(data.name);
            setContactDetails({name:"",email :"", message:""});
        }));
    }



    return (
        <div>

            <NavigationBar />
            <ToastContainer/>
            <div className=' row d-flex align-items-center justify-content-center m-0 p-0  mainComponent' style={{ minHeight: "70vh" }}>
                <div className='col-sm-12 col-md-5 col-lg-5   p-4 '>
                     {/* <div className='col col-5 m-0  p-4 '> */}
                    <div className=' fs-1 my-4'>
                        <h1 style={{fontSize:'4rem'}} >Contact Us</h1>
                    </div>


                     {/* Issue Form */}
                    <form className='fs-5 validateString w-100 p-0 '>
                        
                                
                                
                                <div class="row g-3 align-items-center justify-content-center">
                                    <div class="col-sm-12 col-md-6 col-lg-5 Issuelabel">
                                        <label for="inputName" class="col-form-label"> Name: </label>
                                    </div>
                                    <div class="col-sm-7 col-md-6 col-lg-7 col-auto d-flex justify-content-center align-items-center">
                                        <input type="text" id="inputName" name = "name" value = {contactDetails.name} onChange = {inputChange} class="form-control" />
                                    </div>
                                </div>

                                <div class="row g-3 align-items-center justify-content-center">
                                    <div class="col-sm-12 col-md-6 col-lg-5 Issuelabel">
                                        <label for="inputMail" class="col-form-label">Email: </label>
                                    </div>
                                    <div class="col-sm-7 col-md-6 col-lg-7 col-auto d-flex justify-content-center align-items-center">
                                        <input type="mail" id="inputMail" class="form-control" name = "email" value = {contactDetails.email} onChange = {inputChange}/>
                                    </div>
                                </div>

                                <div class="row g-3 align-items-center justify-content-center">
                                    <div class="col-sm-12 col-md-6 col-lg-5 Issuelabel">
                                        <label for="inputMessage" class="col-form-label">Message: </label>
                                    </div>
                                    <div class="col-sm-7 col-md-6 col-lg-7 col-auto d-flex justify-content-center align-items-center">
                                        <textarea type="textarea" id="inputMessage" class="form-control" name = "message" value = {contactDetails.message} onChange = {inputChange}/>
                                    </div>
                                </div>

                                <div class="row align-items-center justify-content-center my-4">
                                    <button type="submit" className=" col-sm-10 col-md-4 col-lg-4 btn btn-dark m-2  " onClick={submitForm}>Submit</button>
                                </div>
                    </form>
                </div>

                <div className='col col-5 heroBanner '>
                    {/* animated svg here */}
                    <img src={heroBanner} style={{width:'50vw' ,margin:"0 25% 0 0"}} />
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Contact