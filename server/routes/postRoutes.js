import express from 'express';
import Post from '../mongodb/models/post.js';

const router = express.Router();

router.route('/').get(async(req,res) => {
    try{
        const data = await Post.find({})
        res.status(200).json({success: true, data: data})
    }catch(error){
        res.status(500).json({success: false, message: "could not get data!"})
    }
})
router.route('/:id').get(async(req,res) => {
    const {id} = req.params;
    try{
        const data = await Post.find({_id:id});
        res.status(200).json({success: true, data: data})
    }catch(error){
        res.status(500).json({success: false, message: "could not get data!"})
    }
})
router.route('/').post(async(req,res) => {
    try {
        const {email,image,title,description} = req.body;
        const newPost = Post.create({
            email: email,
            image: image,
            title: title,
            description: description
        })
        res.status(200).json({success: true, data: newPost});
    }catch(err){
        res.status(500).json({success: false, message: 'cannot create a book post!'})
    }
})
router.route('/update/:id').post(async(req,res) => {
    try {
        const {id} = req.params;
        const {email,image,title,description} = req.body;
        await Post.findByIdAndUpdate(id,{image:image,title:title,description:description})
        res.status(200).json({success: true, message: 'post updated successfully!'});
    }catch(err){
        res.status(500).json({success: false, message: 'cannot update the post!'})
    }
})
router.route('/:id').post(async(req,res) => {
    try{
        const {_id} = req.body;
        await Post.findByIdAndRemove({_id});
        res.status(200).json({success: true, message: 'post deleted successfully!'})
    }catch(err){
        res.status(500).json({success:false, message: 'cannot delete the post!'})
    }
})




export default router;