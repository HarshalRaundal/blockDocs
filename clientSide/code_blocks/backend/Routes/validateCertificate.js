const express = require('express');

const router = express.Router();

router.route('/certificateValidator')
.post((req,res) => {
    try {
        let {certificateHash} = req.body;
        console.log(req.body);
        res.status(200);
        res.json({certificateHash : certificateHash,task:"performed certificate validation!",success : true});
    }
    catch(error) { 
        console.log(error);
        res.send({error:error.message ,task:"performed certificate validation!", success:false});
    }
    }
);

module.exports = router;