import React from 'react'
import Footer from '../components/Footer'
import NavigationBar from '../components/Navbar'
import avatar from  '../images/avatar.jpg'
import certificate from  '../images/certificate.jpg'

export const Account = () => {
  return (
    <div>
        <NavigationBar/>
        <div className='fs-1'>
            <div className='row align-items-center justify-content-center m-2'>
                <div className='col-sm-auto col-md-auto d-flex align-items-center justify-content-center'> 
                    <img src={avatar} style={{width:"calc(10vw + 8vh)" } } className='rounded-circle' />
                </div>

                <div className='col-sm-auto col-md-4 m-4'> 
                <div className="card">
                   
                    <div className="card-body">
                        <h5 className="card-title">MetaMask Address </h5>
                        <a href="#" className="btn btn-primary">Copy Address</a>
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
                    <div className='col '  >
                              {/* CARD */}
                                <div className=" col card-body ">
                                    <div className="card m-auto" style={{width: "18rem"}}>
                                    
                                        <div className="card-body d-flex flex-column justify-content-center">
                                            <img src={certificate} class="card-img-top bg-dark" alt="..."/>
                                            <h5 className="card-title text-center">Certificate Name</h5>
                                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                            <a href="#" class="btn btn-primary">Copy Link</a>
                                        </div>
                                    </div>
                                </div>
                                {/* CARD */}
                    </div>

                    <div className='col '  >
                              {/* CARD */}
                                <div className=" col card-body ">
                                    <div className="card m-auto" style={{width: "18rem"}}>
                                    
                                        <div className="card-body d-flex flex-column justify-content-center">
                                            <img src={certificate} class="card-img-top bg-dark" alt="..."/>
                                            <h5 className="card-title text-center">Certificate Name</h5>
                                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                            <a href="#" class="btn btn-primary">Copy Link</a>
                                        </div>
                                    </div>
                                </div>
                                {/* CARD */}
                    </div>

                    <div className='col '  >
                              {/* CARD */}
                                <div className=" col card-body ">
                                    <div className="card m-auto" style={{width: "18rem"}}>
                                    
                                        <div className="card-body d-flex flex-column justify-content-center">
                                            <img src={certificate} class="card-img-top bg-dark" alt="..."/>
                                            <h5 className="card-title text-center">Certificate Name</h5>
                                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                            <a href="#" class="btn btn-primary">Copy Link</a>
                                        </div>
                                    </div>
                                </div>
                                {/* CARD */}
                    </div>
                  
                </div>


                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
