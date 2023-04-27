import React from 'react';
import certificate from '../images/certificate.jpg'
function CertificateCard(props) {
  return (
    <div className='col '  >
                                {/* CARD */}
                                <div className=" col card-body ">
                                    <div className="card m-auto" style={{ width: "18rem" }}>

                                        <div className="card-body d-flex flex-column justify-content-center">
                                            <img src={certificate} class="card-img-top bg-dark" alt="..." />
                                            <h5 className="card-title text-center">{props.student}</h5>
                                            <h5 className="card-title text-center">{props.certificate}</h5>
                                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                            <div href="#" className="btn btn-primary" onClick={() => navigator.clipboard.writeText(props.docId)}>Copy Address</div>
                                        </div>
                                    </div>
                                </div>
                                {/* CARD */}
                            </div>

  )
}

export default CertificateCard;