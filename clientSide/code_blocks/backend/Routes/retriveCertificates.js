const express = require('express');
const certificateModel = require('../Models/Certificate');
const router = express.Router();

router.route('/retriveCertificates')
.post(async (req,res) => {
    try {
        let {address} = req.body;
        console.log("Account Address: ",address);
        certificateModel.find({studentMeta:address}).then((docs) => {

            if(docs === null ){
                res.send({task:"retriving my certificates!",success : false});
            }

            certificateModel.find({issuerMeta:address}).then((issuedDocs) => {

                if(issuedDocs === null ){
                    res.send({task:"retriving my certificates!",success : false});
                }
                const allDocs = {myCertificates:docs, issuedDocs : issuedDocs}
                
                console.log(allDocs);
                res.status(200);
                res.json({Certificates : allDocs,task:"performed retriving my certificates!",success : true});
            })
            // res.status(200);
            // res.json({myCertificates : docs,task:"performed retriving my certificates!",success : true});
        })
    }
    catch(error) { 
        console.log(error);
        res.send({error:error.message ,task:"retriving my certificates!", success:false});
    }
    }
);

module.exports = router;