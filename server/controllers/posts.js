const Post = require("../models/posts")

// const mongoose = require('mongoose');

const getPosts = async (req,res) => {
    try{
        const posts = await Post.find()
        res.status(200).json(posts)
    }
    catch (err){
        res.status(500).json(err)
    }
}

const createTask = async (req,res) => {
    const { id } = req.params
    const { name, fixed } = req.body;
    try {
        const bla = await Post.findOneAndUpdate({_id: id},
        {$push: {"tasks": {"name": name, "fixed": fixed}} }  
        )
        res.status(201).json(bla)
    }
    catch (err) {
        res.status(500).json(err)
    }
}


const updateTask = async (req,res) => {
    const { postId, taskId } = req.params;
    const { name, fixed} = req.body;
    try {
        await Post.updateOne({"_id": postId, "tasks._id": taskId}, 
            {
                $set: {
                        "tasks.$.name": name,
                        "tasks.$.fixed": fixed,
                    } 
                }  
            )
        res.status(201).json("bla")
    } catch(err) {
        // console.log(err)
    }
}

const changeOrder = async (req,res) => {
    const {id} = req.params
    try {
        await Post.updateOne({"_id": id,}, 
            {
                $set: {
                    "tasks": []
                } 
            }  
            ).then(() => {
            req.body.forEach(async element => {
                await Post.findOneAndUpdate({_id: id},
                {
                    $push: {"tasks": {"name": element.name, "fixed": element.fixed}}  
                }
                )
        })  
    })
    } catch(err) {
        console.log(err)
    }
}
const createPost = async (req,res) => {
    const {date} = req.body
    try{
        const post = await Post.create({date: date}).then
        res.status(200).json(post)
    }
    catch (err){
        res.status(500).json(err)
    }
}


module.exports = {
    createTask,
    changeOrder,
    getPosts,
    updateTask,
    createPost
}