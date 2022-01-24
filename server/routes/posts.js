const express = require("express")
const router = express.Router()
const {
    createTask, 
    changeOrder, 
    getPosts, 
    updateTask,
    createPost
} = require('../controllers/posts')

router.get('/', getPosts)

router.patch('/:id', createTask);

router.patch('/update/:postId/:taskId', updateTask);

router.patch('/order/:id', changeOrder);

router.post('/create', createPost)

module.exports = router
