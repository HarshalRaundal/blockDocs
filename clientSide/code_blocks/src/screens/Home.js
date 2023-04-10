import React, { useState } from 'react'
import NavigationBar from '../components/Navbar'
import Footer from '../components/Footer'
import heroBanner from '../images/hero.jpg';
import  '../styles/home.css'
import blockChain from '../images/on_chain.jpg';


const Home = () => {

    let [certificateHash ,setCertificateHash]= useState("");

    const inputChange = (e) => {
        e.preventDefault();
        setCertificateHash(e.target.value);
    }

    const submitForm = (e) => {
        e.preventDefault();
        const data = {certificateHash : certificateHash,message:"this is custom message"};
        fetch('http://localhost:5000/api/certificateValidator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(data)
        }).then(response => response.json().then(data => { 
            console.log(data);
        }));
    }
    
    return (
        <div>

            <NavigationBar />
            <div className=' row d-flex align-items-center justify-content-center m-0 p-0  mainComponent' style={{ minHeight: "100vh" }}>
                <div className='col-sm-12 col-md-5 col-lg-5 m-0  p-4 '>
                {/* <div className='col col-5 m-0  p-4 '> */}
                    <div className=' fs-1 '>
                        <h1 style={{fontSize:'4rem'}} >Validate <br/>Certificate</h1>
                    </div>

                    <div className='fs-5 lh-lg homeInfo'>Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>

                     {/* Contact Form */}
                    <form className='fs-4 validateString w-100  m-0 p-0 '>
                        <div className=' row m-4  ' > 

                            <div className=" col-sm-10 col-md-8  col-lg-8 form-group  border border-1 border-dark rounded">
                                {/* <label for="HashStringInput" className='m-1'>Enter Hash of Certificate</label> */}
                                <input type="text" className="form-control border-0 fs-4" id="HashStringInput"  placeholder="Enter Hash" value = {certificateHash} onChange = {inputChange}/>
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            
                            <button type="submit" className=" col-sm-10 col-md-4 fs-5 col-lg-4 btn btn-dark " onClick = {submitForm}>Validate</button>
                        </div>
                    </form>
                </div>

                <div className='col col-5 heroBanner '>
                    {/* animated svg here */}
                    <img src={heroBanner} style={{width:'50vw' ,margin:"0 25% 0 0"}} />
                </div>

            </div>
            <div className='d-flex flex-column align-items-center whyBlockDocs ' style={{position:'relative'}}>
                <div className=' m-4 fs-1 ' >
                        <h1 style={{fontSize:'4rem'}} >Why BlockDocs ?</h1>
                        
                </div>
                    
                    <div className='fs-4 text-center lh-lg w-50 '>Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>

                    <div className=' fs-3 m-4 btn btn-dark'>
                        Learn More
                    </div>

                   
            </div>
                    <div className='blockChain text-center' >
                        <img src={blockChain} style={{width:'90vw'}}/>
                    </div>
                    <div className='d-flex flex-column align-items-center issueBlockDocs' style={{position:'relative',top:'-65vh',marginBottom:'-60vh'}}>
                <div className=' m-4 fs-1 ' >
                        <h1 style={{fontSize:'4rem'}} >Want To Issue Certificates ?</h1>
                        
                </div>
                    
                    <div className='fs-4 text-center lh-lg w-50 '>Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>

                    <div className=' fs-3 m-4 btn btn-dark'>
                        Issue Certificate
                    </div>
                   
            </div>
                  
            <div>

            <Footer />
            </div>
        </div>
    )
}

export default Home