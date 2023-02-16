import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration , OpenAIApi} from 'openai';
import {v2 as cloudinary} from 'cloudinary'
import Post from '../mongodb/models/post.js'

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name : process.env.ClOULDINARY_CLOUD_NAME,
    api_key : process.env.ClOULDINARY_API_KEY,
    api_secret : process.env.ClOULDINARY_API_SECRET,
})
router.route('/').get(async(req,res) => {
    const { name , prompt , photo } = req.body
})


export default router 