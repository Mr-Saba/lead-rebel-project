import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);
export const createTask = (newTask, id) => {
    axios.patch(`${url}/${id}`, newTask)
}
export const changeOrder = (id, newList) => {
    axios.patch(`${url}/order/${id}`, newList)
}
export const updateTask = (updatedTask, postId, taskId) => {
    axios.patch(`${url}/update/${postId}/${taskId}`, updatedTask)
}
export const createPost = (data) => {
    console.log("from api")
    axios.post(`${url}/create`, data)
}



