import React from 'react'
import NavigationBar from '../components/Navbar'
import Footer from '../components/Footer'
import heroBanner from '../images/issue.jpg';
import  '../styles/home.css';
import { useState,useEffect ,useContext} from 'react';
import  '../styles/issue.css';
import { GlobalUserContext } from './AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Issue = () => {

    let [certificateDetails , setCertificateDetails] = useState({id:"",name:"",issueDate :"", metaId:"",verifier:"",certName:""});

    const [globalUser , setGlobalUser] = useContext(GlobalUserContext);
    
    const showToastMessage = () => {
        toast.success('Successfully Issued certificate !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    // useEffect(() => {
    //     console.log('certificateDetails has been updated:', certificateDetails);
    //   }, [certificateDetails]);

    const inputChange = async (e) => {
        e.preventDefault();
        await setCertificateDetails({...certificateDetails , [e.target.name] : e.target.value});
    }

    const submitForm = (e) => {
        e.preventDefault();
        const data = {certificateDetails : {...certificateDetails,issuerId:globalUser.userId}};
        fetch('http://localhost:5000/api/certificateIssuer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(data)
        }).then(response => response.json().then(data => { 
            console.log(data);
            setCertificateDetails({id:"",name:"",issueDate :"", metaId:"",verifier:"",certName:""});
            showToastMessage();
        }));
    }

    return (
        <div>

            <NavigationBar />
            <div className=' row d-flex align-items-center justify-content-center m-0 p-0  mainComponent' style={{ minHeight: "70vh" }}>
                <div className='col-sm-12 col-md-5 col-lg-5   p-4 '>
                     {/* <div className='col col-5 m-0  p-4 '> */}
                    <div className=' fs-1 my-4'>
                        <h1 style={{fontSize:'4rem'}} >Issue Certificate</h1>
                    </div>


                     {/* Issue Form */}
                    <form className='fs-5 validateString w-100 p-0 '>
                        
                                <div class="row g-3 align-items-center justify-content-center ">
                                    <div class="col-sm-12 col-md-6 col-lg-5  Issuelabel">
                                        <label for="inputID" class="col-form-label"  >Student ID: </label>
                                    </div>
                                    <div class="col-sm-7 col-md-6 col-lg-7 col-auto d-flex justify-content-center align-items-center">
                                        <input type="text" id="inputID" name = "id" class="form-control" value = {certificateDetails.id} onChange={inputChange}/>
                                    </div>
                                    
                                </div>  
                                
                                <div class="row g-3 align-items-center justify-content-center">
                                    <div class="col-sm-12 col-md-6 col-lg-5 Issuelabel">
                                        <label for="inputName" class="col-form-label">Student Name: </label>
                                    </div>
                                    <div class="col-sm-7 col-md-6 col-lg-7 col-auto d-flex justify-content-center align-items-center">
                                        <input type="text" id="inputName" name="name" value = {certificateDetails.name} onChange={inputChange} class="form-control" />
                                    </div>
                                </div>
                                <div class="row g-3 align-items-center justify-content-center">
                                    <div class="col-sm-12 col-md-6 col-lg-5 Issuelabel">
                                        <label for="certName" class="col-form-label">Certificate Name: </label>
                                    </div>
                                    <div class="col-sm-7 col-md-6 col-lg-7 col-auto d-flex justify-content-center align-items-center">
                                        <input type="text" id="certName" name="certName" value = {certificateDetails.certName} onChange={inputChange} class="form-control" />
                                    </div>
                                </div>

                                <div class="row g-3 align-items-center justify-content-center">
                                    <div class="col-sm-12 col-md-6 col-lg-5 Issuelabel">
                                        <label for="inputDate" class="col-form-label" >Issue Date: </label>
                                    </div>
                                    <div class="col-sm-7 col-md-6 col-lg-7 col-auto d-flex justify-content-center align-items-center">
                                        <input type="date" id="inputDate" class="form-control" name="issueDate" value = {certificateDetails.issueDate} onChange={inputChange} />
                                    </div>
                                </div>

                                <div class="row g-3 align-items-center justify-content-center">
                                    <div class="col-sm-12 col-md-6 col-lg-5 Issuelabel">
                                        <label for="inputMeta" class="col-form-label" >Metamask ID: </label>
                                    </div>
                                    <div class="col-sm-7 col-md-6 col-lg-7 col-auto d-flex justify-content-center align-items-center">
                                        <input type="text" id="inputMeta" class="form-control" name="metaId" value = {certificateDetails.metaId} onChange={inputChange} />
                                    </div>
                                </div>


                                <div class="row g-3 align-items-center justify-content-center">
                                    <div class="col-sm-12 col-md-6 col-lg-5 Issuelabel">
                                        <label for="verifierMeta" class="col-form-label" >Verifier Metamask ID: </label>
                                    </div>
                                    <div class="col-sm-7 col-md-6 col-lg-7 col-auto d-flex justify-content-center align-items-center">
                                        <input type="text" id="verifierMeta" class="form-control" name="verifier" value = {certificateDetails.verifier} onChange={inputChange} />
                                    </div>
                                </div>

                                <div class="row align-items-center justify-content-center my-4">
                                    <button type="submit" className=" col-sm-10 col-md-4 col-lg-4 btn btn-dark m-2  " onClick={submitForm}>Issue</button>
                                </div>

                    </form>
                </div>

                <ToastContainer/>

                <div className='col col-5 heroBanner '>
                    {/* animated svg here */}
                    <img src={heroBanner} style={{width:'50vw' ,margin:"0 25% 0 0"}} />
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Issue