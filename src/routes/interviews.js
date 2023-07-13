import express from 'express'
import mongoose from 'mongoose';
import { InterviewModel } from "../models/Interviews.js";
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const response = await InterviewModel.find({})
        res.json(response);

    } catch (error) {
        res.json(error);
    }
});

router.post('/', async (req, res) =>{

    const interview = new InterviewModel(req.body)

    try {
        const response = await interview.save()
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.put('/', async (req, res) =>{
    
    try {
        const interview = await InterviewModel.findById(req.body.interviewID)
        const user = await UserModel.findById(req.body.userID)
        user.savedInterviews.push(interview);
        await user.save();

        res.json({savedInterviews: user.savedInterviews});
    } catch (error) {
        res.json(error);
    }
});

router.delete('/', async (req, res) => {
    try {
      const { interviewID, userID } = req.body;
  
      const user = await UserModel.findById(userID);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.savedInterviews = user.savedInterviews.filter(
        (item) => item != interviewID
      );
  
      await user.save();
  
      res.json({ savedInterviews: user.savedInterviews });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
 

router.get('/savedInterviews/ids/:userID', async (req, res) =>{
    try {
        const user = await UserModel.findById(req.params.userID);
        console.log("user",user);
        res.json({ savedInterviews: user?.savedInterviews });
    } catch (error) {
        res.json(error)
    }
})

router.get('/savedInterviews/:userID', async (req, res) =>{
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedInterviews = await InterviewModel.find({
            _id : { $in: user.savedInterviews}
        })
        console.log(savedInterviews);
        res.json({ savedInterviews });
    } catch (error) {
        res.json(error)
    }
})


export {router as interviewRouter}