import React, { useContext, useState } from 'react'
import Footer from '../components/Footer'
import NavigationBar from '../components/Navbar'
import Web3 from "web3";
import { useNavigate } from 'react-router-dom';
import { GlobalUserContext } from './AuthContext';
const { ethereum } = window;


export const LogIn = () => {
    const naviagte = useNavigate();
    let isMetaMask = true;
    const [loginPressed, setLoginPressed] = useState(false);
    const [processTxt , setProcessTxt] = useState("Click LogIn to authenticate yourself ");
    const [globalUser , setGlobalUser] = useContext(GlobalUserContext);
    

    const  handleLogin = async () => {
        // step 1 - request nonce from backend
         setLoginPressed(true);
        
        if (!ethereum.isMetaMask) {
            isMetaMask = false;
            setLoginPressed(false);
            alert('install metamask and try again!');
            return;
        }

        try {

            setProcessTxt("select metamask account .");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            
            setProcessTxt("Initiating authentication process ... ");

            // get nonce from backend
            const nonce = await fetch('http://localhost:5000/api/getNonce',{
                method : 'POST',
                headers :{
                    'Content-Type' : 'application/json'
                },
                body :JSON.stringify({publicAddress : accounts[0]})
            }).then(response => {return response.json()});


            
            const web3 = new Web3(ethereum);
            
            setProcessTxt("Please sign to authenticate yourself ... ");
            const signature = await web3.eth.personal.sign(`signing using nounce : ${nonce.nonce}` , accounts[0])
            
            setProcessTxt("Verifiying signature ... ");
            const response = await fetch('http://localhost:5000/api/getSignature',{
                method : 'POST',
                headers :{
                    'Content-Type' : 'application/json'
                },
                body :JSON.stringify({publicAddress : accounts[0], signature:signature})
            }).then(response => {return response.json()});

            if(response.success) {
                setProcessTxt("Authentication Successful :) ");
                setLoginPressed(false);
                localStorage.setItem("authToken" , response.authToken);
                localStorage.setItem("userId" , accounts[0]);
                localStorage.setItem("loggedIn" , true);
                setGlobalUser({userId:accounts[0] , loggedIn:true})
                // console.log('account: ',accounts[0]);
                naviagte('/');
            }
            setProcessTxt("Click LogIn to authenticate yourself ");

            // console.log("TOKEN : ",localStorage.getItem("authToken"));

        } catch (error) {
            
            setLoginPressed(false);
            setProcessTxt("Click LogIn to authenticate yourself ");
            console.error(error);
            return;
        }

        setLoginPressed(false);
        // console.log("User : ",globalUser);

    }

    return (
        <div>
            <NavigationBar />
            <div className='fs-1 d-flex flex-column align-items-center justify-content-center p-2 text-center' style={{ minHeight: "70vh" }}>
                LogIn using metamask
                <div className='fs-5'>{processTxt}</div>

                <div >
                    {loginPressed ?
                        
                        <div className='btn btn-lg btn-dark m-3 disabled'>Processing</div>:
                        <div className='btn btn-lg btn-dark m-3 ' onClick={handleLogin}> LogIn</div >
                    }
                    {!isMetaMask && <>Install Metamask</>}
                </div>
            </div>


            <Footer />
        </div>

    )
}
