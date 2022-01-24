import React from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import {
  addPost,
} from "./redux/actions";
import { useSelector } from "react-redux";
import {TasksTable, SumTable, ButtonTable} from "./components"

function App() {
  
  const dispatch = useDispatch();
  
  var { posts } = useSelector((state) => state);
    
  const postAdd = () => {
    const d = new Date();
    let [day, month, year] = [d.getDate(), d.getMonth() + 1, d.getFullYear() - 2000];
    let date = `${day}.${month < 10 ? "0" + month : month}.${year}`
    // const allDates = posts.map(item=> parseInt(item.date.substring(0,2)))
    // let maxfromDates = Math.max(...allDates)
    let lastDay = posts[posts.length - 1].date.substring(0, 2)
    let lastMonth = posts[posts.length - 1].date.substring(3, 5)
    parseInt(lastMonth)
    if(posts.find(item => item.date === date) === undefined) 
    {
      date = `${day}.${month < 10 ? "0" + month : month}.${year}`
    } else {
      if(lastDay < 31) {
          if(parseInt(lastMonth) > parseInt(month)) {
            parseInt(lastDay)
            lastDay ++
            date = `0${lastDay}.${lastMonth < 10 ? lastMonth : month}.${year}`
          } else {
          lastDay++
          date = `${lastDay}.${month < 10 ? "0" + month : month}.${year}`
          }
        } else {
        let nextMonth = parseInt(month)
        nextMonth++
        lastDay = 1
        date = `01.${nextMonth < 10 ? "0" + nextMonth : nextMonth}.${year}`
      }
    }
    console.log(date)
    const data = {
      tasks: [],
      date: date
    }
    dispatch(addPost(data))
  }

  return (
    <>
      <div className="container">
          <TasksTable />
          <SumTable/>
          <ButtonTable/>
        <button className="button" onClick={() => postAdd()}>+</button>
      </div>
    </>
  );
}

export default App;
