import express from "express";
import UserPoints from "../mongodb/models/userPoints.js";

const router = express.Router();

router.route("/").post(async (req, res) => {
  const { email, points, lastDay } = req.body;
  try {
    const present = await UserPoints.find({ email: email });
    if (present?.length !== 0) {
      const result = await UserPoints.findOneAndUpdate(
        { email: email },
        { $set: { points: points + 20, lastDay: lastDay } }
      );
      res.status(200).json({ success: true, data: result });
    } else if (present?.length === 0) {
      const newPost = UserPoints.create({
        email: email,
        points: 20,
        lastDay: lastDay,
      });
      res.status(200).json({ success: true, data: newPost });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "cannot create points!" });
  }
});
router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  try {
    const present = await UserPoints.find({ email: id });
    if (present !== null) {
      res.status(200).json({ success: true, data: present });
    } else if (!present || present === null) {
      res.status(200).json({ success: true, data: present });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "cannot create points!" });
  }
});
router.route("/").get(async(req,res) => {
  try{
      const data = await UserPoints.find({})
      res.status(200).json({success: true, data: data})
  }catch(error){
      res.status(500).json({success: false, message: "could not get data!"})
  }
})

export default router;
