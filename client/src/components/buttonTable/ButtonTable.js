import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  addTask
} from "../../redux/actions";
import styles from "./styles.module.css"

const ButtonTable = () => {

  var { posts } = useSelector((state) => state);

  const dispatch = useDispatch();

  const taskAdd = (id) => {
    const data = {
      name: "",
      fixed: "",
    };
    dispatch(addTask(data, id))
  };

  
  const isChangeable = (id) => {
    const date = posts.find((item) => item._id === id).date;
    //let lastDay = posts[posts.length - 1].date.substring(0, 2)
    if ( // for the next days
      date.substring(0, 2) > new Date().getDate().toString() || 
      parseInt(date.substring(3, 5)) > new Date().getMonth() + 1 ||
      date.substring(6, 8) > (new Date().getFullYear() - 2000).toString()
    ) {
      return true;
    } else if( //for today
      date.substring(0, 2) === new Date().getDate().toString() && 
      parseInt(date.substring(3, 5)) === new Date().getMonth() + 1 
    ) {
      return true;
    } else return false
  };

  return (
    <table className={styles.buttonTable}>
          <tr>
            <th></th> 
          </tr>
          {posts?.map((post) => {
            return(
              <tr>
              {isChangeable(post._id) ? <button onClick={() => taskAdd(post._id)} className={styles.button}>+</button> :""}
              </tr>
            )
          })}
        </table>
  )
};

export default ButtonTable;