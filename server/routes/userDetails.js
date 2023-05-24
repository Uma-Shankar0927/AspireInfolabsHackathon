import express from 'express';
import UserDetails from '../mongodb/models/userdetails.js'

const router = express.Router();

router.route('/userdata').post(async(req,res) => {
    try {
        const {email,height,age,weight,bmi,desiese} = req.body;
        const newPost = UserDetails.create({
            email: email,
            height: height,
            age: age,
            weight: weight,
            bmi: bmi,
            desiese: desiese
        })
        res.status(200).json({success: true, data: newPost});
    }catch(err){
        res.status(500).json({success: false, message: 'cannot create a post!'})
    }
})

export default router;