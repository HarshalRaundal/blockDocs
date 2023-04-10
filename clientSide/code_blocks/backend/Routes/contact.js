const express = require('express');

const router = express.Router();

router.route('/contact')
.post((req,res) => {
    try {
        let {contactDetails} = req.body;
        console.log(contactDetails);
        res.status(200);
        res.json({name : contactDetails.name ,task:"contact us!",success : true});
    }
    catch(error) { 
        console.log(error);
        res.send({error:error.message ,task:"contact us!", success:false});
    }
    }
);

module.exports = router;