import React, { useState } from 'react'
import Footer from '../components/Footer'
import NavigationBar from '../components/Navbar'
import avatar from '../images/avatar.jpg'
import certificate from '../images/certificate.jpg'
import { GlobalUserContext } from './AuthContext';
import { useContext, useEffect} from 'react';
import CertificateCard from '../components/CertificateCard';

export const Account = () => {
    const [globalUser, setGlobalUser] = useContext(GlobalUserContext);
    // console.log("user: ",globalUser.userId);
    const [myCertificates,setMyCertificates] = useState([]);
    const [issuedCertificates, setIssuedCertificates] = useState([]);

    // console.log("User: ",globalUser);
    useEffect(()=>{
        async function fetchData() {
            try {
                const data = {address : globalUser.userId};
                await fetch('http://localhost:5000/api/retriveCertificates', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    // We convert the React state to JSON and send it as the POST body
                    body: JSON.stringify(data)
                }).then(response => response.json().then(data => { 
                    // console.log(data);
                    setIssuedCertificates(data.Certificates.issuedDocs);
                    setMyCertificates(data.Certificates.myCertificates);
                    // console.log("issued: ",issuedCertificates);
                }));
            } catch (error) {
              console.log(error);
            }
          }
          if(globalUser.loggedIn)
          fetchData();
    },[globalUser]);

    return (
        <div>
            <NavigationBar />
            <div className='fs-1'>
                <div className='row align-items-center justify-content-center m-2'>
                    <div className='col-sm-auto col-md-auto d-flex align-items-center justify-content-center'>
                        <img src={avatar} style={{ width: "calc(10vw + 8vh)" }} className='rounded-circle' />
                    </div>

                    <div className='col-sm-auto col-md-4 m-4'>
                        <div className="card">

                            <div className="card-body">
                                <h5 className="card-title">MetaMask Address  </h5>
                                {/* <h6>{globalUser.userId}</h6> */}
                                <div href="#" className="btn btn-primary" onClick={() => navigator.clipboard.writeText(globalUser.userId)}>Copy Address</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='m-4 p-4 '>
                    <div className="card m-auto">
                        <div className="card-header">
                            My Certificates
                        </div>
                        <div className='row m-auto ' >
                    {
                        myCertificates.length > 0 ?
                        myCertificates.map((certificate) => (
                            <div key={certificate._id}>
                            <CertificateCard certificate={certificate.certName} student={certificate.studentName} docId={certificate.certificateHash}/>
                          </div>
                        )):
                        <h1>Don't Have Any Certificates !</h1>
                    }
                        
                    </div>

                        


                    </div>
                </div>
                <div className='m-4 p-4 '>
                <div className="card m-auto">
                    <div className="card-header">
                        Issued Certificates
                    </div>
                    <div className='row m-auto ' >
                    {
                        issuedCertificates.length > 0 ?
                        issuedCertificates.map((certificate) => (
                            <div key={certificate._id}>
                            <CertificateCard certificate={certificate.certName} student={certificate.studentName} docId={certificate.certificateHash}/>
                          </div>
                        )) :
                        <h1>Don't Have Any Certificates !</h1>
                    }
                        
                    </div>


                </div>
            </div>


            </div>
                     

            <Footer />
        </div>
    )
}
