const jwt  = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const userModel = require('../Models/User');
const {recoverPersonalSignature } = require('eth-sig-util');
const {bufferToHex  } = require('ethereumjs-util');
const jwtScrete = 'this is secret for jwt token';

// route for authenticating user
router.route('/getNonce')
    .post(async (req, res) => {

        try {

            const { publicAddress } = req.body;
            let nonce = null;
            //check if user already present in database
            await userModel.findOne({ publicAddress }).then((response) => {
                console.log(response);
                if (response === null) {
                    //user does not exists
                    //create random nonce
                    nonce = Math.floor(Math.random() * 1000000);
                    userModel.create({ publicAddress: publicAddress, nonce: nonce }).then((response => {
                        console.log("Saved to database :", response);
                    }));
                }else{
                    nonce = response.nonce;
                }

            

                console.log("public address: ", publicAddress , " nonce: " ,nonce);
                
            })
            res.send({ publicAddress:publicAddress,nonce:nonce,success: true });

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post('/getSignature' , async(req,res) => {

    try {
        // get signature from frontend
        const {signature , publicAddress} = req.body;
        //check if signature is correct
        console.log("public address: ", publicAddress , " Signature: " ,signature);
        let nonce;
        await userModel.findOne({ publicAddress }).then( async (response) => {
            console.log(response);
            if (response === null) {
                //user does not exists
                res.json({success: false , message:"user do not exist , while verification"});
            }else{
                nonce = response.nonce;
            }

            console.log("public address: ", publicAddress , " nonce: " ,nonce);
            const msg = `signing using nounce : ${nonce}`;
            const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
            const address = recoverPersonalSignature({
                data: msgBufferHex,
                sig: signature,
            });
            console.log("address",address); 
    
            if (address.toLowerCase() === publicAddress.toLowerCase()) {
                //create jwt token
                const token = jwt.sign({
                    
                        id: response._id,
                        address : response.publicAddress,
                        nonce : response.nonce
                    
                }
                ,jwtScrete);



                // regenearate nounce
                nonce = Math.floor(Math.random() * 1000000);
                await userModel.findOneAndUpdate({ publicAddress:publicAddress } , {
                    nonce : nonce
                })
                
                            

                res.send({success : true , authToken : token});
                // return res.json({ accessToken : token });
            } else {
                res.status(401).send({
                    error: 'Signature verification failed',
                });
    
            }
            

        })
       
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})


module.exports = router;