const {PRIVATE_KEY} = require('./KEYS.js');
const { BrowserProvider, ethers } = require("ethers");
const RPC_URL = "HTTP://127.0.0.1:7545";
var fs = require('fs');
const fsPromises = fs.promises;

// The path to the contract ABI
const ABI_FILE_PATH = 'data.json';

// The address from the deployed smart contract
const DEPLOYED_CONTRACT_ADDRESS = '0x40CEbF986CB5Be54D5CBDF64b38827A9aFB07aF1';

const getProiderAndSigner = async () => {
    const provider = await new ethers.JsonRpcProvider(RPC_URL);
    const signer = await provider.getSigner();
    return  {provider:provider, signer:signer}
}


// load ABI from build artifacts
const getAbi = async () => {
    const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
    const abi = JSON.parse(data)['abi'];
    //console.log(abi);
    return abi;
}



const readOperation = async () =>{
    const {provider, signer} = await getProiderAndSigner();
    const abi = await getAbi();

    let contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, provider);

    const greeting = await contract.greet();
    console.log("GREETINGS: ",greeting);
}

const issueCertificate = async (_id,_sName,_issueDate,_issuer,_student) =>{
    const {provider, signer} = await getProiderAndSigner();
    const abi = await getAbi();

    // const PRIVATE_KEY  = "0xab714100dc9b5834381cb714f2acedf5905281f8d88f3e150f7c9d98c171f296";

    const new_contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);
    
    // const [_id,_sName,_issueDate,_issuer,_student] = ["12","harshal","12-04-2023",signer.address , signer.address];

    let tx = await new_contract.issueCred(_id,_sName,_issueDate,_issuer,_student);
    await tx.wait();


    new_contract.on("*", (event) => {
        // The `event.log` has the entire EventLog
        console.log(event);
      });

    console.log("Transaction: ",tx);
    return tx;
}


// const verifyCertificate = async (__id,_sName,_issueDate,_issuer,_student) =>{
//     const {provider, signer} = await getProiderAndSigner();
//     const abi = await getAbi();

//     const PRIVATE_KEY  = "0xab714100dc9b5834381cb714f2acedf5905281f8d88f3e150f7c9d98c171f296";

//     const new_contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);
    
//     // const [_id,_sName,_issueDate,_issuer,_student] = ["12","harshal","12-04-2023",signer.address , signer.address];

//     console.log("id: ",_id,"student Name: ",_sName);
//     let tx = await new_contract.verifyCred(_id,_sName,_issueDate,_issuer,_student);
//     await tx.wait();
//     console.log("Transaction: ",tx);
    
// }

issueCertificate("12","harshal","12-04-2023","0xc389BF6995638DF5f1bC23bbB5935057F1C77716" ,"0xc389BF6995638DF5f1bC23bbB5935057F1C77716");
// readOperation();


module.exports = {getProiderAndSigner,getAbi,issueCertificate,readOperation};