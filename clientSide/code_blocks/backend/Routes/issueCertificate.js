const express = require('express');
const certificateModel = require('../Models/Certificate');
const router = express.Router();
const hashModule = require('../hashBcrypt');




router.route('/certificateIssuer')
.post(async (req,res) => {
    try {
        let {certificateDetails} = req.body;
        console.log(certificateDetails);

       /* Hashing Certificate using bcrypt */ 
        let certificateHash = await hashModule.hashCertificate(certificateDetails)
            .then((hash) => {
                return hash;
            })
            .catch((err) => {
                console.error(`Error: ${err}`);
                res.send({err:err,success:false,task:"failed to enrypt certificate "});
                return;
            });
        /* ----------------------- */
        
        /* ADDING CERTIFICATE DETAILS TO MONGODB*/
        let databaseQuery = await new certificateModel(
            {   studentId:certificateDetails.id , 
                studentName:certificateDetails.name,
                issueDate:certificateDetails.issueDate,
                studentMeta:certificateDetails.metaId,
                issuerMeta : certificateDetails.issuerId,
                certificateHash:certificateHash
            })
            .save((err) => {
                    if(err) {
                        res.send({err:err,success:false,task:"failed to save certificate to mongoDB"})
                    }
        });
        console.log("databaseQuery: ",databaseQuery);
        /* ------------------ */
        res.status(200);
        res.json({name : certificateDetails.name ,task:"Issed certificate!",success : true});
    }
    catch(error) { 
        console.log(error);
        res.send({error:error.message ,task:"Issed certificate!", success:false});
    }
    }
);

module.exports = router;