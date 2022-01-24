import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";
import { getPosts, updateTask, changeOrdering } from "../../redux/actions";
import styles from "./styles.module.css";

const TasksTable = () => {
  let isClicked = false;
  let isCoordinatesEqual = false;

  const dispatch = useDispatch();

  var { posts } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const isToday = (id) => {
    const date = posts.find((item) => item._id === id).date;
    if (
      date.substring(0, 2) === new Date().getDate().toString() &&
      parseInt(date.substring(3, 5)) === new Date().getMonth() + 1 &&
      date.substring(6, 8) === (new Date().getFullYear() - 2000).toString()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const taskUpdate = (e, taskId, taskFixed, listId, postId) => {
    document.getElementById(taskId).style.display = "";

    const newValue = e.target.innerText;

    const data = {
      name: newValue,
      fixed: taskFixed,
    };
    dispatch(updateTask(data, postId, taskId));
  };

  const handleMouseDown = (e, id) => {
    var el = document.getElementById(id);
    isClicked = true;
    isCoordinatesEqual = true;
    setTimeout(() => {
      if (isClicked && isCoordinatesEqual) {
        if (el.style.display === "") {
          el.style.display = "flex";
        } else {
          el.style.display = "";
        }
      }
    }, 1000);
  };
  const handleMouseUp = () => {
    isClicked = false;
  };
  const handleMouseMove = () => {
    isCoordinatesEqual = false;
  };

  const taskComplete = (taskId, name, listId, postId) => {
    document.getElementById(taskId).style.display = "";
    const data = {
      name: name,
      fixed: "true",
    };
    dispatch(updateTask(data, postId, taskId));
  };
  const taskUnComplete = (taskId, name, listId, postId) => {
    document.getElementById(taskId).style.display = "";
    const data = {
      name: name,
      fixed: "false",
    };
    dispatch(updateTask(data, postId, taskId));
  };

  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleDragStart = (e, position) => {
    dragItem.current = position;
    console.log(position);
  };
  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(position);
  };
  const handleDragEnd = (id) => {
    let tasks = posts.find((item) => item._id === id).tasks;
    const copyListItems = [...tasks];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    dispatch(changeOrdering(id, copyListItems));
  };

  const Indexes = () => {
    let indexes = [];
    let maxLength = Math.max(...posts?.map((item) => item.tasks.length));
    for (let i = 1; i <= maxLength; i++) {
      indexes.push(i);
    }
    return indexes;
  };

  const isChangeable = (id) => {
    const date = posts?.find((item) => item._id === id).date;
    //let lastDay = posts[posts.length - 1].date.substring(0, 2)
    if (
      // for the next days
      date.substring(0, 2) > new Date().getDate().toString() ||
      parseInt(date.substring(3, 5)) > new Date().getMonth() + 1 ||
      date.substring(6, 8) > (new Date().getFullYear() - 2000).toString()
    ) {
      return true;
    } else if (
      //for today
      date.substring(0, 2) === new Date().getDate().toString() &&
      parseInt(date.substring(3, 5)) === new Date().getMonth() + 1
    ) {
      return true;
    } else return false;
  };

  const defineClassForPastPost = (id) => {
    console.log("define")
    const post = posts.find(item => item._id === id)
    post.tasks.map((element) => { return (
      element.fixed === "true" ?  styles.green :
      (element.fixed === "false" || element.fixed !== "true") ? styles.red
      : element.fixed === ""
    )
    })
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.center}>
          <th>Date</th>
          {posts &&
            Indexes().map((item) => {
              return <th>{item}</th>;
            })}
        </tr>
      </thead>
      <tbody>
        {posts?.map((item) => {
          return (
            <>
              <tr style={isChangeable(item._id) ? {"cursor": "pointer"} : {"cursor": "unset"}}>
                <td className={styles.bold} id="date">
                  {isToday(item._id) ? "Today" : item.date}
                </td>
                {item.tasks.map((task, index) => {
                  return (
                    <> 
                     {isChangeable(item._id) ?
                      <td
                        onDragOver={(e) => e.preventDefault()}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        onDragEnd={() => handleDragEnd(item._id)}
                        onMouseMove={() => handleMouseMove()}
                        onMouseUp={() => handleMouseUp()}
                        onMouseDown={(e) => handleMouseDown(e, task._id)}
                        className={
                          task.fixed === "true"
                            ? `${styles.green}`
                            : task.fixed === "false"
                            ? `${styles.red}`
                            : ""
                        }
                        onBlur={(e) =>
                          taskUpdate(e, task._id, task.fixed, index, item._id)
                        }
                        draggable
                        contentEditable
                        >
                        {task.name}
                        <div className={styles.x} id={task._id}>
                          <FontAwesomeIcon
                            onClick={() =>taskComplete(task._id, task.name, index, item._id)}
                            icon={faCheckCircle}
                          />
                          <FontAwesomeIcon
                            onClick={() =>taskUnComplete(task._id,task.name, index, item._id)}
                            icon={faTimesCircle}
                          />
                        </div>
                      </td>
                      : 
                      <td
                        className={
                          task.fixed === "true" ?  styles.green :
                          task.name === "" && task.fixed !== "true" ? styles.grey :
                          styles.red
                        }
                      >
                        {task.name}
                      </td>  
                      }
                    </>
                  );
                })}
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default TasksTable;
