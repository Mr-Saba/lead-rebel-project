import { GET_POSTS, CREATE_TASK, UPDATE_TASK, CHANGE_ORDER, CREATE_POST} from './constants';
import * as api from '../api/index.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ 
        type: GET_POSTS, 
        payload: data 
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addTask = (newTask, id) => async (dispatch) => {
  try {
    await api.createTask(newTask, id);

    dispatch({ 
        type: CREATE_TASK, 
        payload: {newTask, id}
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTask = (task, postId, taskId) => async (dispatch) => {
    await api.updateTask(task,postId,taskId);
    dispatch({ 
        type: UPDATE_TASK, 
        payload: {task, postId, taskId}
    });
};
export const addPost = (data) => async (dispatch) => {
  await api.createPost(data);
  dispatch({ 
      type: CREATE_POST, 
      payload: data
  });
};

export const changeOrdering = (id, newList) => async (dispatch) => {  
  await api.changeOrder(id, newList);
  dispatch({ 
      type: CHANGE_ORDER, 
      payload: {id,newList}
  });
};



