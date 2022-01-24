import React from 'react';
import { useSelector } from "react-redux";
import styles from "./styles.module.css"

const SumTable = () => {

    var { posts } = useSelector((state) => state);


    return (
        <table className={styles.sumTable}>
          <tr>
            <th className={styles.yellow}>Total</th>
            <th className={styles.yellow}>Fixed</th>
            <th className={styles.yellow}>Productivity</th>
          </tr>
            {posts?.map(item => {
              return (
                <tr>
                  <td className={`${styles.rightSide} + " " + ${styles.yellow}`}>{item.tasks.length}</td>
                  <td className={`${styles.rightSide} + " " + ${styles.yellow}`}>
                    {item.tasks.filter((task) => task.fixed === "true").length}
                  </td>
                  <td className={`${styles.rightSide} + " " + ${styles.yellow}`}>
                    {Math.round(
                      (item.tasks.filter((task) => task.fixed === "true")
                      .length *
                      100) /
                      item.tasks.length
                      )}
                    %
                  </td>
                </tr>
              )
              })}
        </table>
    )
};

export default SumTable;