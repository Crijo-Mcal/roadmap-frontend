import { useState } from "react";
import "./task_tracker.css";

/* List  */
function List({ data, remove_data, check_list }) {
  return (
    <>
      {data.map((x) => (
        <div key={x.id} className="task-item">
          <div className="task-content">
            <input
              className="task-check "
              type="checkbox"
              checked={x.isDone}
              onChange={() => check_list(x.id)}
            />
            {x.isDone?<s>{x.description}</s>:<p>{x.description}</p>}
          </div>
          <button onClick={() => remove_data(x.id)} className="task-delete">
            ❌
          </button>
        </div>
      ))}
    </>
  );
}

export default function Task_tracker() {
  /* states */
  const [data, setData] = useState([]);

  const [inputTask, setInputTask] = useState("");

  /* change on form */
  function handleChange(e) {
    setInputTask(() => e.target.value);
  }

  /* checked list */
  function check_list(inputId) {
    const buffer = data.map((task) => {
      if (task.id === inputId) {
        return { ...task, isDone: !task.isDone }; 
      }
      return task;
    });

    console.log(buffer);
    setData(() => buffer);
  }

  /* delate  data*/
  function remove_data(inputId) {
    const buffer = [...data].filter((x) => x.id != inputId);
    setData(() => buffer);
  }

  /* submit */
  function HandleSubmit(e) {
    e.preventDefault();
    if (!inputTask) return;

    const task_submit = {
      id: data.length > 0 ? data[data.length - 1].id + 1 : 0,
      description: inputTask,
      isDone: false,
    };
    setData(() => [...data, task_submit]);
    setInputTask(() => "");
  }

  return (
    <div className="app-container">
      <div className="task-tracker">
        <form className="task-form" onSubmit={HandleSubmit}>
          <h1 className="task-title">Task Tracker</h1>
          <div className="task-input">
            <input
              type="text"
              id="task-field"
              value={inputTask}
              placeholder="Start writing and press enter to create task"
              onChange={handleChange}
            />
            <input type="submit" value="➕" />
          </div>
        </form>

        <div className="task-list">
          {
            <List
              data={data}
              remove_data={remove_data}
              check_list={check_list}
            />
          }
        </div>

        {/* <div className="task-list-done"></div> */}
      </div>
    </div>
  );
}
