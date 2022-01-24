import { GET_POSTS, CREATE_TASK, UPDATE_TASK, CHANGE_ORDER, CREATE_POST } from './constants';

const initialState = {
    posts: [],
}
const reducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_POSTS: 
            return {
            ...state,
            posts: action.payload
        }
        case CREATE_TASK: 
            let post = state.posts.find(item => item._id === action.payload.id)
            post.tasks.push(action.payload.newTask)
        return {
            ...state,
        }
        case UPDATE_TASK: 
            let post1 = state.posts.find(item => item._id === action.payload.postId)
            console.log(post1)
            const taskToEdit = post1.tasks.find(item => item._id === action.payload.taskId)
            taskToEdit.fixed = action.payload.task.fixed
        return {
            ...state,
        }
        case CHANGE_ORDER: 
            state.posts.find(item => item._id === action.payload.id).tasks = action.payload.newList
        return {
            posts: [...state.posts]
        }
        case CREATE_POST: 
        return {
            posts: [...state.posts, action.payload] 
        }
        default: return state
    }
}

export default reducer