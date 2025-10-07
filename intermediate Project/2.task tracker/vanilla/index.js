/* ==========================
   SELECT ELEMENTS
========================== */
let input = document.querySelector(`input[type="text"]`);
let submit_button = document.querySelector(`.task-input input[type="submit"]`);
let submit_form = document.querySelector(`.task-form`);

/* ==========================
   TASK DATA
========================== */
let list_task = [];

/* ==========================
   RENDER TASKS
   - Display all tasks in the DOM
   - Add event listeners for delete and toggle status
========================== */
function renderTasks(list) {
  display_list(list);

  // DELETE BUTTON: remove task by index
  let delete_button = document.querySelectorAll(".task-delete");
  for (const button of delete_button) {
    button.onclick = () => {
      let index = button.getAttribute("data-index");
      list.splice(index, 1);
      renderTasks(list);
    };
  }

  // CHECKBOX / TASK-CONTENT: toggle task status
  let task_content = document.querySelectorAll(".task-content");
  for (const value of task_content) {
    value.addEventListener("click", () => {
      let index = value.getAttribute("data-index"); // get original array index
      list[index].status = !list[index].status;     // toggle status
      renderTasks(list);
    });
  }
}

/* ==========================
   DISPLAY LIST
   - Append tasks to active or completed container
========================== */
function display_list(list) {
  let task_list = document.querySelector(".task-list");           // active tasks container
  let task_list_done = document.querySelector(".task-list-done"); // completed tasks container

  // RESET CONTENT BEFORE RE-RENDER
  task_list.innerHTML = "";
  task_list_done.innerHTML = "";

  // RENDER TASKS
  list.forEach((element, index) => {
    let div = document.createElement("div");
    div.classList.add("task-item");

    div.innerHTML = `
      <div class="task-content" data-index="${index}">
        <div class="task-check ${element.status ? "" : "active"}"></div>
        <${element.status ? "p" : "s"}>${element.description}</${element.status ? "p" : "s"}>
      </div>
      <button class="task-delete" data-index="${index}">❌</button>
    `;

    // Append to correct container based on status
    (element.status ? task_list : task_list_done).appendChild(div);
  });
}

/* ==========================
   SUBMIT FORM
   - Add new task to array and render
========================== */
submit_form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() !== "") {
    list_task.push({ status: true, description: input.value });
    input.value = "";  // reset input after adding
    renderTasks(list_task);
  }
});
