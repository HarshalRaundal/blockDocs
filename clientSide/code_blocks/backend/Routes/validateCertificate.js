const express = require('express');
const certificateModel = require('../Models/Certificate');
const {verifyCertificate} = require('../contract');
const router = express.Router();


router.route('/certificateValidator')
.post((req,res) => {
    try {

        let {certificateHash} = req.body;
        console.log(req.body);
        const transactionQuery = verifyCertificate(certificateHash);
        console.log("tx: ", transactionQuery);
        certificateModel.findOne({certificateHash:certificateHash}).then((doc) => {

            if(doc === null ){
                res.send({task:"performed certificate validation!",success : false});
                return;
            }
            console.log(doc);
            res.status(200);
            res.json({certificateDetails : doc,task:"performed certificate validation!",success : true});
        })
    }
    catch(error) { 
        console.log(error);
        res.send({error:error.message ,task:"performed certificate validation!", success:false});
    }
    }
);

module.exports = router;