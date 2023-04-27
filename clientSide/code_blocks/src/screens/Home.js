import React, { useState } from 'react'
import NavigationBar from '../components/Navbar'
import Footer from '../components/Footer'
import heroBanner from '../images/hero.jpg';
import '../styles/home.css'
import blockChain from '../images/on_chain.jpg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import success from '../images/success.svg';
import danger from '../images/danger.svg';

const Home = () => {

    let [certificateHash, setCertificateHash] = useState("");
    let [certificateData, setCertificateData] = useState();
    let [showModel, setShowModel] = useState(false);

    const handleClose = () => setShowModel(false);
    const inputChange = (e) => {
        e.preventDefault();
        setCertificateHash(e.target.value);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const data = { certificateHash: certificateHash };
        await fetch('http://localhost:5000/api/certificateValidator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(data)
        }).then(response => response.json().then(data => {
            console.log(data);
            setCertificateData(data);
        }));

        setCertificateHash("");
        setShowModel(true);
    }





    return (
        <div>

            <NavigationBar />
            <div className=' row d-flex align-items-center justify-content-center m-0 p-0  mainComponent' style={{ minHeight: "100vh" }}>
                <div className='col-sm-12 col-md-5 col-lg-5 m-0  p-4 '>
                    {/* <div className='col col-5 m-0  p-4 '> */}
                    <div className=' fs-1 '>
                        <h1 style={{ fontSize: '4rem' }} >Validate <br />Certificate</h1>
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
                                <input type="text" className="form-control border-0 fs-4" id="HashStringInput" placeholder="Enter Hash" value={certificateHash} onChange={inputChange} />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>

                            <button type="submit" className=" col-sm-10 col-md-4 fs-5 col-lg-4 btn btn-dark " onClick={submitForm}>Validate</button>
                        </div>
                    </form>
                </div>

                <div className='col col-5 heroBanner '>
                    {/* animated svg here */}
                    <img src={heroBanner} style={{ width: '50vw', margin: "0 25% 0 0" }} />
                </div>

            </div>
            <div className='d-flex flex-column align-items-center whyBlockDocs ' style={{ position: 'relative' }}>
                <div className=' m-4 fs-1 ' >
                    <h1 style={{ fontSize: '4rem' }} >Why BlockDocs ?</h1>

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
                <img src={blockChain} style={{ width: '90vw' }} />
            </div>
            <div className='d-flex flex-column align-items-center issueBlockDocs' style={{ position: 'relative', top: '-65vh', marginBottom: '-60vh' }}>
                <div className=' m-4 fs-1 ' >
                    <h1 style={{ fontSize: '4rem' }} >Want To Issue Certificates ?</h1>

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
                {showModel && (
                    <div
                        className="modal show"
                        style={{ display: 'block', position: 'initial' }}
                    >
                        <Modal show={showModel} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Validation Result</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {certificateData.success ? (
                                     <Card style={{ width: 'auto',display:'flex',alignItems:'center',padding:'0'}}>
                                     <Card.Img variant="top" src={success} style={{width:"14rem" }}/>
                                     <Card.Body>
                                       <Card.Title>Validation Successful !</Card.Title>
                                       <Card.Text>
                                         Certificate authenticated successfully.
                                       </Card.Text>
                                     </Card.Body>
                                     <ListGroup className="list-group-flush" style={{ width: 'auto',display:'flex',alignItems:'start',margin:0,padding:'0'}}>
                                    <ListGroup.Item>Student ID: {certificateData.certificateDetails.studentId}</ListGroup.Item>
                                      <ListGroup.Item>Student: {certificateData.certificateDetails.studentName}</ListGroup.Item>
                                      <ListGroup.Item>Certificate : {certificateData.certificateDetails.certName}</ListGroup.Item>
                                      <ListGroup.Item>Issued On : {certificateData.certificateDetails.issueDate}</ListGroup.Item>
                                      
                                    </ListGroup>
                                  
                                   </Card>
                                ) : (
                                    <Card style={{ width: 'auto',display:'flex',alignItems:'center',padding:'0'}}>
                                    <Card.Img variant="top" src={danger} style={{width:"15rem"}}/>
                                    <Card.Body>
                                      <Card.Title>Validation Failed !</Card.Title>
                                      <Card.Text>
                                        Certificate does not exists in the database.
                                      </Card.Text>
                                    </Card.Body>
                                   
                                  </Card>
                                )}
                               
                                </Modal.Body>
                            {/* <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer> */}
                        </Modal>
                    </div>)}

                <Footer />
            </div>
        </div>
    )
}

export default Home